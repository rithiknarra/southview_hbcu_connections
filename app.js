'use strict';
const $=s=>document.querySelector(s);
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL=v=>{try{const u=new URL(v,location.href);return ['http:','https:','file:'].includes(u.protocol)?u.href:''}catch{return ''}};
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
// School colors come from data.js; anything that is not a hex color falls back to the stylesheet default.
const schoolColor=school=>/^#[0-9a-f]{3,8}$/i.test(school?.color||'')?school.color:'';
class HistoryStore {
 constructor(institutions,people,timelines){this.institutions=institutions;this.people=people;this.timelines=timelines;this.listeners=new Set();}
 subscribe(fn){this.listeners.add(fn);return()=>this.listeners.delete(fn);}
 notify(id){this.listeners.forEach(fn=>fn(id));}
 getEntries(id){return [...(this.timelines.find(t=>t.institutionId===id)?.entries||[])].sort((a,b)=>a.sortYear-b.sortYear||a.id.localeCompare(b.id));}
 validate(id,entry){const school=this.institutions.find(i=>i.id===id);if(!school)throw new Error('Unknown institution: '+id);if(!entry.id||!Number.isFinite(entry.sortYear))throw new Error('Each entry needs an id and numeric sortYear.');if(entry.sortYear<(school.timelineStart??school.founded))throw new Error('Entry predates this institution. Use the supported institution or predecessor timeline.');if(entry.personId&&!this.people.some(p=>p.id===entry.personId))throw new Error('Add the person before adding their timeline entry.');if(!entry.personId&&!entry.title)throw new Error('An event entry needs a title.');}
 addPerson(person){if(!person.id||!person.name)throw new Error('Person id and name are required.');if(this.people.some(p=>p.id===person.id))throw new Error('Person id already exists.');this.people.push({years:'',bio:'',legacy:'',burialLocation:'',connections:[],sources:[],...person});this.notify(null);}
 addEntry(id,entry){this.validate(id,entry);let timeline=this.timelines.find(t=>t.institutionId===id);if(!timeline){timeline={institutionId:id,entries:[]};this.timelines.push(timeline);}if(timeline.entries.some(e=>e.id===entry.id))throw new Error('Entry id already exists in this timeline.');timeline.entries.push({...entry});this.notify(id);}
 updateEntry(id,entryId,changes){const timeline=this.timelines.find(t=>t.institutionId===id),index=timeline?.entries.findIndex(e=>e.id===entryId);if(index==null||index<0)throw new Error('Entry not found.');const entry={...timeline.entries[index],...changes,id:entryId};this.validate(id,entry);timeline.entries[index]=entry;this.notify(id);}
 removeEntry(id,entryId){const timeline=this.timelines.find(t=>t.institutionId===id);if(timeline){timeline.entries=timeline.entries.filter(e=>e.id!==entryId);this.notify(id);}}
}
function timelineLayout(entries,start,currentYear,width,labelFor,availableHeight=0){
 const end=Math.max(currentYear,start+1,...entries.map(e=>e.sortYear));
 const viewportWidth=Math.max(1,width),compact=viewportWidth<600;
 const labelWidth=compact?180:240,fontSize=compact?23:27,padding=8;
 // Stretch only crowded date ranges; quiet intervals keep their normal scale.
 const baseSpan=Math.max(viewportWidth,labelWidth+32)-padding*2;
 const pixelsPerYear=baseSpan/(end-start);
 const groups=[];
 for(const entry of [...entries].sort((a,b)=>a.sortYear-b.sortYear)){
  let group=groups.at(-1);
  if(!group||group.year!==entry.sortYear){group={year:entry.sortYear,entries:[]};groups.push(group);}
  group.entries.push(entry);
 }
 let previousX=padding,previousEntryYear=null,extra=0,index=0;
 const locations=new Map(),anchors=[{year:start,x:padding}],laneEnds=[[-Infinity],[-Infinity]];
 for(const group of groups){
  const groupPositions=[];
  for(const entry of group.entries){
   const side=index++%2,naturalX=padding+(group.year-start)*pixelsPerYear+extra;
   // Keep one clear row per side; expand crowded years instead of crossing labels with stems.
   const neededX=Math.min(...laneEnds[side])+labelWidth/2+24+0.001;
   const x=Math.max(naturalX,labelWidth/2+4,locations.size?previousX+(previousEntryYear===group.year?16:0):padding,neededX);
   extra+=x-naturalX;
   const lane=laneEnds[side].findIndex(right=>x-labelWidth/2>=right+24);
   laneEnds[side][lane]=x+labelWidth/2;
   locations.set(entry,x);groupPositions.push(x);previousX=x;previousEntryYear=group.year;
  }
  if(group.year>start&&group.year<end)anchors.push({year:group.year,x:(groupPositions[0]+groupPositions.at(-1))/2});
 }
 if(groups.length){
  const right=baseSpan+padding+extra;
  extra+=Math.max(0,previousX+labelWidth/2+4-right);
 }
 const canvasWidth=baseSpan+padding*2+extra,span=canvasWidth-padding*2;
 anchors.push({year:end,x:canvasWidth-padding});
 // Ticks and event dots share this piecewise date scale after local expansion.
 const xForYear=year=>{
  const i=anchors.findIndex(anchor=>anchor.year>=year);
  if(i<=0)return i===0?anchors[0].x:anchors.at(-1).x;
  const a=anchors[i-1],b=anchors[i];
  return a.x+(year-a.year)/(b.year-a.year)*(b.x-a.x);
 };
 const lanes=[[],[]];
 const positioned=[...entries].sort((a,b)=>a.sortYear-b.sortYear).map((entry,index)=>{const x=locations.get(entry);const label=labelFor(entry),labelX=Math.max(labelWidth/2+4,Math.min(canvasWidth-labelWidth/2-4,x));let side=index%2,lane=0;while(lanes[side][lane]!=null&&labelX-labelWidth/2<lanes[side][lane]+24)lane++;lanes[side][lane]=labelX+labelWidth/2;return {entry,x,label,labelWidth,labelShift:labelX-x,side,lane};});
 // Reserve enough space for wrapped names instead of assuming every label is one line.
 const charactersPerLine=Math.floor((labelWidth-4)/(fontSize*.6));
 const labelHeight=Math.max(1,...positioned.map(item=>Math.ceil(item.label.length/charactersPerLine)))*fontSize*1.2+25;
 const laneStep=Math.max(84,labelHeight+24),above=Math.max(1,lanes[0].length),below=Math.max(1,lanes[1].length);
 const top=64+(above-1)*laneStep+labelHeight+16;
 const naturalHeight=top+64+(below-1)*laneStep+Math.max(labelHeight,80)+16;
 const height=Math.max(naturalHeight,availableHeight),baseline=top+(height-naturalHeight)/2;
 return {start,end,width:canvasWidth,padding,span,baseline,height,laneStep,fontSize,positioned,xForYear};
}
class OverlayManager{
 constructor(){this.timeline=$('#timeline-overlay');this.profile=$('#profile-overlay');this.backdrop=$('#profile-backdrop');history.replaceState({...history.state,southView:null},'');$('#back-to-schools').onclick=()=>this.back();$('#back-to-timeline').onclick=()=>this.back();this.backdrop.onclick=()=>this.back();document.addEventListener('keydown',e=>{const panel=!this.profile.hidden?this.profile:!this.timeline.hidden?this.timeline:null;if(!panel)return;if(e.key==='Escape'){e.preventDefault();this.back();}if(e.key==='Tab'){const items=[...panel.querySelectorAll('button:not(:disabled),a[href],[tabindex="0"]')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});}
 navigate(route){if(!this.restoring)history.pushState({...history.state,southView:route},'');}
 back(){history.back();}
 openTimeline(schoolId){this.schoolId=schoolId;const color=schoolColor(INSTITUTIONS.find(s=>s.id===schoolId));[this.timeline,this.profile].forEach(panel=>color?panel.style.setProperty('--school-color',color):panel.style.removeProperty('--school-color'));this.navigate({schoolId});if(this.timeline.hidden){this.trigger=document.activeElement;this.oldOverflow=document.body.style.overflow;}this.timeline.hidden=false;document.body.style.overflow='hidden';$('#school-browser').inert=true;$('#back-to-schools').focus({preventScroll:true});}
 closeTimeline(){if(!this.profile.hidden)this.closeProfile();this.timeline.hidden=true;document.body.style.overflow=this.oldOverflow||'';$('#school-browser').inert=false;if(this.trigger?.isConnected)this.trigger.focus({preventScroll:true});}
 openProfile(route){this.navigate({schoolId:this.schoolId,...route});$('#profile-back-label').textContent=INSTITUTIONS.find(s=>s.id===this.schoolId).name+' Timeline';if(this.profile.hidden)this.profileTrigger=document.activeElement;this.profile.hidden=false;this.backdrop.hidden=false;this.timeline.inert=true;$('#back-to-timeline').focus({preventScroll:true});this.profile.scrollTop=0;}
 closeProfile(){this.profile.hidden=true;this.backdrop.hidden=true;this.timeline.inert=false;if(this.profileTrigger?.isConnected)this.profileTrigger.focus({preventScroll:true});}
}
const profileItems=value=>(Array.isArray(value)?value:[value]).filter(item=>item!=null&&String(item).trim());
// Sections without any bullets are left out entirely.
const profileSection=(title,value)=>{const items=profileItems(value);return items.length?`<h3>${title}</h3><ul class="sv-profile-list">${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`:'';};
// User-provided exact gravestone map links are optional; hide the link when unknown.
const burialLocationMarkup = value => {
 let url = '';
 if (typeof value === 'string' && value.trim()) {
  try {
   const parsed = new URL(value.trim());
   if (['https:', 'http:'].includes(parsed.protocol)) url = parsed.href;
  } catch { /* Invalid links are treated as missing. */ }
 }
 return url ? `<p class="sv-burial-location"><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">View gravestone location on Google Maps <span aria-hidden="true">&#8599;</span><span class="sv-sr"> (opens in a new tab)</span></a></p>` : '';
};
// The first sentence of a school description, or null when the description is a single sentence.
const firstSentence=text=>{const match=String(text).match(/^[\s\S]*?[.!?](?=\s+\S)/);return match?match[0]:null;};
// License-required photo attribution stays separate from internal research sources.
const photoCreditMarkup = image => {
 if(!image || image.attributionRequired!==true || !image.credit)return '';
 const source=safeURL(image.sourceUrl||''),license=safeURL(image.licenseUrl||'');
 return `<figcaption class="sv-photo-credit">${esc(image.credit)}${image.sourceUrl&&source?` &middot; <a href="${esc(source)}" target="_blank" rel="noopener noreferrer">Image source</a>`:''}${image.licenseUrl&&license?` &middot; <a href="${esc(license)}" target="_blank" rel="noopener noreferrer">${esc(image.license||'Image license')}</a>`:''}</figcaption>`;
};
class ProfileCard{
 constructor(manager){this.manager=manager;}
 open(id){const p=PEOPLE.find(p=>p.id===id);if(p)this.render(p,{personId:id});}
 openEvent(entry,school){this.render({name:entry.title,years:entry.displayDate||String(entry.sortYear),connections:[{institutionId:school.id,label:'Institution event'}],bio:entry.summary||'',legacy:entry.details||'',image:entry.image||null,event:true},{entryId:entry.id});}
 // The photo, name, dates and connection sit on a band in the school's color; the photo overlaps the page below it.
 render(p,route){const image=p.image&&safeURL(p.image.url);const connection=(p.connections||[]).map(c=>c.label).filter(Boolean).join(' ');$('#profile-content').innerHTML=`<div class="sv-profile-band"><div class="sv-wrap sv-profile-band-in"><figure class="sv-portrait"><div class="sv-frame"><div class="sv-placeholder" ${image?'hidden':''}><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="29" r="17"/><path d="M15 90C15 42 85 42 85 90"/></svg><span>${p.event?'Event image':'Portrait photograph'}</span></div>${image?`<img class="sv-photo${p.image.fit==='contain'?' sv-photo-contain':''}" src="${esc(image)}" alt="${esc(p.image.alt||p.name)}">`:''}</div>${image?photoCreditMarkup(p.image):''}</figure><div class="sv-profile-who"><h2 id="profile-title">${esc(p.name)}</h2>${p.years?`<p class="sv-life-dates">${esc(p.years)}</p>`:''}${connection?`<p class="sv-profile-connection">${esc(connection)}</p>`:''}</div></div></div><div class="sv-wrap sv-profile-body"><div class="sv-profile-copy">${p.burialNote?`<aside class="sv-burial-note" aria-label="Burial history"><strong>Burial history</strong><p>${esc(p.burialNote)}</p></aside>`:''}${profileSection('Connection and Legacy',p.legacy)}${profileSection('Biography',p.bio)}${p.event?'':burialLocationMarkup(p.burialLocation)}</div></div>`;const img=$('#profile-content img');if(img)img.onerror=()=>{img.hidden=true;$('#profile-content .sv-placeholder').hidden=false;};this.manager.openProfile(route);}
}
class InstitutionTimeline{
 constructor(manager,profile,store){this.manager=manager;this.profile=profile;this.store=store;this.container=$('#timeline-entries');this.container.onclick=e=>{const b=e.target.closest('[data-entry]');if(b){const entry=this.store.getEntries(this.currentId).find(e=>e.id===b.dataset.entry);if(entry?.personId)this.profile.open(entry.personId);else if(entry)this.profile.openEvent(entry,INSTITUTIONS.find(i=>i.id===this.currentId));}};this.container.onscroll=()=>this.controls();$('#timeline-prev').onclick=()=>this.scroll(-1);$('#timeline-next').onclick=()=>this.scroll(1);this.lastSize='';const observer=new ResizeObserver(()=>{if(!this.currentId||this.manager.timeline.hidden)return;const size=this.container.clientWidth+':'+this.availableHeight();if(this.container.clientWidth&&size!==this.lastSize){this.lastSize=size;this.render();}this.controls();});[this.container,this.manager.timeline,$('.sv-hero'),$('.sv-band-head')].forEach(element=>observer.observe(element));document.fonts?.ready.then(()=>{if(this.currentId&&!this.manager.timeline.hidden)this.render();});this.store.subscribe(id=>{if(this.currentId&&(!id||id===this.currentId))this.render();});}
 open(id){if(!INSTITUTIONS.some(i=>i.id===id))return;if(id!==this.currentId)this.expanded=false;this.currentId=id;this.manager.openTimeline(id);this.render();this.container.scrollLeft=0;this.controls();}
 availableHeight(){const panel=this.manager.timeline;return Math.max(0,panel.clientHeight-panel.querySelector('.sv-bar').offsetHeight-panel.querySelector('.sv-hero').offsetHeight-panel.querySelector('.sv-band-head').offsetHeight-16);}
 // The description toggles between its first sentence and the full school history.
 renderDescription(school){const description=$('#timeline-description'),short=firstSentence(school.foundingNote);description.textContent=!this.expanded&&short?short:school.foundingNote;if(short){const toggle=document.createElement('button');toggle.type='button';toggle.className='sv-more';toggle.textContent=this.expanded?'Read less':'Read more';toggle.setAttribute('aria-expanded',String(Boolean(this.expanded)));toggle.onclick=()=>{this.expanded=!this.expanded;this.renderDescription(school);description.tabIndex=-1;description.focus({preventScroll:true});};description.append(' ',toggle);}}
 render(){const school=INSTITUTIONS.find(i=>i.id===this.currentId);if(!school)return;const entries=this.store.getEntries(school.id);const labelFor=e=>e.personId?(PEOPLE.find(p=>p.id===e.personId)?.name||e.title||'Unknown person'):e.title;const layout=timelineLayout(entries,school.timelineStart??school.founded,new Date().getFullYear(),this.container.clientWidth,labelFor,this.availableHeight());this.layout=layout;$('#timeline-title').textContent=school.name;$('#timeline-founded').textContent=school.founded;$('#timeline-crest').dataset.school=school.id;const logo=$('#timeline-logo');if(logo.getAttribute('src')!==school.image){logo.hidden=false;logo.onerror=()=>{logo.hidden=true;};logo.src=school.image;}this.renderDescription(school);$('#founding-source').href=school.foundingSource;$('#timeline-range').textContent=`${layout.start} – ${layout.end}`;const interval=layout.end-layout.start>100?20:10;let ticks='';for(let year=Math.ceil((layout.start+1)/interval)*interval;year<layout.end;year+=interval){const x=layout.xForYear(year);if(x>layout.padding+50&&x<layout.width-layout.padding-50)ticks+=`<div class="sv-year-tick" style="left:${x}px;top:${layout.baseline}px"><span>${year}</span></div>`;}
 this.container.innerHTML=`<div class="sv-time-canvas" style="width:${layout.width}px;height:${layout.height}px;--axis-y:${layout.baseline}px;--entry-font-size:${layout.fontSize}px"><div class="sv-time-axis" style="left:${layout.padding}px;width:${layout.span}px"></div><div class="sv-origin" style="left:${layout.padding}px;top:${layout.baseline}px"><i></i><strong>${layout.start}</strong><span>${esc(school.timelineStartLabel||'Founded')}</span></div><div class="sv-present" style="left:${layout.width-layout.padding}px;top:${layout.baseline}px"><i></i><strong>${layout.end}</strong><span>${layout.end===new Date().getFullYear()?'Present':''}</span></div>${ticks}${layout.positioned.map(item=>{const offset=64+item.lane*layout.laneStep;return `<div class="sv-time-entry ${item.side?'below':'above'}" style="left:${item.x}px;top:${layout.baseline}px;--offset:${offset}px;--label-width:${item.labelWidth}px;--label-shift:${item.labelShift}px"><span class="sv-entry-dot"></span><span class="sv-entry-stem"></span><button data-entry="${esc(item.entry.id)}" title="${esc(item.label)}" aria-label="${esc(item.label)}, ${esc(item.entry.displayDate||item.entry.sortYear)}. Open profile.">${esc(item.label)}</button><span class="sv-entry-date">${esc(item.entry.displayDate||item.entry.sortYear)}</span></div>`;}).join('')}${!entries.length?'<p class="sv-timeline-empty">An open chapter.<span>Stories for this institution are being added.</span></p>':''}</div>`;this.controls();}
 controls(){$('#timeline-prev').disabled=this.container.scrollLeft<=1;$('#timeline-next').disabled=this.container.scrollLeft+this.container.clientWidth>=this.container.scrollWidth-2;}
 scroll(n){this.container.scrollBy({left:n*this.container.clientWidth*.7,behavior:reduced()?'instant':'smooth'});}
}
class SchoolPicker {
 constructor(timeline) {
  const grid = $('#school-grid');
  grid.innerHTML = [...INSTITUTIONS].sort((a, b) => a.founded - b.founded).map(school => `
   <button type="button" class="sv-school-card" data-school="${esc(school.id)}"${schoolColor(school) ? ` style="--school-color:${schoolColor(school)}"` : ''} aria-haspopup="dialog" aria-controls="timeline-overlay" aria-labelledby="school-name-${esc(school.id)}" aria-describedby="school-action-${esc(school.id)}">
    <span class="sv-school-image"><img src="${esc(school.image)}" alt="" decoding="async"><span class="sv-school-image-fallback" hidden aria-hidden="true">${esc(school.name)}</span></span>
    <span class="sv-school-name" id="school-name-${esc(school.id)}">${esc(school.name)}</span>
    <span class="sv-school-action" id="school-action-${esc(school.id)}">Explore timeline <span aria-hidden="true">&rarr;</span></span>
   </button>`).join('');
  grid.addEventListener('click', event => {
   const button = event.target.closest('[data-school]');
   if (button) {
    button.focus({preventScroll:true});
    timeline.open(button.dataset.school);
   }
  });
  grid.querySelectorAll('img').forEach(img => {
   const fallback = () => { img.hidden = true; img.nextElementSibling.hidden = false; };
   img.addEventListener('error', fallback);
   if (img.complete && !img.naturalWidth) fallback();
  });
 }
}
const overlayManager=new OverlayManager();
const profileCard=new ProfileCard(overlayManager);
const historyStore=new HistoryStore(INSTITUTIONS,PEOPLE,TIMELINES);
const institutionTimeline=new InstitutionTimeline(overlayManager,profileCard,historyStore);
window.southViewHistory=historyStore;
const schoolPicker=new SchoolPicker(institutionTimeline);
window.southViewContent=SouthViewContent.install(historyStore,window.SOUTHVIEW_CONTENT_CONFIG);
window.southViewContent.refresh().then(result=>{$('#southview-hbcu').dataset.contentStatus=result.state;});

// Restore one navigation level at a time without rebuilding the current timeline.
window.addEventListener('popstate', event => {
 const route=event.state?.southView;
 overlayManager.restoring=true;
 try {
  if(!route){overlayManager.closeTimeline();return;}
  if(!overlayManager.profile.hidden)overlayManager.closeProfile();
  if(overlayManager.timeline.hidden||institutionTimeline.currentId!==route.schoolId){
   institutionTimeline.open(route.schoolId);
  }
  if(route.personId)profileCard.open(route.personId);
  else if(route.entryId){
   const entry=historyStore.getEntries(route.schoolId).find(item=>item.id===route.entryId);
   if(entry)profileCard.openEvent(entry,INSTITUTIONS.find(school=>school.id===route.schoolId));
  }
 } finally {overlayManager.restoring=false;}
});
