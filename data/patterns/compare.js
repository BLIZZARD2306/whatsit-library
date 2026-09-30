Whatsit.addPattern({id:'compare',name:'Before/after slider',aka:['Image comparison','Compare slider','Reveal slider'],cat:'Media',
  say:'Two images stacked, with a handle you drag to reveal one over the other.',
  keys:'before after compare comparison slider drag handle reveal two images photo edit difference wipe',
  use:'Showing a change: photo edits, redesigns, renovations, cleanups.',
  avoid:'Images that don’t line up exactly. The effect falls apart.',
  confuse:[['range','A range slider picks a number. A before/after slider reveals one image over another.'],['carousel','A carousel shows images one after another. A compare slider layers two on top of each other.']],
  parts:[['Before layer','The image underneath'],['After layer','The image on top, cut off at the handle'],['Handle','The bar you drag'],['Labels','“Before” and “After” tags']],
  opts:[['Before / After labels','small “Before” and “After” labels in the corners',1],['Keyboard control','moving the handle with the arrow keys',1],['Follow the pointer','the handle following the pointer on hover',0]],
  a11y:'the handle as role="slider" with aria-valuenow, movable with the arrow keys',
  html:()=>`<div class="cmp" role="slider" tabindex="0" aria-label="Before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><div class="cmp-b"><span>Before</span></div><div class="cmp-a"><span>After</span></div><i class="cmp-h" aria-hidden="true"></i></div>`,
  init(r){const c=r.querySelector('.cmp');let x=50;const set=v=>{x=Math.max(0,Math.min(100,v));c.style.setProperty('--x',x+'%');c.setAttribute('aria-valuenow',Math.round(x));};
    const at=e=>{const b=c.getBoundingClientRect();set((e.clientX-b.left)/b.width*100);};
    c.onpointerdown=e=>{c.setPointerCapture(e.pointerId);at(e);c.onpointermove=at;};c.onpointerup=()=>{c.onpointermove=null;};
    c.onkeydown=e=>{if(e.key==='ArrowLeft'){e.preventDefault();set(x-5);}if(e.key==='ArrowRight'){e.preventDefault();set(x+5);}};set(50);},
  css:`
.cmp{--x:50%;position:relative;width:88%;max-width:300px;aspect-ratio:2/1;max-height:140px;border-radius:10px;overflow:hidden;cursor:ew-resize;touch-action:none;user-select:none}
.cmp:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.cmp-b,.cmp-a{position:absolute;inset:0;display:flex;align-items:flex-end;padding:6px}
.cmp-b{background:radial-gradient(circle at 70% 32%,#D3D6D4 0 11%,transparent 12%),linear-gradient(#9AA09D 0 60%,#6F7471 60%)}
.cmp-a{justify-content:flex-end;clip-path:inset(0 0 0 var(--x));background:radial-gradient(circle at 70% 32%,#FFD166 0 11%,transparent 12%),linear-gradient(#7EC8E3 0 60%,#3E8E5E 60%)}
.cmp span{font:700 10px var(--body);background:rgba(0,0,0,.5);color:#fff;padding:2px 7px;border-radius:999px}
.cmp-h{position:absolute;top:0;bottom:0;left:var(--x);width:3px;background:#fff;translate:-50% 0;box-shadow:0 0 6px rgba(0,0,0,.3)}
.cmp-h::after{content:"⇆";position:absolute;top:50%;left:50%;translate:-50% -50%;width:24px;height:24px;border-radius:50%;background:#fff;color:#17231F;display:grid;place-items:center;font-size:12px}
`
});
