const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const app=fs.readFileSync('app.js','utf8');
const start=app.indexOf(" contentStatus.hidden=result.state");
const code=app.slice(start,app.indexOf('\n});',start));
test('visitors see feed failures but no row-level partial-load warning',()=>{
 for(const state of ['partial','ready','error']){
  const contentStatus={hidden:false,textContent:'Loading profiles…'};
  vm.runInNewContext(code,{contentStatus,result:{state}});
  assert.equal(contentStatus.hidden,state!=='error');
  assert.equal(contentStatus.textContent,state==='error'?'Profiles could not be loaded. Please reload the page to try again.':'');
 }
});
