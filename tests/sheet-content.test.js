const test = require('node:test');
const assert = require('node:assert/strict');
const { readContent, install } = require('../sheet-content.js');
const institutions = [{ id: 'spelman', name: 'Spelman College', founded: 1881 }];
const headers = ['College','Timeline year','Name','Life dates','College connection','Institutional Connection and Legacy','Biography','Photo','Sources','Entry ID','Burial Location','Photo source'];
const values = ['Spelman College','1964','Example Person','','Graduated in 1964.','- Led a campus program.','1. Served the community.','https://drive.google.com/file/d/portrait123/view','Archive | https://example.org/biography','test-person','','https://example.org/portrait'];
const csv = (rows, columns = headers) => [columns, ...rows].map(row => row.map(v => '"' + String(v).replaceAll('"','""') + '"').join(',')).join('\n');

test('sheet photo source is independent of the uploaded portrait and normalizes source bullets', () => {
 const result = readContent(csv([values]), institutions);
 assert.equal(result.errors.length, 0);
 const person = result.people[0];
 assert.equal(person.image.sourceUrl, 'https://example.org/portrait');
 assert.match(person.image.url, /thumbnail\?id=portrait123/);
 assert.deepEqual(person.sources, [{ title:'Archive', url:'https://example.org/biography' }]);
 assert.deepEqual(person.legacy, ['Led a campus program.']);
});

test('optional photo source may be blank or absent in an older feed', () => {
 for (const [row, columns] of [[values.map((v,i)=>i===11?'':v),headers],[values.slice(0,-1),headers.slice(0,-1)]]) {
  const result = readContent(csv([row],columns),institutions);
  assert.equal(result.people.length,1);
  assert.equal(result.people[0].image.sourceUrl,'');
 }
});

test('invalid supplied photo sources reject the complete record', () => {
 for (const invalid of ['javascript:alert(1)','not a link','https://user:secret@example.org/photo']) {
  const row=values.map((v,i)=>i===11?invalid:v);
  const result=readContent(csv([row]),institutions);
  assert.equal(result.people.length,0);
  assert.equal(result.timelines.length,0);
  assert.match(result.errors[0].message,/Photo source/);
 }
});

test('publishing adds a complete person and unpublishing removes the person and timeline entry', async () => {
 let feed=csv([values]);
 const store={institutions,people:[],timelines:[{institutionId:'spelman',entries:[]}],notify(){}};
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv',yearBefore:2026},{fetch:async()=>({ok:true,text:async()=>feed}),checkImage:async()=>{}});
 await adapter.refresh();
 assert.equal(store.people.length,1);assert.equal(store.timelines[0].entries.length,1);
 assert.equal(store.people[0].image.sourceUrl,'https://example.org/portrait');
 feed=csv([]);await adapter.refresh();
 assert.equal(store.people.length,0);assert.equal(store.timelines.length,0);
});

test('unpublishing an existing profile removes its bundled version and timeline entry too', async () => {
 const original={id:'bundled-person',name:'Example Person',bio:['Original biography'],connections:[{institutionId:'spelman'}]};
 let feed=csv([values]);
 const store={institutions,people:[original],timelines:[{institutionId:'spelman',entries:[{id:'bundled-entry',personId:original.id}]}],notify(){}};
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv'},{fetch:async()=>({ok:true,text:async()=>feed}),checkImage:async()=>{}});
 await adapter.refresh();assert.equal(store.people.length,1);assert.equal(store.people[0].id,'bundled-person');
 feed=csv([]);await adapter.refresh();assert.equal(store.people.length,0);assert.equal(store.timelines.length,0);
 feed=csv([values]);await adapter.refresh();assert.equal(store.people[0].id,'bundled-person');assert.equal(store.timelines[0].entries.length,1);
});

test('live content hides bundles before loading and does not restore them on a failed first load', async () => {
 const store={institutions,people:[{id:'hidden',name:'Hidden Person'}],timelines:[{institutionId:'spelman',entries:[{personId:'hidden'}]}],notify(){}};
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv'},{fetch:async()=>{throw new Error('Offline');}});
 assert.equal(store.people.length,0);assert.equal(store.timelines.length,0);
 const result=await adapter.refresh();
 assert.equal(result.state,'error');assert.equal(store.people.length,0);assert.equal(store.timelines.length,0);
});

test('a failed refresh preserves the last successful empty publication list', async () => {
 let offline=false;
 const store={institutions,people:[{id:'hidden',name:'Hidden Person'}],timelines:[],notify(){}};
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv'},{fetch:async()=>{
  if(offline)throw new Error('Offline');
  return {ok:true,text:async()=>csv([])};
 }});
 assert.equal((await adapter.refresh()).state,'ready');offline=true;
 assert.equal((await adapter.refresh()).state,'error');assert.equal(store.people.length,0);
});

