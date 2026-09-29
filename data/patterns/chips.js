Whatsit.addPattern({id:'chips',name:'Chips',aka:['Tags','Pills','Filter chips'],cat:'Forms',
  say:'Small rounded labels, often with an × to remove them.',
  keys:'tags labels pills rounded small remove x filter selected topics keywords categories bubbles',
  use:'Showing active filters, or tags the user added.',
  avoid:'Plain status labels nobody can change. That\'s a badge.',
  confuse:[['badge','A badge shows a count or status. Chips are things the user added or can remove.']],
  parts:[['Chip','One rounded label'],['Remove icon','The × that deletes it'],['Selected state','Filled color on an active filter chip'],['Input','Where new chips are typed, in a tag input']],
  opts:[['Remove with ×','an × button on each chip that removes it',1],['Type to add','a text field where pressing Enter adds a new chip',0],['Clear all','a “Clear all” link',0]],
  a11y:'remove buttons labelled with the chip name, e.g. “Remove Under $50”',
  html:()=>`<div class="chips"><span class="chip">Under $50<button aria-label="Remove Under $50">×</button></span><span class="chip">Size 9<button aria-label="Remove Size 9">×</button></span><span class="chip">Waterproof<button aria-label="Remove Waterproof">×</button></span></div>`,
  init(r){const w=r.querySelector('.chips'),o=w.innerHTML;const bind=()=>w.querySelectorAll('.chip button').forEach(b=>b.onclick=()=>{b.parentElement.remove();if(!w.children.length){w.innerHTML='<button class="dbtn ghost">Reset filters</button>';w.firstChild.onclick=()=>{w.innerHTML=o;bind();};}});bind();},
  css:`
.chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:300px}
.chip{display:inline-flex;align-items:center;gap:4px;background:var(--accent-soft);color:var(--ink);border-radius:999px;padding:4px 6px 4px 12px;font-size:13px}
.chip button{border:0;background:transparent;cursor:pointer;width:20px;height:20px;border-radius:50%;line-height:1;color:var(--muted)}
.chip button:hover{background:color-mix(in srgb,var(--ink) 12%,transparent)}
`
});
