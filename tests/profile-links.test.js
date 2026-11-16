const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const app=fs.readFileSync('app.js','utf8');
function setup(){
 const calls=[];
 const context={URL,location:{href:'https://example.org/?other=1#stories'},history:{state:{},pushState(state,unused,url){this.state=state;context.location.href=url;calls.push({state,url});}}};
 vm.createContext(context);
 vm.runInContext(app.slice(app.indexOf('const profileURL='),app.indexOf('const profileItems='))+'\nglobalThis.api={profileURL,OverlayManager};',context);
 return {...context.api,context,calls};
}
test('opening profiles updates the shareable URL and leaving removes person',()=>{
 const {OverlayManager,context,calls}=setup();
 const manager=Object.create(OverlayManager.prototype);
 manager.navigate({schoolId:'morehouse',personId:'martin-luther-king-sr'});
 assert.equal(context.location.href,'https://example.org/?other=1&person=martin-luther-king-sr#stories');
 manager.navigate({schoolId:'morehouse'});
 assert.equal(context.location.href,'https://example.org/?other=1#stories');
 manager.restoring=true;
 manager.navigate({personId:'another'});
 assert.equal(calls.length,2);
});
test('profile IDs round-trip safely in query strings',()=>{
 const {profileURL}=setup();
 const id='a name & another/é';
 assert.equal(new URL(profileURL('https://example.org/?person=old',id)).searchParams.get('person'),id);
});
test('shared links resolve published profiles after content loads and create a local Back destination',()=>{
 for(const personId of ['published','missing']){
  const {context}=setup();
  const opened=[];
  context.initialPersonId=personId;
  context.historyStore={people:[{id:'published',connections:[{institutionId:'school'}]}]};
  context.INSTITUTIONS=[{id:'school'}];
  context.profileCard={open:(...args)=>opened.push(args)};
  context.history.replaceState=function(state,unused,url){this.state=state;context.location.href=url;};
  const start=app.indexOf(' if(initialPersonId){');
  vm.runInContext(app.slice(start,app.indexOf(" $('#southview-hbcu').dataset",start)),context);
  assert.equal(opened.length,personId==='published'?1:0);
  if(opened.length){assert.equal(opened[0][0],'published');assert.equal(opened[0][1].schoolId,'school');}
  assert.equal(new URL(context.location.href).searchParams.has('person'),false);
 }
});