test('published existing profiles keep optional metadata while sheet fields remain editable', async () => {
 const store={institutions,people:[{id:'bundled',name:'Example Person',burialNote:'Former burial',burialLocation:'https://example.org/grave',bio:['Old text'],connections:[{institutionId:'spelman'}]}],timelines:[],notify(){}};
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv'},{fetch:async()=>({ok:true,text:async()=>csv([values.slice(0,10)],headers.slice(0,10))}),checkImage:async()=>{}});
 await adapter.refresh();
 assert.equal(store.people[0].burialNote,'Former burial');assert.equal(store.people[0].burialLocation,'https://example.org/grave');
 assert.deepEqual(store.people[0].bio,['Served the community.']);
});

test('without a live feed configured, bundled content remains available', async () => {
 const store={institutions,people:[{id:'bundled'}],timelines:[{institutionId:'spelman',entries:[]}],notify(){}};
 const adapter=install(store,{});
 assert.equal((await adapter.refresh()).configured,false);assert.equal(store.people[0].id,'bundled');assert.equal(store.timelines.length,1);
});

test('a malformed feed retains the last published records without restoring omitted bundles', async () => {
 let feed=csv([values]);
 const store={institutions,people:[{id:'omitted',name:'Unpublished Person',connections:[{institutionId:'spelman'}]}],timelines:[],notify(){}};
 const people=store.people,timelines=store.timelines;
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv'},{fetch:async()=>({ok:true,text:async()=>feed}),checkImage:async()=>{}});
 await adapter.refresh();feed='<html>Unavailable</html>';
 assert.equal((await adapter.refresh()).state,'error');
 assert.equal(store.people,people);assert.equal(store.timelines,timelines);
 assert.equal(store.people.length,1);assert.equal(store.people[0].id,'sheet:test-person');
});


test('published profiles accept an unlinked book citation alongside a web reference', async () => {
 const book = 'D. L. Henderson: South-View: An African American City of the Dead (2018), p. 241';
 const row = values.map((v, i) => i === 8 ? book + '\n' + v : v);
 const store = { institutions, people: [], timelines: [], notify() {} };
 const adapter = install(store, { csvUrl: 'https://example.org/feed.csv' }, {
  fetch: async () => ({ ok: true, text: async () => csv([row]) }), checkImage: async () => {}
 });
 const result = await adapter.refresh();
 assert.equal(result.state, 'ready');
 assert.equal(store.people.length, 1);
 assert.deepEqual(store.people[0].sources, [{ title: book }, { title: 'Archive', url: 'https://example.org/biography' }]);
 assert.equal(store.timelines[0].entries.length, 1);
});

test('malformed and unsafe source links cannot pass as unlinked citations', () => {
 for (const source of ['Archive | missing-url', 'https://', 'javascript:alert(1)', 'file:///private/book']) {
  const result = readContent(csv([values.map((v, i) => i === 8 ? source : v)]), institutions);
  assert.equal(result.people.length, 0, source);
  assert.equal(result.errors.length, 1, source);
 }
});

test('published sheet cannot replace a reviewed portrait while retaining its license', async () => {
 const image={url:'images/reviewed.jpg',alt:'Example Person',sourceUrl:'https://archive.example/item',license:'CC BY 4.0',credit:'Archive photographer',fit:'contain'};
 const original={id:'reviewed-person',name:'Example Person',image,connections:[{institutionId:'spelman'}]};
 const store={institutions,people:[original],timelines:[],notify(){}};
 const checked=[];
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv',sheetOwnsProfiles:true},{
  fetch:async()=>({ok:true,text:async()=>csv([values])}),
  checkImage:async url=>{checked.push(url);if(url!==image.url)throw new Error('Stale sheet image');}
 });
 const result=await adapter.refresh();
 assert.equal(result.state,'ready');
 assert.deepEqual(checked,[image.url]);
 assert.deepEqual(store.people[0].image,image);
 assert.deepEqual(store.people[0].bio,['Served the community.']);
});


