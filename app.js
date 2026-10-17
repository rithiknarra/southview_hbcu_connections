'use strict';
const $=s=>document.querySelector(s);
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL=v=>{try{const u=new URL(v,location.href);return ['http:','https:','file:'].includes(u.protocol)?u.href:''}catch{return ''}};
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
class HistoryStore {
 constructor(institutions,people,timelines){this.institutions=institutions;this.people=people;this.timelines=timelines;this.listeners=new Set();}
 subscribe(fn){this.listeners.add(fn);return()=>this.listeners.delete(fn);}
 notify(id){this.listeners.forEach(fn=>fn(id));}
 getEntries(id){return [...(this.timelines.find(t=>t.institutionId===id)?.entries||[])].sort((a,b)=>a.sortYear-b.sortYear||a.id.localeCompare(b.id));}
 validate(id,entry){const school=this.institutions.find(i=>i.id===id);if(!school)throw new Error('Unknown institution: '+id);if(!entry.id||!Number.isFinite(entry.sortYear))throw new Error('Each entry needs an id and numeric sortYear.');if(entry.sortYear<school.founded)throw new Error('Entry predates this institution. Use the appropriate historical institution.');if(entry.personId&&!this.people.some(p=>p.id===entry.personId))throw new Error('Add the person before adding their timeline entry.');if(!entry.personId&&!entry.title)throw new Error('An event entry needs a title.');}
 addPerson(person){if(!person.id||!person.name)throw new Error('Person id and name are required.');if(this.people.some(p=>p.id===person.id))throw new Error('Person id already exists.');this.people.push({years:'',bio:'',legacy:'',burialLocation:'',connections:[],sources:[],...person});this.notify(null);}
 addEntry(id,entry){this.validate(id,entry);let timeline=this.timelines.find(t=>t.institutionId===id);if(!timeline){timeline={institutionId:id,entries:[]};this.timelines.push(timeline);}if(timeline.entries.some(e=>e.id===entry.id))throw new Error('Entry id already exists in this timeline.');timeline.entries.push({...entry});this.notify(id);}
 updateEntry(id,entryId,changes){const timeline=this.timelines.find(t=>t.institutionId===id),index=timeline?.entries.findIndex(e=>e.id===entryId);if(index==null||index<0)throw new Error('Entry not found.');const entry={...timeline.entries[index],...changes,id:entryId};this.validate(id,entry);timeline.entries[index]=entry;this.notify(id);}
 removeEntry(id,entryId){const timeline=this.timelines.find(t=>t.institutionId===id);if(timeline){timeline.entries=timeline.entries.filter(e=>e.id!==entryId);this.notify(id);}}
}
function timelineLayout(entries,start,currentYear,width,labelFor){
 const end=Math.max(currentYear,start+1,...entries.map(e=>e.sortYear));
 const canvasWidth=Math.max(820,width),padding=60,span=canvasWidth-padding*2;
 const lanes=[[],[]];
 const positioned=entries.map((entry,index)=>{const x=padding+(entry.sortYear-start)/(end-start)*span;const label=labelFor(entry),labelWidth=Math.min(240,Math.max(130,label.length*10));let side=index%2,lane=0;while(lanes[side][lane]!=null&&x-labelWidth/2<lanes[side][lane]+24)lane++;lanes[side][lane]=x+labelWidth/2;return {entry,x,label,labelWidth,side,lane};});
 const above=Math.max(1,lanes[0].length),below=Math.max(1,lanes[1].length);const baseline=130+above*84,height=baseline+below*84+135;
 return {start,end,width:canvasWidth,padding,span,baseline,height,positioned};
}
class OverlayManager{
 constructor(){this.timeline=$('#timeline-overlay');this.profile=$('#profile-overlay');this.backdrop=$('#profile-backdrop');$('#close-timeline').onclick=()=>this.closeTimeline();$('#close-profile').onclick=()=>this.closeProfile();this.backdrop.onclick=()=>this.closeProfile();document.addEventListener('keydown',e=>{const panel=!this.profile.hidden?this.profile:!this.timeline.hidden?this.timeline:null;if(!panel)return;if(e.key==='Escape'){e.preventDefault();if(panel===this.profile)this.closeProfile();else this.closeTimeline();}if(e.key==='Tab'){const items=[...panel.querySelectorAll('button:not(:disabled),a[href],[tabindex="0"]')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});}
 openTimeline(){if(this.timeline.hidden){this.trigger=document.activeElement;this.oldOverflow=document.body.style.overflow;}this.timeline.hidden=false;document.body.style.overflow='hidden';$('#school-browser').inert=true;$('#close-timeline').focus({preventScroll:true});}
 closeTimeline(){if(!this.profile.hidden)this.closeProfile();this.timeline.hidden=true;document.body.style.overflow=this.oldOverflow||'';$('#school-browser').inert=false;if(this.trigger?.isConnected)this.trigger.focus({preventScroll:true});}
 openProfile(){this.profileTrigger=document.activeElement;this.profile.hidden=false;this.backdrop.hidden=false;this.timeline.inert=true;$('#close-profile').focus({preventScroll:true});this.profile.scrollTop=0;}
 closeProfile(){this.profile.hidden=true;this.backdrop.hidden=true;this.timeline.inert=false;if(this.profileTrigger?.isConnected)this.profileTrigger.focus({preventScroll:true});}
}
const profileList=value=>`<ul class="sv-profile-list">${(Array.isArray(value)?value:[value]).filter(item=>item!=null&&String(item).trim()).map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;
// Burial locations are optional absolute web links, displayed separately from biography bullets.
const burialLocationMarkup = value => {
 let url = '';
 if (typeof value === 'string' && value.trim()) {
  try {
   const parsed = new URL(value.trim());
   if (['https:', 'http:'].includes(parsed.protocol)) url = parsed.href;
  } catch { /* Missing or invalid links use the default text. */ }
 }
 return `<h3>Burial Location</h3><p class="sv-burial-location">${url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">View burial location on Google Maps <span aria-hidden="true">&#8599;</span><span class="sv-sr"> (opens in a new tab)</span></a>` : 'Location is not available.'}</p>`;
};
class ProfileCard{
 constructor(manager){this.manager=manager;}
 open(id){const p=PEOPLE.find(p=>p.id===id);if(p)this.render(p);}
 openEvent(entry,school){this.render({name:entry.title,years:entry.displayDate||String(entry.sortYear),connections:[{institutionId:school.id,label:'Institution event'}],bio:entry.summary||'',legacy:entry.details||'',sources:entry.sources||[],image:entry.image||null,event:true});}
 render(p){const image=p.image&&safeURL(p.image.url);$('#profile-content').innerHTML=`<div class="sv-profile-visual"><div class="sv-placeholder" ${image?'hidden':''}><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="29" r="17"/><path d="M15 90C15 42 85 42 85 90"/></svg><span>${p.event?'Event image':'Portrait photograph'}</span></div>${image?`<img class="sv-photo" src="${esc(image)}" alt="${esc(p.image.alt||p.name)}"><p class="sv-photo-credit">${esc(p.image.credit||'')}</p>`:''}</div><div class="sv-profile-copy"><h2 id="profile-title">${esc(p.name)}</h2><p class="sv-life-dates">${esc(p.years||'')}</p><p class="sv-profile-connection">${(p.connections || []).map(c => esc(c.label)).join(' ')}</p><h3>Institutional Connection and Legacy</h3>${profileList(p.legacy)}<h3>Biography</h3>${profileList(p.bio)}${p.event ? '' : burialLocationMarkup(p.burialLocation)}</div>`;const img=$('#profile-content img');if(img)img.onerror=()=>{img.hidden=true;$('.sv-placeholder').hidden=false;};this.manager.openProfile();}
}
class InstitutionTimeline{
 constructor(manager,profile,store){this.manager=manager;this.profile=profile;this.store=store;this.container=$('#timeline-entries');this.container.onclick=e=>{const b=e.target.closest('[data-entry]');if(b){const entry=this.store.getEntries(this.currentId).find(e=>e.id===b.dataset.entry);if(entry?.personId)this.profile.open(entry.personId);else if(entry)this.profile.openEvent(entry,INSTITUTIONS.find(i=>i.id===this.currentId));}};this.container.onscroll=()=>this.controls();$('#timeline-prev').onclick=()=>this.scroll(-1);$('#timeline-next').onclick=()=>this.scroll(1);this.lastWidth=0;new ResizeObserver(()=>{const width=this.container.clientWidth;if(width&&width!==this.lastWidth&&this.currentId){this.lastWidth=width;this.render();}this.controls();}).observe(this.container);this.store.subscribe(id=>{if(this.currentId&&(!id||id===this.currentId))this.render();});}
 open(id){if(!INSTITUTIONS.some(i=>i.id===id))return;this.currentId=id;this.manager.openTimeline();this.render();this.container.scrollLeft=0;this.controls();}
 render(){const school=INSTITUTIONS.find(i=>i.id===this.currentId);if(!school)return;const entries=this.store.getEntries(school.id);const labelFor=e=>e.personId?(PEOPLE.find(p=>p.id===e.personId)?.name||e.title||'Unknown person'):e.title;const layout=timelineLayout(entries,school.founded,new Date().getFullYear(),this.container.clientWidth,labelFor);this.layout=layout;$('#timeline-title').textContent=school.name;$('#timeline-description').textContent=school.foundingNote;$('#timeline-range').textContent=`${layout.start} to ${layout.end}`;$('#founding-source').href=school.foundingSource;const interval=layout.end-layout.start>100?20:10;let ticks='';for(let year=Math.ceil((layout.start+1)/interval)*interval;year<layout.end;year+=interval){const x=layout.padding+(year-layout.start)/(layout.end-layout.start)*layout.span;if(x>layout.padding+50&&x<layout.width-layout.padding-50)ticks+=`<div class="sv-year-tick" style="left:${x}px;top:${layout.baseline}px"><span>${year}</span></div>`;}
 this.container.innerHTML=`<div class="sv-time-canvas" style="width:${layout.width}px;height:${layout.height}px;--axis-y:${layout.baseline}px"><div class="sv-time-axis" style="left:${layout.padding}px;width:${layout.span}px"></div><div class="sv-origin" style="left:${layout.padding}px;top:${layout.baseline}px"><i></i><strong>${layout.start}</strong><span>Founded</span></div><div class="sv-present" style="left:${layout.width-layout.padding}px;top:${layout.baseline}px"><i></i><strong>${layout.end}</strong><span>${layout.end===new Date().getFullYear()?'Present':''}</span></div>${ticks}${layout.positioned.map(item=>{const offset=64+item.lane*84;return `<div class="sv-time-entry ${item.side?'below':'above'}" style="left:${item.x}px;top:${layout.baseline}px;--offset:${offset}px;--label-width:${item.labelWidth}px"><span class="sv-entry-dot"></span><span class="sv-entry-stem"></span><button data-entry="${esc(item.entry.id)}" title="${esc(item.label)}" aria-label="${esc(item.label)}, ${esc(item.entry.displayDate||item.entry.sortYear)}. Open profile.">${esc(item.label)}</button><span class="sv-entry-date">${esc(item.entry.displayDate||item.entry.sortYear)}</span></div>`;}).join('')}${!entries.length?'<p class="sv-timeline-empty">An open chapter.<span>Stories for this institution are being added.</span></p>':''}</div>`;this.controls();}
 controls(){$('#timeline-prev').disabled=this.container.scrollLeft<=1;$('#timeline-next').disabled=this.container.scrollLeft+this.container.clientWidth>=this.container.scrollWidth-2;}
 scroll(n){this.container.scrollBy({left:n*this.container.clientWidth*.7,behavior:reduced()?'instant':'smooth'});}
}
class SchoolPicker {
 constructor(timeline) {
  const grid = $('#school-grid');
  grid.innerHTML = [...INSTITUTIONS].sort((a, b) => a.founded - b.founded).map(school => `
   <button type="button" class="sv-school-card" data-school="${esc(school.id)}" aria-haspopup="dialog" aria-controls="timeline-overlay" aria-labelledby="school-name-${esc(school.id)}" aria-describedby="school-action-${esc(school.id)}">
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
