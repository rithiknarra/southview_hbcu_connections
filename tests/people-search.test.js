const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const app=fs.readFileSync('app.js','utf8');
const context={};vm.createContext(context);
vm.runInContext(fs.readFileSync('data.js','utf8')+'\n'+app.slice(app.indexOf('const searchName='),app.indexOf('class PeopleSearch'))+'\nglobalThis.search={findPeople,PEOPLE,INSTITUTIONS};',context);
const {findPeople,PEOPLE,INSTITUTIONS}=context.search;
test('search matches names with multiple words, punctuation, and accents',()=>{
 assert(findPeople(PEOPLE,INSTITUTIONS,'KING sr').some(p=>p.id==='martin-luther-king-sr'));
 assert.equal(findPeople([{name:'Zoë O’Neal-Smith',connections:[{institutionId:'clark'}]}],INSTITUTIONS,'zoe oneal smith').length,1);
 assert.equal(findPeople(PEOPLE,INSTITUTIONS,'no such person').length,0);
});
test('multi-college people appear once and can be found through either college',()=>{
 for(const college of ['clark','spelman']){
  const found=findPeople(PEOPLE,INSTITUTIONS,'usher',college);
  assert.equal(found.length,1);assert.equal(found[0].id,'bazoline-estelle-usher');
 }
 assert.equal(findPeople(PEOPLE,INSTITUTIONS,'usher','morehouse').length,0);
 assert.equal(findPeople(PEOPLE,INSTITUTIONS,'usher').length,1);
});
test('a college filter can browse people without a name and excludes events',()=>{
 const found=findPeople(PEOPLE,INSTITUTIONS,'','clark');
 assert.equal(found.length,10);
 assert.equal(findPeople([{name:'Campus event',event:true,connections:[{institutionId:'clark'}]}],INSTITUTIONS,'campus').length,0);
});