test('importing every existing profile preserves all wording, portrait metadata, and college timelines', async () => {
 const fs=require('node:fs');
 const source=fs.readFileSync('data.js','utf8');
 const people=JSON.parse(source.match(/const PEOPLE = (\[.*?\]);/s)[1]);
 const institutions=JSON.parse(source.match(/const INSTITUTIONS = (\[.*?\]);/s)[1]);
 const timelines=JSON.parse(source.match(/const TIMELINES = (\[.*?\]);/s)[1]);
 const rows=people.map(person=>{
  const connection=person.connections[0];
  const school=institutions.find(s=>s.id===connection.institutionId);
  const entry=timelines.find(t=>t.institutionId===school.id).entries.find(e=>e.personId===person.id);
  return [school.name,entry.sortYear,person.name,person.years,connection.label,
   person.legacy.join('\n'),person.bio.join('\n'),`https://example.org/${encodeURIComponent(person.image.url)}`,
   person.sources.map(s=>`${s.title} | ${s.url}`).join('\n'),person.id,person.burialLocation||'',person.image.sourceUrl];
 });
 const store={people:structuredClone(people),institutions,timelines:structuredClone(timelines),notify(){}};
 let currentRows=rows;
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv',yearBefore:2026,sheetOwnsProfiles:true},{fetch:async()=>({ok:true,text:async()=>csv(currentRows)}),checkImage:async()=>{}});
 assert.equal(store.people.length,0,'bundled people must not flash before publication is known');
 const result=await adapter.refresh();
 assert.equal(result.state,'ready');assert.equal(result.added,people.length);
 assert.equal(store.people.length,people.length);
 assert.deepEqual(store.timelines,timelines);
 for(const original of people){
  const imported=store.people.find(p=>p.id===original.id);
  const expected={...original,image:original.image.license ? original.image : {...original.image,url:`https://example.org/${encodeURIComponent(original.image.url)}`}};
  assert.deepEqual(imported,expected,original.name);
 }
 // An edit to one shared card must apply everywhere it appears without dropping another college.
 rows.find(r=>r[2]==='Asa G. Yancey Sr.')[6]='Updated shared biography.';
 const edited=await adapter.refresh();assert.equal(edited.state,'ready');
 const yancey=store.people.find(p=>p.id==='asa-g-yancey-sr');
 assert.deepEqual(yancey.bio,['Updated shared biography.']);assert.equal(yancey.connections.length,2);
 assert.equal(store.timelines.find(t=>t.institutionId==='medicine').entries.filter(e=>e.personId===yancey.id).length,1);
 // Removing a shared person from the published feed hides every appearance.
 currentRows=rows.filter(row=>row[9]!==yancey.id);
 await adapter.refresh();
 assert.equal(store.people.some(person=>person.id===yancey.id),false);
 assert.equal(store.timelines.some(t=>t.entries.some(e=>e.personId===yancey.id)),false);
 // Rechecking Published restores one shared card and both original timeline entries.
 currentRows=rows;
 await adapter.refresh();
 assert.equal(store.people.filter(person=>person.id===yancey.id).length,1);
 assert.equal(store.people.find(person=>person.id===yancey.id).connections.length,2);
 assert.equal(store.timelines.flatMap(t=>t.entries).filter(e=>e.personId===yancey.id).length,2);
});

test('sheet ownership hides deleted and invalid records without resurrecting bundled profiles', async () => {
 const original={id:'bundled-person',name:'Example Person',bio:['Original biography'],connections:[{institutionId:'spelman'}]};
 const event={id:'school-event',sortYear:1900,title:'School event'};
 let feed=csv([values]),fail=false,brokenPhoto=false;
 const store={institutions,people:[original],timelines:[{institutionId:'spelman',entries:[event,{id:'bundled-entry',personId:original.id,sortYear:1964}]}],notify(){}};
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv',sheetOwnsProfiles:true},{
  fetch:async()=>{if(fail)throw new Error('Feed unavailable');return {ok:true,text:async()=>feed};},
  checkImage:async()=>{if(brokenPhoto)throw new Error('Broken portrait');}
 });
 assert.deepEqual(store.people,[]);
 assert.deepEqual(store.timelines[0].entries,[event]);
 fail=true;await adapter.refresh();assert.deepEqual(store.people,[],'initial failure must not expose unpublished bundled people');
 fail=false;await adapter.refresh();assert.equal(store.people.length,1);
 feed=csv([]);await adapter.refresh();assert.deepEqual(store.people,[]);assert.deepEqual(store.timelines[0].entries,[event]);
 fail=true;await adapter.refresh();assert.deepEqual(store.people,[],'failed refresh must keep hidden people hidden');
 fail=false;feed=csv([values]);brokenPhoto=true;await adapter.refresh();assert.deepEqual(store.people,[]);
 brokenPhoto=false;await adapter.refresh();assert.equal(store.people.length,1);
 // The original row identity continues to match if an editor corrects the name.
 const renamed=values.map((value,i)=>i===2?'Corrected Person':i===9?'bundled-person':value);
 feed=csv([renamed]);await adapter.refresh();
 assert.equal(store.people.length,1);assert.equal(store.people[0].id,original.id);assert.equal(store.people[0].name,'Corrected Person');
 fail=true;await adapter.refresh();assert.equal(store.people[0].name,'Corrected Person','a failed refresh retains the last valid snapshot');
});
