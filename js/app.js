// Whatsit Library app. Data comes from data/*.js via the Whatsit registry.
/* ================= storage (session only) ================= */
const store={get(k,d){try{const v=sessionStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}},set(k,v){try{sessionStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const PROJECT_LINE='Work inside my existing project and use the framework, styling approach and component library it already uses. If none is set up yet, pick a sensible default and tell me what you chose.';

/* ================= patterns ================= */
let uid=0;
const P = Whatsit.patterns;
const byId=Object.fromEntries(P.map(p=>[p.id,p]));

const FEATS = Whatsit.recipes;
const featById=Object.fromEntries(FEATS.map(f=>[f.id,f]));

/* ================= fonts ================= */
const FB={'Sans-serif':'system-ui, sans-serif','Serif':'Georgia, serif','Display':'system-ui, sans-serif','Monospace':'ui-monospace, monospace','Handwritten':'cursive'};
const FONTS = Whatsit.fonts;
const DISPLAY = Whatsit.displayFonts;
const fontBy=Object.fromEntries([...DISPLAY.map(f=>[f.name,{...f,cat:'Display'}]),...FONTS.map(f=>[f.name,f])]);
const isDisplay=n=>DISPLAY.some(f=>f.name===n);
const fstack=n=>{const f=fontBy[n];return `'${n}', ${f?FB[f.cat]:'sans-serif'}`;};
const GLOSS = Whatsit.fontGlossary;

/* ================= design system state ================= */
const ROLES=[
  ['primary','Primary','Main buttons and links. The color people click.'],
  ['accent','Accent','Highlights and “New” labels. Use sparingly.'],
  ['background','Background','The page behind everything.'],
  ['surface','Surface','Cards, panels and inputs that sit on the background.'],
  ['text','Text','The main reading color.'],
  ['muted','Muted text','Secondary text like captions and hints.'],
  ['success','Success','Done, saved, healthy.'],
  ['warning','Warning','Careful, needs attention soon.'],
  ['danger','Danger','Errors and delete buttons.'],
];
const PRESETS = Whatsit.palettes;
const RADII=[[0,'Sharp'],[8,'Soft'],[16,'Round'],[999,'Pill']];
const SHADOWS={flat:['Flat','none'],subtle:['Subtle','0 1px 3px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.06)'],lifted:['Lifted','0 12px 32px rgba(0,0,0,.18)']};
const DENS={compact:['Compact',.8],comfortable:['Comfortable',1],spacious:['Spacious',1.3]};
const SCALES=[[1.2,'Gentle'],[1.25,'Balanced'],[1.333,'Dramatic']];
const dsDefault={preset:'Lagoon',c:{...PRESETS.Lagoon},heading:'Bricolage Grotesque',body:'Atkinson Hyperlegible',base:16,scale:1.25,radius:8,shadow:'subtle',density:'comfortable'};
let ds=Object.assign({},dsDefault,store.get('whatsit-ds',{}));ds.c=Object.assign({},dsDefault.c,ds.c||{});

/* contrast */
function rgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255];}
function lum(h){return rgb(h).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);}
function ratio(a,b){const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const onColor=h=>ratio(h,'#FFFFFF')>=ratio(h,'#111111')?'#FFFFFF':'#111111';

/* ================= cart ================= */
let cart=store.get('whatsit-cart',[]);
const inCart=k=>cart.some(i=>i.k===k);
function putCart(item,msg){const i=cart.findIndex(x=>x.k===item.k);if(i>=0)cart[i]=item;else cart.push(item);store.set('whatsit-cart',cart);refreshCart();toast(msg);
  const f=document.getElementById('fab');f.classList.remove('bump');void f.offsetWidth;f.classList.add('bump');}
function dropCart(k,msg){cart=cart.filter(x=>x.k!==k);store.set('whatsit-cart',cart);refreshCart();if(msg)toast(msg);}
function itemLabel(it){
  if(it.type==='pattern')return[byId[it.id].name,'UI pattern'];
  if(it.type==='feat')return[featById[it.id].name,'Feature · '+featById[it.id].uses.map(u=>byId[u].name).join(' + ')];
  if(it.type==='font')return[ds[it.role],it.role==='heading'?'Headings font':'Body font'];
  if(it.type==='ds')return['Design system',`${ds.preset==='Custom'?'Custom':ds.preset} palette · ${ds.heading} / ${ds.body}`];
}

/* ================= prompt text ================= */
const defaultPicked=p=>p.opts.map(o=>!!o[2]);
function patternSpec(p,picked){
  const l=[`A ${p.name.toLowerCase()} (also called a ${p.aka[0].toLowerCase()}): ${p.say}`,'Include:'];
  p.opts.forEach((o,i)=>{if(picked[i])l.push('- '+o[1]);});
  l.push('- accessibility: '+p.a11y);
  return l.join('\n');
}
function patternPrompt(p,picked){
  return [`Build a ${p.name.toLowerCase()} component.`,'',PROJECT_LINE,'',patternSpec(p,picked),'','Make it one reusable component with sample content I can replace, and show an example of it in use.'].join('\n');
}
const featSpec=f=>[`${f.name}: ${f.say}`,'Use these UI patterns:',...f.spec.map(s=>'- '+s)].join('\n');
const featPrompt=f=>[`Build a ${f.name.toLowerCase()}.`,'',PROJECT_LINE,'',featSpec(f),'','Use realistic sample data. Keep each pattern as its own component so I can reuse it.'].join('\n');
const fontLine=role=>{const n=ds[role];return `- ${role==='heading'?'Headings':'Body text'}: “${n}” from Google Fonts (${fontBy[n]?fontBy[n].cat.toLowerCase():'font'}), fallback ${fontBy[n]?FB[fontBy[n].cat]:'sans-serif'}. Load weights 400 and 700.${isDisplay(n)?' It is a display font: use it only at 40px and larger (logo, hero, h1), and use a plain font for smaller headings.':''}`;};
function displayPrompt(f,brand){
  return [`Use the display font “${f.name}” for my brand “${brand}”.`,'',PROJECT_LINE,'',
    `- Load “${f.name}” from Google Fonts (free, SIL Open Font License), or self-host the .woff2 files. Fallback: ${FB.Display}.`,
    `- Look: ${f.style.toLowerCase()}. Mood: ${f.moods.join(', ').toLowerCase()}.`,
    '- Use it only for the logo/wordmark, the hero headline and h1, at 40px and larger. Never for body text, buttons or labels.',
    `- Pair it with “${f.body}” for body text and smaller headings.`,
    '- Tighten letter-spacing slightly on the hero headline if it looks loose, and check it on a 375px-wide phone screen.'].join('\n');
}
function wordmarkPrompt(brand){
  return [`Add my logo to the site header. The logo is an SVG file at /public/logo.svg showing the word “${brand}”.`,'',PROJECT_LINE,'',
    '- Make it the home link in the header, 32px tall on mobile and 40px on desktop',
    `- Alt text: “${brand}”`,
    '- Make it readable on light and dark backgrounds (use fill="currentColor" in the SVG if possible)',
    '- Also generate a favicon from it'].join('\n');
}
function fontPrompt(role){return ['Set up this font in my project.','',PROJECT_LINE,'',fontLine(role),'','Apply it everywhere '+(role==='heading'?'headings (h1–h4) appear.':'body text appears, including buttons and inputs.')].join('\n');}
function dsSpec(){
  const c=ds.c,L=['Colors:'];
  ROLES.forEach(([k,n,d])=>L.push(`- ${n} ${c[k].toUpperCase()}: ${d}`));
  L.push(`- Text on primary buttons: ${onColor(c.primary)}`);
  L.push('','Typography:',fontLine('heading'),fontLine('body'),`- Base size ${ds.base}px, type scale ${ds.scale} (each heading level is ${ds.scale}× the one below)`);
  L.push('','Shape and spacing:',`- Corner radius ${ds.radius===999?'fully rounded (pill) on buttons, 16px on cards':ds.radius+'px'}`,`- Shadows: ${SHADOWS[ds.shadow][0].toLowerCase()}${ds.shadow==='flat'?' (no shadows, use borders)':' ('+SHADOWS[ds.shadow][1]+')'}`,`- Density: ${DENS[ds.density][0].toLowerCase()} (spacing unit ${Math.round(8*DENS[ds.density][1])}px)`);
  return L.join('\n');
}
const dsPrompt=()=>['Set up this design system in my project.','',PROJECT_LINE,'Store these as design tokens (CSS variables, a theme file or the styling config, whichever the project uses) and apply them to every existing component.','',dsSpec(),'','Keep text contrast at WCAG AA or better.'].join('\n');
function dsCss(){
  const c=ds.c;return `:root {\n${ROLES.map(([k])=>`  --color-${k}: ${c[k]};`).join('\n')}\n  --color-on-primary: ${onColor(c.primary)};\n  --font-heading: ${fstack(ds.heading)};\n  --font-body: ${fstack(ds.body)};\n  --font-size-base: ${ds.base}px;\n  --type-scale: ${ds.scale};\n  --radius: ${ds.radius===999?'9999px':ds.radius+'px'};\n  --shadow: ${SHADOWS[ds.shadow][1]};\n  --space-unit: ${Math.round(8*DENS[ds.density][1])}px;\n}`;
}
function cartPrompt(){
  const has=t=>cart.filter(i=>i.type===t);
  const L=["I'm building an app and want everything below.",'',PROJECT_LINE];let n=0;
  if(has('ds').length){L.push('',`## ${++n}. Design system`,'Set this up first and store it as design tokens.','',dsSpec());}
  else if(has('font').length){L.push('',`## ${++n}. Fonts`,...has('font').map(i=>fontLine(i.role)));}
  const f=has('feat'),p=has('pattern');
  if(f.length||p.length){
    L.push('',`## ${++n}. Features to build`);
    f.forEach((it,i)=>L.push('',`### ${i+1}. ${featSpec(featById[it.id])}`));
    p.forEach((it,i)=>L.push('',`### ${f.length+i+1}. ${patternSpec(byId[it.id],it.picked)}`));
  }
  L.push('','Build these in the order listed, reusing components between features where they overlap. After each one, tell me how to test it.');
  return L.join('\n');
}

/* ================= small UI helpers ================= */
let tt;function toast(m){const t=document.getElementById('gtoast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),1900);}
function copyText(text,ta,note){
  const ok=()=>{if(note)note.textContent='Copied. Paste it into Cursor, Claude Code, Lovable or Bolt.';toast('Copied to clipboard');};
  const fail=()=>{if(ta){ta.focus();ta.select();}if(note)note.textContent='Text selected. Press Ctrl+C (⌘C on Mac) to copy.';};
  try{navigator.clipboard.writeText(text).then(ok,fail);}catch(e){fail();}
}
function outBox(id,getText,extra=[]){
  const w=document.createElement('div');
  w.innerHTML=`<div class="out"><textarea id="${id}" readonly aria-label="Generated prompt"></textarea></div><div class="acts-row"><button class="dbtn cp">Copy prompt</button></div><div class="note" aria-live="polite"></div>`;
  const ta=w.querySelector('textarea'),note=w.querySelector('.note'),row=w.querySelector('.acts-row');
  w.querySelector('.cp').onclick=()=>copyText(ta.value,ta,note);
  extra.forEach(b=>row.appendChild(b));
  const upd=()=>{ta.value=getText();};upd();
  return {el:w,ta,upd};
}
const BOOKMARK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>';
function saveBtn(key,onAdd,label='+ Save',icon=false){
  const b=document.createElement('button');b.className=icon?'bm':'save';b.dataset.key=key;
  if(icon)b.innerHTML=BOOKMARK;
  const sync=()=>{const on=inCart(key);b.setAttribute('aria-pressed',on);
    if(icon){const t=on?'Saved to cart (click to remove)':'Save to cart';b.setAttribute('aria-label',t);b.title=t;}
    else b.textContent=on?'✓ Saved':label;};
  b.onclick=e=>{e.stopPropagation();if(inCart(key))dropCart(key,'Removed from cart');else onAdd();sync();};
  b._sync=sync;sync();return b;
}
function syncSaveButtons(){document.querySelectorAll('.save[data-key]').forEach(b=>b._sync&&b._sync());}
function seg(opts,cur,onPick,label){
  const w=document.createElement('div');w.className='seg';w.setAttribute('role','radiogroup');if(label)w.setAttribute('aria-label',label);
  opts.forEach(([v,t])=>{const b=document.createElement('button');b.textContent=t;b.setAttribute('role','radio');const on=String(v)===String(cur);b.className=on?'on':'';b.setAttribute('aria-checked',on);
    b.onclick=()=>{w.querySelectorAll('button').forEach(x=>{x.className=x===b?'on':'';x.setAttribute('aria-checked',x===b);});onPick(v);};w.appendChild(b);});
  return w;
}
function pills(el,list,cur,onPick){el.innerHTML='';list.forEach(c=>{const b=document.createElement('button');b.textContent=c;b.setAttribute('aria-pressed',c===cur);b.onclick=()=>{el.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));onPick(c);};el.appendChild(b);});}

/* ================= search ================= */
const STOP=new Set('the a an and or of to it its is are that this with for on in when like thing things you your i my me some can be where which what one kind sort looks look little'.split(' '));
function score(p,q){
  const words=q.toLowerCase().replace(/[^a-z0-9\s-]/g,' ').split(/\s+/).filter(w=>w.length>1&&!STOP.has(w));
  if(!words.length)return 0;
  const names=(p.name+' '+p.aka.join(' ')).toLowerCase(),hay=(p.keys+' '+p.say).toLowerCase().split(/\s+/);
  let s=0;for(const w of words){const stem=w.replace(/(ing|es|s)$/,'');if(names.includes(w))s+=3;else if(hay.some(h=>h===w||(stem.length>2&&h.startsWith(stem))))s+=1;}
  return s/words.length;
}

/* ================= patterns view ================= */
const grid=document.getElementById('grid'),answer=document.getElementById('answer'),q=document.getElementById('q');
let cat='All';
const mountDemo=(p,host)=>{host.innerHTML=p.html(++uid);if(p.init)p.init(host);};
// Category order and one-line descriptions for the grouped library view.
const CATS=[['Forms','Ways people type, pick and choose.'],['Navigation','How people move around an app.'],['Overlays','Things that float above the page.'],
  ['Feedback','How the app talks back.'],['Layout','How content is arranged.'],['Data','Ways to show records, people and history.'],['Media','Pictures and motion.']]
  .filter(([c])=>P.some(p=>p.cat===c));
const catSlug=c=>'cat-'+c;
function patternCard(p,i){
  const c=document.createElement('article');c.className='card '+catSlug(p.cat);
  c.innerHTML=`<div class="demo"></div><button class="meta" aria-label="${esc(p.name)}: see its parts and get the prompt"><span class="top"><span class="k">${p.cat}</span><span class="no">№${String(i+1).padStart(2,'0')}</span></span><span class="nm">${p.name}<span class="arr" aria-hidden="true">→</span></span><span class="aka">also called ${p.aka.join(', ')}</span><p class="say">${p.say}</p></button>`;
  c.prepend(saveBtn('pattern:'+p.id,()=>putCart({k:'pattern:'+p.id,type:'pattern',id:p.id,picked:defaultPicked(p)},`Added ${p.name} to cart`),'+ Save',true));
  mountDemo(p,c.querySelector('.demo'));
  c.querySelector('.meta').onclick=e=>openPanel(p.id,e.currentTarget);
  return c;
}
function renderGrid(){
  const query=q.value.trim();
  let list=P.map((p,i)=>({p,i,s:query?score(p,query):1})).filter(x=>x.s>0&&(cat==='All'||x.p.cat===cat));
  if(query)list.sort((a,b)=>b.s-a.s);
  grid.innerHTML='';
  document.getElementById('pcount').textContent=query||cat!=='All'?`${list.length} of ${P.length}`:P.length;
  if(!list.length)grid.innerHTML=`<p class="empty">Nothing matched “${esc(query)}”. Describe what it does or where it appears, like “menu that slides in”.</p>`;
  if(!query&&cat==='All'){
    // Browsing everything: group by category so the library has structure, not one flat wall.
    CATS.forEach(([c,desc])=>{
      const items=list.filter(x=>x.p.cat===c);if(!items.length)return;
      const h=document.createElement('div');h.className='ghead '+catSlug(c);
      h.innerHTML=`<h3>${c}</h3><p>${desc}</p><span class="c">${items.length} patterns</span>`;
      grid.appendChild(h);
      items.forEach(({p,i})=>grid.appendChild(patternCard(p,i)));
    });
  } else list.forEach(({p,i})=>grid.appendChild(patternCard(p,i)));
  if(query&&list.length){
    const top=list[0].p;
    answer.innerHTML=`<span class="lead">That sounds like a</span><b>${top.name}</b><span class="aka">also called ${top.aka.slice(0,2).join(', ')}</span><button class="go">See its parts →</button>`;
    answer.querySelector('.go').onclick=e=>openPanel(top.id,e.currentTarget);
  } else if(query) answer.innerHTML='<span class="none">No match yet. Try describing where it appears or what it does.</span>';
  else answer.textContent='';
}
const catsEl=document.getElementById('cats');
function renderCats(){
  catsEl.innerHTML='';
  [['All',P.length],...CATS.map(([c])=>[c,P.filter(p=>p.cat===c).length])].forEach(([c,n])=>{
    const b=document.createElement('button');b.className=c==='All'?'':catSlug(c);b.setAttribute('aria-pressed',c===cat);
    b.innerHTML=`${c==='All'?'':'<span class="dot"></span>'}${c==='All'?'All patterns':c}<span class="c">${n}</span>`;
    b.onclick=()=>{cat=c;renderCats();renderGrid();};
    catsEl.appendChild(b);
  });
}
renderCats();
['pictures that slide sideways','box pops up and the page goes dark','boxes for a verification code','little red number on the bell']
 .forEach(t=>{const b=document.createElement('button');b.className='try';b.textContent=t;b.onclick=()=>{q.value=t;switchView('patterns');renderGrid();};document.getElementById('tries').appendChild(b);});
q.addEventListener('input',()=>{switchView('patterns');renderGrid();});

/* ================= home: hero examples + mixed-up pairs ================= */
const SHOW=[['pictures that slide sideways','carousel'],['the box that pops up and darkens the page','modal'],['little message that disappears by itself','toast'],
  ['boxes for a verification code','otp'],['click a question to show the answer','accordion'],['numbers at the bottom to change page','pagination']].filter(([,id])=>byId[id]);
let showI=0,showTimer=null;
const reduceMotion=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function paintShow(i,animate=true){
  showI=(i+SHOW.length)%SHOW.length;
  const [say,id]=SHOW[showI],sw=document.getElementById('hsSwap');
  const apply=()=>{document.getElementById('hsSay').textContent=say;document.getElementById('hsName').textContent=byId[id].name;
    mountDemo(byId[id],document.getElementById('hsDemo'));sw.classList.remove('out');
    document.querySelectorAll('#hsDots button').forEach((d,k)=>d.classList.toggle('on',k===showI));};
  if(animate&&!reduceMotion){sw.classList.add('out');setTimeout(apply,260);}else apply();
}
function startShow(){stopShow();if(!reduceMotion)showTimer=setInterval(()=>paintShow(showI+1),4200);}
function stopShow(){clearInterval(showTimer);showTimer=null;}
const dotsEl=document.getElementById('hsDots');
SHOW.forEach(([say],k)=>{const d=document.createElement('button');d.setAttribute('aria-label',`Example ${k+1}: ${say}`);d.onclick=()=>{paintShow(k);startShow();};dotsEl.appendChild(d);});
const heroShow=document.getElementById('heroShow');
heroShow.addEventListener('mouseenter',stopShow);heroShow.addEventListener('mouseleave',startShow);
heroShow.addEventListener('focusin',stopShow);heroShow.addEventListener('focusout',startShow);
document.getElementById('hsTry').onclick=()=>{q.value=SHOW[showI][0];renderGrid();q.focus();};
paintShow(0,false);startShow();

const MIX=[['tooltip','popover'],['toast','alert'],['tabs','segmented'],['carousel','range']].filter(([a,b])=>byId[a]&&byId[b]);
const mixEl=document.getElementById('mix');
MIX.forEach(([a,b])=>{
  const why=(byId[a].confuse.find(([c])=>c===b)||byId[b].confuse.find(([c])=>c===a)||[,''])[1];
  const c=document.createElement('button');c.className='mixc';
  c.innerHTML=`<span class="vs">${byId[a].name}<i>vs</i>${byId[b].name}</span><p>${why}</p><span class="more">Compare →</span>`;
  c.onclick=e=>openPanel(a,e.currentTarget);mixEl.appendChild(c);
});

/* ================= sheets ================= */
const panel=document.getElementById('panel'),sheet=document.getElementById('sheet'),cartWrap=document.getElementById('cartWrap'),cartSheet=document.getElementById('cartSheet');
let lastFocus=null;
function showSheet(wrap,from){if(from)lastFocus=from;wrap.hidden=false;document.body.style.overflow='hidden';const s=wrap.querySelector('.sheet');s.scrollTop=0;s.querySelector('.x').focus();}
function hideSheets(){panel.hidden=true;cartWrap.hidden=true;document.body.style.overflow='';if(lastFocus&&document.contains(lastFocus))lastFocus.focus();}
[panel,cartWrap].forEach(w=>w.addEventListener('click',e=>{if(e.target.closest('[data-close]'))hideSheets();}));
document.addEventListener('keydown',e=>{
  const open=!panel.hidden?sheet:!cartWrap.hidden?cartSheet:null;if(!open)return;
  if(e.key==='Escape')hideSheets();
  if(e.key==='Tab'){const f=[...open.querySelectorAll('button,input,textarea,select,a[href],summary')].filter(x=>x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}}
});

function openPanel(id,from){
  const p=byId[id];if(!p)return;
  const existing=cart.find(i=>i.k==='pattern:'+id);
  const picked=existing?existing.picked.slice():defaultPicked(p);
  cartWrap.hidden=true;
  sheet.innerHTML=`
    <div class="s-top"><div><div class="eyebrow">${p.cat}</div><h2 id="p-title"><span>${p.name}</span></h2><div class="aka">also called ${p.aka.join(', ')}</div></div><button class="x" data-close aria-label="Close">×</button></div>
    <div class="demo"></div>
    <section><h3>In plain words</h3><p>${p.say}</p></section>
    <div class="two"><section><h3>Use it when</h3><p>${p.use}</p></section><section><h3>Skip it when</h3><p>${p.avoid}</p></section></div>
    <section><h3>Name the parts</h3><dl class="parts">${p.parts.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl></section>
    ${p.confuse.length?`<section><h3>Don't mix it up with</h3><div class="conf">${p.confuse.map(([cid,why])=>`<button data-go="${cid}"><b>${byId[cid].name}</b> · ${why}</button>`).join('')}</div></section>`:''}
    <section><h3>What should it do?</h3><div class="opts">${p.opts.map((o,i)=>`<label><input type="checkbox" id="opt-${p.id}-${i}" ${picked[i]?'checked':''}> ${o[0]}</label>`).join('')}</div></section>
    <section><h3>Your prompt</h3><div class="pbo"></div></section>`;
  mountDemo(p,sheet.querySelector('.demo'));
  const addBtn=document.createElement('button');addBtn.className='save';
  const syncAdd=()=>{const on=inCart('pattern:'+id);addBtn.setAttribute('aria-pressed',on);addBtn.textContent=on?'Update cart':'+ Save to cart';};
  addBtn.onclick=()=>{const was=inCart('pattern:'+id);putCart({k:'pattern:'+id,type:'pattern',id,picked:picked.slice()},was?`Updated ${p.name} in cart`:`Added ${p.name} to cart`);syncAdd();};
  syncAdd();
  const out=outBox('prompt-'+id,()=>patternPrompt(p,picked),[addBtn]);
  sheet.querySelector('.pbo').appendChild(out.el);
  sheet.querySelectorAll('.opts input').forEach((c,i)=>c.onchange=()=>{picked[i]=c.checked;out.upd();});
  sheet.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>openPanel(b.dataset.go));
  showSheet(panel,from);
}

function renderCartSheet(){
  const groups=[['ds','Design system'],['font','Fonts'],['feat','Feature recipes'],['pattern','UI patterns']];
  cartSheet.innerHTML=`<div class="s-top"><div><div class="eyebrow">This session</div><h2 id="c-title"><span>Your cart</span></h2><div class="aka">${cart.length} item${cart.length===1?'':'s'} saved</div></div><button class="x" data-close aria-label="Close">×</button></div><div class="citems"></div>`;
  const box=cartSheet.querySelector('.citems');
  if(!cart.length){box.innerHTML='<p class="cempty">Nothing saved yet. Press “+ Save” on any pattern, recipe or font, or save your design system.</p>';return;}
  groups.forEach(([t,title])=>{
    const items=cart.filter(i=>i.type===t);if(!items.length)return;
    const g=document.createElement('div');g.className='cgroup';g.innerHTML=`<h3>${title}</h3>`;
    items.forEach(it=>{const[n,s]=itemLabel(it);const r=document.createElement('div');r.className='citem';r.innerHTML=`<div><b>${esc(n)}</b><small>${esc(s)}</small></div><button aria-label="Remove ${esc(n)}">Remove</button>`;
      r.querySelector('button').onclick=()=>{dropCart(it.k);renderCartSheet();syncSaveButtons();};
      if(it.type==='pattern'){r.querySelector('b').style.cursor='pointer';r.querySelector('b').onclick=()=>openPanel(it.id);}
      g.appendChild(r);});
    box.appendChild(g);
  });
  const clr=document.createElement('button');clr.className='save';clr.textContent='Empty cart';
  clr.onclick=()=>{cart=[];store.set('whatsit-cart',cart);refreshCart();renderCartSheet();toast('Cart emptied');};
  const sec=document.createElement('section');sec.innerHTML='<h3>One prompt for everything</h3>';
  sec.appendChild(outBox('cart-prompt',cartPrompt,[clr]).el);
  sec.querySelector('textarea').style.minHeight='320px';
  cartSheet.appendChild(sec);
}
function refreshCart(){document.getElementById('fabN').textContent=cart.length;if(!cartWrap.hidden)renderCartSheet();syncSaveButtons();}
document.getElementById('fab').onclick=e=>{panel.hidden=true;renderCartSheet();showSheet(cartWrap,e.currentTarget);};

/* ================= features view ================= */
function renderFeats(){
  const list=document.getElementById('featList');list.innerHTML='';
  FEATS.forEach(f=>{
    const c=document.createElement('article');c.className='feat';
    c.innerHTML=`<div class="row"><h3>${f.name}</h3></div><p>${f.say}</p><div class="eq">${f.uses.map(u=>`<button data-go="${u}">${byId[u].name}</button>`).join('<span>+</span>')}</div>`;
    c.querySelector('.row').appendChild(saveBtn('feat:'+f.id,()=>putCart({k:'feat:'+f.id,type:'feat',id:f.id},`Added ${f.name} to cart`)));
    c.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>openPanel(b.dataset.go,b));
    c.appendChild(outBox('feat-'+f.id,()=>featPrompt(f)).el);
    list.appendChild(c);
  });
}

/* ================= fonts view ================= */
let fcat='All';
document.getElementById('gloss').innerHTML=GLOSS.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
function renderFonts(){
  const list=document.getElementById('fontList'),txt=document.getElementById('ftext').value||'Build something people love';list.innerHTML='';
  FONTS.filter(f=>fcat==='All'||f.cat===fcat).forEach(f=>{
    const c=document.createElement('article');c.className='font';
    c.innerHTML=`<div class="spec" style="font-family:${fstack(f.name).replace(/"/g,'')}">${esc(txt)}</div>
      <div class="row"><b>${f.name}</b><span class="cat">${f.cat}</span></div>
      <dl><dt>Feels</dt><dd>${f.mood}</dd><dt>Good for</dt><dd>${f.use}</dd><dt>Pairs with</dt><dd>${f.pairs.join(', ')}</dd></dl>
      <div class="acts-row"></div>`;
    const row=c.querySelector('.acts-row');
    [['heading','Use for headings'],['body','Use for body']].forEach(([role,label])=>{
      const b=document.createElement('button');b.className='save';const on=ds[role]===f.name&&inCart('font:'+role);
      b.setAttribute('aria-pressed',on);b.textContent=on?'✓ '+(role==='heading'?'Headings':'Body'):label;
      b.onclick=()=>{ds[role]=f.name;saveDs();putCart({k:'font:'+role,type:'font',role},`${f.name} set for ${role==='heading'?'headings':'body text'}`);renderFonts();};
      row.appendChild(b);
    });
    list.appendChild(c);
  });
}
let dmood='All',fsubView='text';
document.getElementById('fsub').appendChild(seg([['text','Everyday fonts'],['display','Display fonts']],fsubView,v=>{fsubView=v;document.getElementById('fonts-text').hidden=v!=='text';document.getElementById('fonts-display').hidden=v!=='display';if(v==='display')renderDisplay();else renderFonts();},'Font type'));
const moodCount={};DISPLAY.forEach(f=>f.moods.forEach(m=>moodCount[m]=(moodCount[m]||0)+1));
pills(document.getElementById('dmoods'),['All',...Object.keys(moodCount).sort((a,b)=>moodCount[b]-moodCount[a]||a.localeCompare(b))],dmood,m=>{dmood=m;renderDisplay();});
function renderDisplay(){
  const list=document.getElementById('displayList'),brand=(document.getElementById('dtext').value.trim()||'Aurora');list.innerHTML='';
  DISPLAY.filter(f=>dmood==='All'||f.moods.includes(dmood)).forEach(f=>{
    const c=document.createElement('article');c.className='dcard';
    c.innerHTML=`<div class="reel" style="--len:${Math.max(brand.length,4)};--wf:${f.wf}"><div class="w" style="font-family:${fstack(f.name)};font-weight:${f.weight||400}">${esc(brand)}</div><div class="moods">${f.moods.map(m=>`<span>${m}</span>`).join('')}</div></div>
      <div class="dmeta"><div class="row"><b>${f.name}</b><span class="src">Free · Google</span></div><p>${f.style}. Similar to the paid “${f.like}” font. Pairs with ${f.body}.</p><div class="acts-row"></div></div>`;
    const row=c.querySelector('.acts-row');
    const on=ds.heading===f.name&&inCart('font:heading');
    const use=document.createElement('button');use.className='save';use.setAttribute('aria-pressed',on);use.textContent=on?'✓ Your heading font':'Use for headings';
    use.onclick=()=>{ds.heading=f.name;saveDs();putCart({k:'font:heading',type:'font',role:'heading'},`${f.name} set for headings`);renderDisplay();};
    const cp=document.createElement('button');cp.className='save';cp.textContent='Copy prompt';cp.onclick=()=>copyText(displayPrompt(f,brand));
    row.append(use,cp);list.appendChild(c);
  });
  const wm=document.createElement('article');wm.className='wm';
  wm.innerHTML=`<span class="eyebrow">Only need a logo?</span><h3>The wordmark route</h3><p>A paid font's cheaper desktop license usually covers a logo saved as an image. No webfont license needed.</p>
    <ol><li>Pick a free font here, or buy the desktop license for a paid one.</li><li>Type “${esc(brand)}” in Figma or Canva, convert the text to outlines, and export it as SVG.</li><li>Put the file in your project as <code>/public/logo.svg</code> and copy the prompt below.</li></ol><div class="acts-row"></div>`;
  const b=document.createElement('button');b.className='dbtn';b.textContent='Copy logo prompt';b.onclick=()=>copyText(wordmarkPrompt(brand));
  wm.querySelector('.acts-row').appendChild(b);list.appendChild(wm);
}
document.getElementById('dtext').addEventListener('input',()=>renderDisplay());
document.getElementById('ftext').addEventListener('input',()=>renderFonts());
document.getElementById('fsize').addEventListener('input',e=>document.getElementById('fontList').style.setProperty('--fsz',e.target.value+'px'));
pills(document.getElementById('fcats'),['All',...new Set(FONTS.map(f=>f.cat))],fcat,c=>{fcat=c;renderFonts();});

/* ================= design system view ================= */
function saveDs(){store.set('whatsit-ds',ds);}
let dsOut;
function applyPreview(){
  const c=ds.c,pv=document.getElementById('pv'),s=pv.style,m=DENS[ds.density][1];
  const set=(k,v)=>s.setProperty(k,v);
  set('--pp',c.primary);set('--ppt',onColor(c.primary));set('--pa',c.accent);set('--pat',onColor(c.accent));set('--pbg',c.background);set('--ps',c.surface);
  set('--pt',c.text);set('--pm',c.muted);set('--pok',c.success);set('--pwarn',c.warning);set('--pbad',c.danger);
  set('--pfh',fstack(ds.heading));set('--pfb',fstack(ds.body));set('--pfs',ds.base+'px');
  set('--ph1',Math.round(ds.base*Math.pow(ds.scale,3))+'px');set('--ph2',Math.round(ds.base*Math.pow(ds.scale,1.5))+'px');
  set('--pr',ds.radius+'px');set('--pcr',Math.min(ds.radius,20)+'px');set('--psh',SHADOWS[ds.shadow][1]);set('--pd',m);
  const chk=[['Text on background',c.text,c.background,4.5],['Text on cards',c.text,c.surface,4.5],['Muted on background',c.muted,c.background,4.5],['Button label',onColor(c.primary),c.primary,4.5]];
  document.getElementById('checks').innerHTML=chk.map(([n,a,b,min])=>{const r=ratio(a,b);const cls=r>=min?'pass':r>=3?'mid':'low';const w=r>=min?'Readable':r>=3?'Large text only':'Too faint';return `<div class="chk"><span>${n}</span><span class="${cls}"><b>${r.toFixed(1)}:1</b> ${w}</span></div>`;}).join('');
  if(dsOut)dsOut.upd();
}
function renderDs(){
  const ctl=document.getElementById('dsCtl');ctl.innerHTML='';
  const sec=(t,el)=>{const s=document.createElement('section');s.innerHTML=`<h3>${t}</h3>`;s.appendChild(el);ctl.appendChild(s);return s;};
  // presets
  const pr=document.createElement('div');pr.className='presets';
  Object.entries(PRESETS).forEach(([n,c])=>{const b=document.createElement('button');b.className='preset';b.setAttribute('aria-pressed',ds.preset===n);
    b.innerHTML=`<span class="sw">${['background','surface','primary','accent','text'].map(k=>`<i style="background:${c[k]}"></i>`).join('')}</span>${n}`;
    b.onclick=()=>{ds.preset=n;ds.c={...c};saveDs();renderDs();};pr.appendChild(b);});
  sec('Start from a palette',pr);
  // colors
  const cl=document.createElement('div');cl.className='colors';
  ROLES.forEach(([k,n,d])=>{const r=document.createElement('div');r.className='crow';
    r.innerHTML=`<input type="color" id="c-${k}" value="${ds.c[k]}" aria-label="${n} color"><div><b>${n}</b><small>${d}</small></div><code>${ds.c[k].toUpperCase()}</code>`;
    const inp=r.querySelector('input'),code=r.querySelector('code');
    inp.oninput=()=>{ds.c[k]=inp.value;ds.preset='Custom';code.textContent=inp.value.toUpperCase();ctl.querySelectorAll('.preset').forEach(p=>p.setAttribute('aria-pressed',false));saveDs();applyPreview();};
    cl.appendChild(r);});
  sec('Colors',cl);
  // type
  const ty=document.createElement('div');ty.className='frow';
  const opt=f=>`<option ${f.name===ds.heading?'selected':''}>${f.name}</option>`;
  const sel=(role)=>role==='heading'
    ?`<select id="f-heading"><optgroup label="Everyday fonts">${FONTS.map(opt).join('')}</optgroup><optgroup label="Display fonts (40px and up)">${DISPLAY.filter(d=>!FONTS.some(f=>f.name===d.name)).map(opt).join('')}</optgroup></select>`
    :`<select id="f-body">${FONTS.map(f=>`<option ${f.name===ds.body?'selected':''}>${f.name}</option>`).join('')}</select>`;
  ty.innerHTML=`<span class="lbl">Headings</span>${sel('heading')}<span class="lbl">Body</span>${sel('body')}<span class="lbl">Base size</span><span class="b"></span><span class="lbl">Scale</span><span class="s"></span>`;
  ['heading','body'].forEach(role=>ty.querySelector('#f-'+role).onchange=e=>{ds[role]=e.target.value;saveDs();applyPreview();refreshCart();});
  ty.querySelector('.b').appendChild(seg([[14,'14px'],[16,'16px'],[18,'18px']],ds.base,v=>{ds.base=+v;saveDs();applyPreview();},'Base size'));
  ty.querySelector('.s').appendChild(seg(SCALES.map(([v,t])=>[v,t]),ds.scale,v=>{ds.scale=+v;saveDs();applyPreview();},'Type scale'));
  sec('Typography',ty).insertAdjacentHTML('beforeend','<p class="aka" style="margin:8px 0 0">Browse and compare these in the Fonts tab.</p>');
  // shape
  const sh=document.createElement('div');sh.className='frow';
  sh.innerHTML='<span class="lbl">Corners</span><span class="r"></span><span class="lbl">Shadows</span><span class="h"></span><span class="lbl">Spacing</span><span class="d"></span>';
  sh.querySelector('.r').appendChild(seg(RADII,ds.radius,v=>{ds.radius=+v;saveDs();applyPreview();},'Corner radius'));
  sh.querySelector('.h').appendChild(seg(Object.entries(SHADOWS).map(([k,v])=>[k,v[0]]),ds.shadow,v=>{ds.shadow=v;saveDs();applyPreview();},'Shadows'));
  sh.querySelector('.d').appendChild(seg(Object.entries(DENS).map(([k,v])=>[k,v[0]]),ds.density,v=>{ds.density=v;saveDs();applyPreview();},'Spacing'));
  sec('Shape and spacing',sh);

  const host=document.getElementById('dsOut');host.innerHTML='';
  const css=document.createElement('button');css.className='save';css.textContent='Copy as CSS variables';css.onclick=()=>copyText(dsCss());
  const sv=saveBtn('ds',()=>putCart({k:'ds',type:'ds'},'Design system added to cart'),'+ Save to cart');
  dsOut=outBox('ds-prompt',dsPrompt,[css,sv]);host.appendChild(dsOut.el);
  applyPreview();
}

/* ================= view switch ================= */
const VIEWS=['patterns','features','fonts','design'];
function switchView(v){
  document.querySelectorAll('.views [role=tab]').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));
  const was=document.getElementById('view-'+v).hidden;
  VIEWS.forEach(x=>document.getElementById('view-'+x).hidden=x!==v);
  document.getElementById('home').hidden=v!=='patterns';
  if(v==='patterns')startShow();else stopShow();
  if(v==='features')renderFeats();if(v==='fonts')renderFonts();if(v==='design')renderDs();
  if(was&&v!=='patterns')window.scrollTo({top:0});
}
document.querySelectorAll('.views [role=tab]').forEach(b=>b.onclick=()=>switchView(b.dataset.v));
document.querySelector('[data-home]').onclick=e=>{e.preventDefault();switchView('patterns');window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});};

renderGrid();refreshCart();
const h=location.hash.slice(1);if(byId[h])openPanel(h);else if(VIEWS.includes(h))switchView(h);
