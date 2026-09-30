Whatsit.addPattern({id:'bottomsheet',name:'Bottom sheet',aka:['Action sheet','Slide-up panel'],cat:'Overlays',
  say:'A panel that slides up from the bottom of the screen, common in phone apps.',
  keys:'slide up bottom panel phone mobile sheet drawer drag handle share options swipe up',
  use:'Extra options or details on phones, where the bottom of the screen is easy to reach with a thumb.',
  avoid:'Desktop layouts. Use a modal or popover there.',
  confuse:[['drawer','A drawer slides in from the side. A bottom sheet slides up from the bottom.'],['modal','A modal floats in the center. A bottom sheet is attached to the bottom edge.']],
  parts:[['Handle','The small grab bar at the top'],['Sheet','The panel itself'],['Backdrop','The dimmed screen behind it'],['Snap points','Heights it can rest at, like half and full']],
  opts:[['Drag to close','dragging the handle down to close it',1],['Half and full heights','snapping to half-screen and full-screen heights',0],['Close on backdrop tap','closing when the dimmed backdrop is tapped',1]],
  a11y:'dialog semantics, focus moved into the sheet, and a visible way to close it besides dragging',
  html:()=>`<div class="bs-phone"><div class="bs-scr"><button class="dbtn bs-o">Share</button></div><div class="bs-bd"></div><div class="bs-sheet" role="dialog" aria-label="Share to"><i class="bs-h"></i><b>Share to</b><div class="bs-row">${[['M','Message','#2E7C8C'],['E','Email','#9A5B34'],['C','Copy','#5A6B2E'],['+','More','#6B4C9A']].map(([l,n,c])=>`<button><em style="background:${c}">${l}</em><small>${n}</small></button>`).join('')}</div></div></div>`,
  init(r){const p=r.querySelector('.bs-phone');r.querySelector('.bs-o').onclick=()=>p.classList.add('open');r.querySelector('.bs-bd').onclick=()=>p.classList.remove('open');r.querySelectorAll('.bs-row button').forEach(b=>b.onclick=()=>p.classList.remove('open'));},
  css:`
.bs-phone{position:relative;width:150px;height:150px;border:2px solid var(--line);border-radius:18px;background:var(--demo-2);overflow:hidden}
.bs-scr{height:100%;display:grid;place-items:center}
.bs-bd{position:absolute;inset:0;background:var(--scrim);opacity:0;pointer-events:none;transition:opacity .2s}
.bs-sheet{position:absolute;left:0;right:0;bottom:0;background:var(--demo-2);border-radius:14px 14px 0 0;padding:6px 8px 12px;translate:0 100%;transition:translate .25s ease;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11px;box-shadow:0 -6px 16px rgba(0,0,0,.15)}
.bs-phone.open .bs-bd{opacity:1;pointer-events:auto}
.bs-phone.open .bs-sheet{translate:0 0}
.bs-h{width:30px;height:4px;border-radius:4px;background:var(--line)}
.bs-row{display:flex;gap:6px}
.bs-row button{display:flex;flex-direction:column;align-items:center;gap:2px;border:0;background:none;padding:0;cursor:pointer}
.bs-row em{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;color:#fff;font:700 10px var(--body);font-style:normal}
.bs-row small{font-size:8px;color:var(--muted)}
`
});
