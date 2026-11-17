const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const code=fs.readFileSync('theme.js','utf8');
function setup(saved,blocked=false){
 const events={},windowEvents={},root={dataset:{}},writes=[];
 const buttons=Array.from({length:3},()=>({attributes:{},handlers:{},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,v){this.handlers[k]=v;}}));
 const context={document:{documentElement:root,querySelectorAll:()=>buttons,addEventListener:(k,v)=>events[k]=v},window:{addEventListener:(k,v)=>windowEvents[k]=v},localStorage:{getItem(){if(blocked)throw Error();return saved;},setItem(k,v){if(blocked)throw Error();writes.push([k,v]);}}};
 vm.runInNewContext(code,context);events.DOMContentLoaded();return {root,buttons,writes,windowEvents};
}
test('default stays light and all controls toggle and persist the same theme',()=>{
 const state=setup(null);assert.equal(state.root.dataset.theme,'light');state.buttons[1].handlers.click();assert.equal(state.root.dataset.theme,'dark');
 for(const button of state.buttons){assert.equal(button.attributes['aria-label'],'Switch to light mode');assert.equal(button.attributes['aria-pressed'],'true');}
 assert.deepEqual(state.writes,[['southview-theme','dark']]);state.buttons[2].handlers.click();assert.equal(state.root.dataset.theme,'light');
});
test('saved mode loads and toggling still works when browser storage is blocked',()=>{
 assert.equal(setup('dark').root.dataset.theme,'dark');const state=setup(null,true);state.buttons[0].handlers.click();assert.equal(state.root.dataset.theme,'dark');
});
test('theme changes in another tab and cleared storage update the controls',()=>{
 const state=setup('dark');state.windowEvents.storage({key:'southview-theme',newValue:'light'});assert.equal(state.root.dataset.theme,'light');state.windowEvents.storage({key:'southview-theme',newValue:'dark'});state.windowEvents.storage({key:null,newValue:null});assert.equal(state.root.dataset.theme,'light');
});
