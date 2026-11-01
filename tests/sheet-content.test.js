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
 assert.equal(store.people.length,0);assert.equal(store.timelines[0].entries.length,0);
});

test('unpublishing a sheet replacement restores its bundled profile', async () => {
 const original={id:'bundled-person',name:'Example Person',bio:['Original biography'],connections:[{institutionId:'spelman'}]};
 let feed=csv([values]);
 const store={institutions,people:[original],timelines:[{institutionId:'spelman',entries:[{id:'bundled-entry',personId:original.id}]}],notify(){}};
 const adapter=install(store,{csvUrl:'https://example.org/feed.csv'},{fetch:async()=>({ok:true,text:async()=>feed}),checkImage:async()=>{}});
 await adapter.refresh();assert.equal(store.people.length,1);assert.equal(store.people[0].id,'sheet:test-person');
 feed=csv([]);await adapter.refresh();assert.deepEqual(store.people,[original]);assert.equal(store.timelines[0].entries[0].personId,original.id);
});
