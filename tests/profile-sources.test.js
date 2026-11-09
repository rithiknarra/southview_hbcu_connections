const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const app=fs.readFileSync('app.js','utf8');
const context={URL};vm.createContext(context);
vm.runInContext(fs.readFileSync('data.js','utf8')+'\n'+app.slice(app.indexOf('const esc='),app.indexOf('const safeURL='))+'\n'+app.slice(app.indexOf('const photoCreditMarkup'),app.indexOf('class ProfileCard'))+'\nglobalThis.data={PEOPLE,TIMELINES,profileSourcesMarkup,photoCreditMarkup};',context);
const {PEOPLE,TIMELINES,profileSourcesMarkup,photoCreditMarkup}=context.data;

test('all Clark Atlanta cards have substantive bullets and non-Wikipedia references',()=>{
 const entries=TIMELINES.find(t=>t.institutionId==='clark').entries;
 assert.equal(entries.length,10);
 for(const entry of entries){
  const person=PEOPLE.find(p=>p.id===entry.personId);
  assert(person.bio.length>0,person.name);
  assert(person.legacy.length>0,person.name);
  assert(!/remains unverified|His timeline date|All-Star selection|70,000 votes/i.test([...person.bio,...person.legacy].join(' ')),person.name);
  assert(person.sources.length>0,person.name);
  assert.equal(new Set(person.sources.map(s=>s.url)).size,person.sources.length,person.name);
  for(const source of person.sources){
   assert(source.title);const url=new URL(source.url);
   assert(['https:','http:'].includes(url.protocol));
   assert(!/(^|\.)wikipedia\.org$/i.test(url.hostname));
  }
  const html=profileSourcesMarkup(person);
  assert.equal((html.match(/<li>/g)||[]).length,person.sources.length,person.name);
  assert.equal((html.match(/rel="noopener noreferrer"/g)||[]).length,person.sources.length);
 }
});

test('source rendering escapes titles and rejects unsafe or Wikipedia links',()=>{
 const html=profileSourcesMarkup({showSources:true,sources:[
  {title:'<script>alert(1)</script>',url:'https://example.org/?a=1&b=2'},
  {title:'unsafe',url:'javascript:alert(1)'},
  {title:'local',url:'file:///tmp/source'},
  {title:'Wikipedia',url:'https://en.wikipedia.org/wiki/Example'},
  {title:'broken',url:'invalid'}
 ]});
 assert(!html.includes('<script>'));assert(html.includes('&lt;script&gt;'));
 assert.equal((html.match(/<li>/g)||[]).length,1);
 assert.equal(profileSourcesMarkup({sources:[{title:'Not enabled',url:'https://example.org'}]}),'');
 assert.equal(profileSourcesMarkup({showSources:true,sources:[]}),'');
});

test('every bundled portrait has a source caption, including portraits without mandatory attribution',()=>{
 for(const person of PEOPLE){
  const html=photoCreditMarkup(person.image);
  assert(html.includes('class="sv-photo-source"'),person.name);
  assert(html.includes('Photo source'),person.name);
  assert(!html.includes('sv-photo-attribution'),person.name);
  assert(!html.includes('sv-photo-license'),person.name);
 }
});

test('portrait captions show one source link with required credits available accessibly',()=>{
 const html=photoCreditMarkup({sourceUrl:'https://example.org/portrait',credit:'<Photo & Archive>',license:'CC BY',licenseUrl:'https://example.org/license',attributionRequired:true});
 assert.equal((html.match(/<a /g)||[]).length,1);
 assert(html.includes('title="&lt;Photo &amp; Archive&gt; · CC BY · https://example.org/license"'));
 assert(html.includes('Photo source<span class="sv-sr">'));
 assert(!html.includes('<Photo & Archive>'));
 assert(!photoCreditMarkup({sourceUrl:'javascript:alert(1)'}));
 assert(!photoCreditMarkup({sourceUrl:'file:///tmp/photo'}));
 assert.equal(photoCreditMarkup({}),'');
 assert(!photoCreditMarkup({sourceUrl:'https://example.org/photo',license:'Public domain'}).includes('Public domain'));
});

test('all published cards expose their references and resolve to complete local records',()=>{
 const people=new Map(PEOPLE.map(p=>[p.id,p]));
 assert.equal(people.size,PEOPLE.length);
 assert(!people.has('martin-luther-king-jr'));
 for(const person of PEOPLE){
  assert(person.bio.length&&person.legacy.length,person.name);
  assert.equal(new Set([...person.bio,...person.legacy]).size,person.bio.length+person.legacy.length,person.name);
  assert.equal(new Set(person.sources.map(s=>s.url)).size,person.sources.length,person.name);
  assert(person.sources.length>0,person.name);
  assert.equal((profileSourcesMarkup(person).match(/<li>/g)||[]).length,person.sources.length,person.name);
  for(const source of person.sources){
   assert(source.title,person.name);
   const url=new URL(source.url);assert(['http:','https:'].includes(url.protocol));
   assert(!/(^|\.)wikipedia\.org$/i.test(url.hostname),person.name);
  }
  assert(fs.existsSync(person.image.url),person.name);
 }
 for(const timeline of TIMELINES)for(const entry of timeline.entries){
  if(!entry.personId)continue;
  assert(people.has(entry.personId),entry.personId);
  assert(people.get(entry.personId).connections.some(c=>c.institutionId===timeline.institutionId),entry.personId);
 }
});


test('print references display as escaped text alongside linked web sources', () => {
 const book = 'South-View: An African American City of the Dead, p. 241';
 const html = profileSourcesMarkup({ showSources: true, sources: [
  { title: book },
  { title: '<Archive & manuscript>' },
  { title: 'Web archive', url: 'https://example.org/archive' },
  { title: '  ' }
 ] });
 assert(html.includes('<li>' + book + '</li>'));
 assert(html.includes('&lt;Archive &amp; manuscript&gt;'));
 assert.equal((html.match(/<li>/g) || []).length, 3);
 assert.equal((html.match(/<a /g) || []).length, 1);
 assert(!html.includes('worldcat'));
});
