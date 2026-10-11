// Dependency-free regression tests of the actual inline runtime, with a simulated DOM.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
function harness(saved){let storage=saved?{'cedric-lucky-lands-v1':JSON.stringify(saved)}:{},els={},clock=0,events={},frame;
const noop=()=>{},gradient={addColorStop:noop};const context=new Proxy({createLinearGradient:()=>gradient,createRadialGradient:()=>gradient},{get:(o,k)=>o[k]||noop});
function el(id){return els[id]??={style:{},textContent:'',innerHTML:'',open:false,classList:{add:noop,remove:noop},addEventListener:noop,getContext:()=>context,showModal(){this.open=true},close(){this.open=false}}}
const sandbox={console,Math,Map,JSON,Number,Array,innerWidth:1440,innerHeight:1000,devicePixelRatio:1,document:{getElementById:el,documentElement:{},querySelectorAll:()=>[],addEventListener:(e,fn)=>events[e]=fn},window:{},localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v},requestAnimationFrame:f=>frame=f,addEventListener:noop,setTimeout:noop,clearTimeout:noop,performance:{now:()=>clock}};
vm.createContext(sandbox);vm.runInContext(script.replace(/\}\)\(\);\s*$/,`globalThis.test={state:()=>state,actor:()=>actor,tiles:()=>tiles,blocks:()=>blocks,mini:()=>mini,spec,cost,wage,findPath,go,hit,build,hud,frame,project,center,job,shop,persist,close,startJob,gameAction,tickMini,finishJob,craftRank,glassify,refractGlass,setTravel:()=>travel=true,travel:()=>travel};})();`),sandbox);
return {g:sandbox.test,el,sandbox,storage,events,time(v){clock=v},advance(v){clock+=v},now:()=>clock,click(dataset){el('modal').onclick({target:{closest:()=>({dataset,textContent:''})}})}}
}
const h=harness(),g=h.g,s=g.state();g.close();assert.equal(s.coins,0);assert.equal(g.tiles().size,16);
const block=()=>[...g.blocks().values()].find(b=>b.type==='block');g.hit('2,2');assert.equal(s.stage,0,'tool gate');
function start(type,d=2){s.jobDifficulty=d;g.job({type,n:0});g.startJob();return g.mini()}
function act(action,value){h.advance(200);g.gameAction(action,String(value))}
// Smith: cannot skip heat, five changing targets, then cooling; exactly one payout.
let m=start('smith');act('forge');assert.equal(m.phase,'heat');for(let i=0;i<3;i++)act('pump');act('forge');assert.equal(m.phase,'forge');assert.equal(m.hits,5);
while(m.phase==='forge'){h.time(m.phaseStart+m.speed*(m.target+m.width/2));g.gameAction('strike')}
assert.equal(m.phase,'quench');h.time(m.phaseStart+3600);g.gameAction('quench');assert.equal(s.coins,36);assert.equal(s.records.smith,100);assert.equal(s.mastery.smith,1);g.finishJob();assert.equal(s.coins,36,'no double payout');
h.click({buy:'0'});assert.equal(s.coins,6);assert.equal(s.tools[0],1);h.click({buy:'1'});assert.equal(s.coins,6,'cannot overspend');
let b=block();for(let i=0;i<3;i++)g.hit(`${b.x},${b.y}`);assert.equal(s.stage,1);assert.equal(s.coins,16);
// All other crafts: input locked during reveal, perfect rounds and deliberate mistakes.
for(let type of ['bakery','garden','post'])for(let d of [1,2,3]){m=start(type,d);let before=s.coins;if(m.phase==='reveal'){act(type==='bakery'?'ingredient':'plant',0);assert.equal(m.score,0);h.time(m.deadline+1);g.tickMini(h.now(),.016);assert.equal(m.phase,'recall')}
if(type==='bakery'){let seq=[...m.sequence];for(let v of seq)act('ingredient',v)}
if(type==='garden'){let pattern=[...m.pattern];act('plant',pattern[0]);let count=m.selected.length;act('plant',pattern[0]);assert.equal(m.selected.length,count);for(let v of pattern.slice(1))act('plant',v)}
if(type==='post'){while(g.mini()){let p=m.parcels[m.index],r=m.routes.findIndex(r=>r.c===p.c&&r.s===p.s);act('route',r)}}
assert.equal(s.coins-before,Math.round(g.wage(0)*(2+d*.5)),`${type} difficulty ${d} payout`);assert.equal(s.records[type],100);g.finishJob();assert.equal(s.coins-before,Math.round(g.wage(0)*(2+d*.5)))}
assert.equal(g.craftRank('bakery'),2,'progression persists');
m=start('bakery',3);h.time(m.deadline+1);g.tickMini(h.now(),.016);let before=s.coins;for(let v of [...m.sequence])act('ingredient',(v+1)%6);assert.equal(s.coins-before,12,'completed weak round still pays base');assert.equal(s.mastery.bakery,3,'no XP below 50%');
m=start('post');before=s.coins;h.time(m.deadline+1);g.tickMini(h.now(),.016);assert.equal(s.coins-before,12,'timeout settles once');g.tickMini(h.now()+1000,.016);assert.equal(s.coins-before,12);
m=start('garden');before=s.coins;g.close();assert.equal(s.coins,before,'abandon has no payout');assert.equal(g.mini(),null);
// Pause memory and timing windows while the page is hidden.
m=start('bakery');let deadline=m.deadline;h.sandbox.document.hidden=true;h.events.visibilitychange();h.advance(50000);h.sandbox.document.hidden=false;h.events.visibilitychange();assert.equal(m.deadline,deadline+50000);g.close();
// 60 districts: every lucky block and workplace remains reachable.
for(let n=1;n<60;n++){let b=block(),spec=g.spec(n);assert([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>g.findPath(b.x+dx,b.y+dy)));g.hit(`${b.x},${b.y}`);assert.equal(s.stage,n);s.tools[spec.type]=spec.tier;for(let i=0;i<spec.hp;i++)g.hit(`${b.x},${b.y}`);assert.equal(s.stage,n+1)}
for(const b of g.blocks().values())assert([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>g.findPath(b.x+dx,b.y+dy)),`${b.type} reachable`);
g.setTravel();g.go(999,999);assert.equal(g.travel(),true);g.go(4,1);assert.equal(g.actor().x,4);assert.equal(g.actor().y,1);assert.equal(g.travel(),false);
s.lang='en';g.hud();assert(h.el('toolbar').innerHTML.includes('Workshops'));g.persist();let saved=JSON.parse(h.storage['cedric-lucky-lands-v1']);assert.equal(saved.stage,60);let resumed=harness(saved);assert.equal(resumed.g.state().records.bakery,100);assert.equal(resumed.g.state().mastery.bakery,3);
const old={version:1,coins:67,stage:2,tools:[1,1,0],player:{x:0,y:0},lang:'nl',sound:false,seen:true};const migrated=harness(old).g.state();assert.equal(migrated.coins,67);assert.equal(migrated.stage,2);assert.equal(migrated.jobDifficulty,2);assert.deepEqual(Object.keys(migrated.mastery),[]);
g.frame(1000);assert(!html.includes("case'work':"),'old one-click job removed');console.log('PASS: four minigames, three difficulties, timing, memory, partial rewards, timeout, duplicate input/payout, XP, pause, V1 save migration, 60 expansions, reachability, translation and render loop.');
// The glass compositor samples finite source rectangles, even at viewport edges.
let samples=0;const lensContext={clearRect(){},drawImage(source,sx,sy,sw,sh,dx,dy,dw,dh){assert([sx,sy,sw,sh,dx,dy,dw,dh].every(Number.isFinite));assert(sx>=0&&sy>=0&&sw>0&&sh>0);assert(sx+sw<=1440.001&&sy+sh<=1000.001);samples++},createLinearGradient:()=>({addColorStop(){}}),fillRect(){}};
const panels=[{left:-8,top:15,width:260,height:160},{left:1260,top:900,width:200,height:140},{left:460,top:220,width:510,height:550}].map(rect=>({querySelector(){return this.lens},prepend(l){this.lens=l},getBoundingClientRect:()=>rect}));
h.sandbox.document.querySelectorAll=()=>panels;h.sandbox.document.createElement=()=>({setAttribute(){},getContext:()=>lensContext});g.glassify();g.refractGlass();assert(samples>100);console.log('PASS: refraction sampling and viewport-edge clipping.');
