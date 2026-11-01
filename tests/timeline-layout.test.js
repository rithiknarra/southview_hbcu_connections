const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = {};
vm.createContext(context);
const app = fs.readFileSync('app.js', 'utf8');
vm.runInContext(fs.readFileSync('data.js', 'utf8') + '\n' + app.slice(app.indexOf('function timelineLayout('), app.indexOf('class OverlayManager')) + '\nglobalThis.data = {PEOPLE, TIMELINES, INSTITUTIONS, timelineLayout};', context);
const {PEOPLE, TIMELINES, INSTITUTIONS, timelineLayout} = context.data;

test('all school timelines leave room for endpoints and names at mobile and desktop widths', () => {
 for (const width of [320,390,768,1024,1440,1920]) {
  for (const timeline of TIMELINES) {
   const school = INSTITUTIONS.find(s => s.id === timeline.institutionId);
   const start = school.timelineStart ?? school.founded;
   const layout = timelineLayout(timeline.entries,start,2026,width,e=>PEOPLE.find(p=>p.id===e.personId)?.name||e.title,400);
   assert.equal(layout.start,start);
   assert.equal(layout.end,2026);
   assert(layout.width >= width);
   assert.equal(layout.xForYear(start),layout.padding);
   assert.equal(layout.xForYear(2026),layout.width-layout.padding);
   for (const item of layout.positioned) {
    assert.equal(item.lane,0);
    assert(item.x-item.labelWidth/2 >= layout.padding+layout.endpointSpace-1);
    assert(item.x+item.labelWidth/2 <= layout.width-layout.padding-layout.endpointSpace+1);
   }
   for(const side of [0,1]) {
    const row=layout.positioned.filter(p=>p.side===side);
    for(let i=1;i<row.length;i++) assert(row[i].x-row[i-1].x >= row[i].labelWidth+27);
   }
  }
 }
});

test('long empty periods do not dominate the active part of a timeline',()=>{
 const entries=[{sortYear:1925,title:'One'},{sortYear:1928,title:'Two'},{sortYear:1929,title:'Three'}];
 const layout=timelineLayout(entries,1881,2026,800,e=>e.title);
 const first=layout.positioned[0],last=layout.positioned.at(-1);
 assert(first.x-layout.padding < 350);
 assert(layout.width-layout.padding-last.x < 350);
 assert(layout.positioned[2].x-layout.positioned[0].x >= first.labelWidth+28);
});

test('same-year profiles stay distinct and the date scale remains ordered',()=>{
 const entries=Array.from({length:12},(_,i)=>({sortYear:1965,title:'Person '+i}));
 const layout=timelineLayout(entries,1881,2026,400,e=>e.title);
 assert.equal(new Set(layout.positioned.map(p=>p.x)).size,12);
 let last=-Infinity;
 for(let year=1881;year<=2026;year++) {const x=layout.xForYear(year);assert(x>=last);last=x;}
});


test('Clark predecessor label never intersects Adrienne’s date divider',()=>{
 const timeline=TIMELINES.find(t=>t.institutionId==='clark');
 for(const width of [320,390,768,1024,1440,1920]) {
  const layout=timelineLayout(timeline.entries,1865,2026,width,e=>PEOPLE.find(p=>p.id===e.personId).name);
  const adrienne=layout.positioned.find(p=>p.entry.personId==='adrienne-mcneil-herndon');
  assert(adrienne.x-adrienne.labelWidth/2 > layout.padding+120+28);
  const last=layout.positioned.at(-1);
  assert(last.x+last.labelWidth/2 < layout.width-layout.padding-120-28);
 }
});
