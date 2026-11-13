const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const app=fs.readFileSync('app.js','utf8');
const context={URL};vm.createContext(context);
vm.runInContext(fs.readFileSync('data.js','utf8')+'\n'+app.slice(app.indexOf('const esc='),app.indexOf('const safeURL='))+'\n'+app.slice(app.indexOf('const burialLocationMarkup'),app.indexOf('const firstSentence'))+'\n'+app.slice(app.indexOf('const photoCreditMarkup'),app.indexOf('class ProfileCard'))+'\nglobalThis.data={PEOPLE,TIMELINES,profileSourcesMarkup,photoCreditMarkup,profileLinksMarkup};',context);
const {PEOPLE,TIMELINES,profileSourcesMarkup,photoCreditMarkup,profileLinksMarkup}=context.data;

test('event links appear on separate lines above the grave link',()=>{
 const html=profileLinksMarkup({eventConnections:[{name:'Reconstruction Era',url:'https://example.org/reconstruction'},{name:'The Original 33 Expelled',url:'https://example.org/original-33'}],burialLocation:'https://example.org/grave'});
 assert.equal((html.match(/class="sv-burial-location"/g)||[]).length,3);
 assert(html.indexOf('Connection to Reconstruction Era')<html.indexOf('Connection to The Original 33 Expelled'));
 assert(html.indexOf('Connection to The Original 33 Expelled')<html.indexOf('View gravestone location'));
 assert(!profileLinksMarkup({eventConnections:[{name:'Unsafe',url:'javascript:alert(1)'}],burialLocation:''}));
});

test('all Atlanta and Clark Atlanta cards have substantive bullets and non-Wikipedia references',()=>{
 const entries=TIMELINES.filter(t=>['atlanta','clark'].includes(t.institutionId)).flatMap(t=>t.entries);
 assert.equal(entries.length,10);
 for(const entry of entries){
  const person=PEOPLE.find(p=>p.id===entry.personId);
  assert(person.bio.length>0,person.name);
  assert(person.legacy.length>0,person.name);
  assert(!/remains unverified|His timeline date|All-Star selection|70,000 votes/i.test([...person.bio,...person.legacy].join(' ')),person.name);
  assert(person.sources.length>0,person.name);
  assert.equal(new Set(person.sources.map(s=>s.url||s.title)).size,person.sources.length,person.name);
  for(const source of person.sources){
   assert(source.title);if(!source.url)continue;const url=new URL(source.url);
   assert(['https:','http:'].includes(url.protocol));
   assert(!/(^|\.)wikipedia\.org$/i.test(url.hostname));
  }
  const html=profileSourcesMarkup(person);
  assert.equal((html.match(/<li>/g)||[]).length,person.sources.length,person.name);
  assert.equal((html.match(/rel="noopener noreferrer"/g)||[]).length,person.sources.filter(s=>s.url).length);
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
  assert(html.includes('Photo: '),person.name);
  assert(person.image.caption,person.name);
  assert(!html.includes('sv-photo-attribution'),person.name);
  assert(!html.includes('sv-photo-license'),person.name);
 }
});

test('portrait captions show visible escaped credits and linked required licenses',()=>{
 const html=photoCreditMarkup({sourceUrl:'https://example.org/portrait',credit:'<Photo & Archive>',license:'CC BY',licenseUrl:'https://example.org/license',attributionRequired:true});
 assert.equal((html.match(/<a /g)||[]).length,2);
 assert(html.includes('title="&lt;Photo &amp; Archive&gt; · CC BY"'));
 assert(html.includes('Photo: &lt;Photo &amp; Archive&gt;'));
 assert(!html.includes('<Photo & Archive>'));
 assert(!photoCreditMarkup({sourceUrl:'javascript:alert(1)'}));
 assert(!photoCreditMarkup({sourceUrl:'file:///tmp/photo'}));
 assert.equal(photoCreditMarkup({}),'');
 assert(!photoCreditMarkup({sourceUrl:'https://example.org/photo',license:'Public domain'}).includes('>Public domain<'));
});

test('all published cards expose their references and resolve to complete local records',()=>{
 const people=new Map(PEOPLE.map(p=>[p.id,p]));
 assert.equal(people.size,PEOPLE.length);
 assert(!people.has('martin-luther-king-jr'));
 for(const person of PEOPLE){
  assert(person.bio.length&&person.legacy.length,person.name);
  assert.equal(new Set([...person.bio,...person.legacy]).size,person.bio.length+person.legacy.length,person.name);
  assert.equal(new Set(person.sources.map(s=>s.url||s.title)).size,person.sources.length,person.name);
  assert(person.sources.length>0,person.name);
  assert.equal((profileSourcesMarkup(person).match(/<li>/g)||[]).length,person.sources.length,person.name);
  for(const source of person.sources){
   assert(source.title,person.name);
   if(!source.url)continue;
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


test('inline citations escape prose and accept only safe web sources',()=>{
 const scope={URL};vm.createContext(scope);
 vm.runInContext(app.slice(app.indexOf('const esc='),app.indexOf('const safeURL='))+'\n'+app.slice(app.indexOf('const profileItems='),app.indexOf('// User-provided exact gravestone'))+'\nthis.render=citedTextMarkup;this.section=profileSection;',scope);
 const html=scope.render('Taught in 1930. [Archive](https://example.org/item?a=1&b=2) <script>bad</script>');
 assert(html.includes('>(Archive)</a>')||html.includes('>(Archive)<span'));
 assert(html.includes('a=1&amp;b=2'));assert(!html.includes('<script>'));
 assert(!scope.render('[bad](javascript:alert(1))').includes('<a '));
 assert(!scope.render('[bad](https://user:password@example.org/)').includes('<a '));
 assert(!scope.render('[wiki](https://en.wikipedia.org/wiki/Test)').includes('<a '));
 assert.equal((scope.section('Biography',['First. [A](https://a.example/)','Second. [B](https://b.example/)']).match(/sv-inline-citation/g)||[]).length,2);
});
