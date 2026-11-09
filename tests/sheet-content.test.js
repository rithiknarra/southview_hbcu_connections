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
 await adapter.refresh();assert.equal(store.people.length,1);assert.equal(store.people[0].id,'sheet:test-person');
 feed=csv([]);await adapter.refresh();assert.equal(store.people.length,0);assert.equal(store.timelines.length,0);
 feed=csv([values]);await adapter.refresh();assert.equal(store.people[0].id,'sheet:test-person');assert.equal(store.timelines[0].entries.length,1);
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
