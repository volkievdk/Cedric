// Dependency-free regression tests for the actual inline game code.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
let storage={},els={},clock=0,frame;
const noop=()=>{},gradient={addColorStop:noop};
const context=new Proxy({createLinearGradient:()=>gradient,createRadialGradient:()=>gradient},{get:(o,k)=>o[k]||noop});
function el(id){return els[id]??=( {style:{},textContent:'',innerHTML:'',open:false,classList:{add:noop,remove:noop},addEventListener:noop,getContext:()=>context,showModal(){this.open=true},close(){this.open=false}})}
const sandbox={console,Math,Map,JSON,Number,Array,innerWidth:1440,innerHeight:1000,devicePixelRatio:1,document:{getElementById:el,documentElement:{},addEventListener:noop},window:{},localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v},requestAnimationFrame:f=>frame=f,addEventListener:noop,setTimeout:noop,clearTimeout:noop,performance:{now:()=>clock}};
vm.createContext(sandbox);
vm.runInContext(script.replace(/\}\)\(\);\s*$/,`globalThis.test={state:()=>state,actor:()=>actor,tiles:()=>tiles,blocks:()=>blocks,spec,cost,wage,findPath,go,hit,build,hud,frame,project,center,job,shop,persist,close,setTravel:()=>travel=true,travel:()=>travel};})();`),sandbox);
const g=sandbox.test,s=g.state();g.close();assert.equal(s.coins,0);assert.equal(g.tiles().size,16);
const block=()=>[...g.blocks().values()].find(b=>b.type==='block');
g.hit('2,2');assert.equal(s.stage,0,'tools gate blocks');
g.job([...g.blocks().values()].find(b=>b.type==='smith'));
function click(dataset){el('modal').onclick({target:{closest:()=>({dataset,textContent:''})}})}
for(let i=0;i<3;i++){clock=i*2000;click({action:'work'});clock+=50;click({action:'work'})}assert.equal(s.coins,36);
click({buy:'0'});assert.equal(s.coins,6);assert.equal(s.tools[0],1);click({buy:'1'});assert.equal(s.coins,6,'cannot overspend');
let b=block();for(let i=0;i<3;i++)g.hit(`${b.x},${b.y}`);assert.equal(s.stage,1);assert.equal(g.tiles().size,32);assert.equal(s.coins,16);
// Continue through 60 districts: all objects remain reachable and tools gate each tier.
for(let n=1;n<60;n++){let b=block(),spec=g.spec(n);let routes=[[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>g.findPath(b.x+dx,b.y+dy));assert(routes.some(Boolean),`block ${n} reachable`);g.hit(`${b.x},${b.y}`);assert.equal(s.stage,n);s.tools[spec.type]=spec.tier;for(let i=0;i<spec.hp;i++)g.hit(`${b.x},${b.y}`);assert.equal(s.stage,n+1)}
for(const b of g.blocks().values()){assert([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>g.findPath(b.x+dx,b.y+dy)),`${b.type} reachable`)}
g.setTravel();g.go(999,999);assert.equal(g.travel(),true,'locked teleport rejected');g.go(4,1);assert.equal(g.actor().x,4);assert.equal(g.actor().y,1);assert.equal(g.travel(),false);
s.lang='en';g.hud();assert(el('toolbar').innerHTML.includes('Jobs'));g.persist();assert.equal(JSON.parse(storage['cedric-lucky-lands-v1']).stage,60);g.frame(1000);console.log('PASS: wages, purchase, insufficient funds, tool gates, 60 expansions, all destinations reachable, teleport, translation, save and render loop.');
// Optional actual Canvas rendering for visual inspection, without adding a game dependency.
if(process.env.RENDER_GAME){const {createCanvas}=require('@napi-rs/canvas');const c=createCanvas(1440,1000);let real=c.getContext('2d');els={};sandbox.document.getElementById=id=>{let e=el(id);if(id==='world')e.getContext=()=>real;return e};storage={};vm.runInContext(script,sandbox);frame(1000);fs.writeFileSync(process.env.RENDER_GAME,c.toBuffer('image/png'));}
