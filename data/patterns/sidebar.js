Whatsit.addPattern({id:'sidebar',name:'Sidebar navigation',aka:['Side nav','Sidebar','Navigation rail'],cat:'Navigation',
  say:'A vertical menu down the side of an app, often collapsible to just icons.',
  keys:'sidebar side menu vertical left navigation dashboard admin icons collapse expand rail',
  use:'Apps and dashboards with many sections that people switch between all day.',
  avoid:'Marketing sites and phones. Use a navbar or a bottom tab bar there.',
  confuse:[['drawer','A drawer stays hidden until opened. A sidebar is always visible.'],['navbar','A navbar runs across the top. A sidebar runs down the side and fits more sections.']],
  parts:[['Item','An icon with a label'],['Active item','The current section, highlighted'],['Group label','A small heading over related items'],['Collapse toggle','Shrinks the sidebar to icons only']],
  opts:[['Collapsible to icons','a toggle that collapses the sidebar to icons only, with tooltips on hover',1],['Group headings','small group headings like “Workspace” and “Settings”',0],['Remember collapsed state','the collapsed state remembered after a reload',1]],
  a11y:'a nav with aria-current on the active item, and aria-expanded on the collapse toggle',
  html:()=>`<div class="sn"><nav class="sn-bar"><button class="sn-t" aria-label="Collapse sidebar" aria-expanded="true">‹</button>${[['▦','Dashboard'],['✉','Inbox'],['◷','Reports'],['⚙','Settings']].map(([ic,l],i)=>`<button class="sn-i${i?'':' on'}" title="${l}"><span aria-hidden="true">${ic}</span><b>${l}</b></button>`).join('')}</nav><div class="sn-main">Dashboard</div></div>`,
  init(r){const s=r.querySelector('.sn'),t=r.querySelector('.sn-t'),it=[...r.querySelectorAll('.sn-i')],m=r.querySelector('.sn-main');
    t.onclick=()=>{const c=s.classList.toggle('col');t.setAttribute('aria-expanded',!c);t.setAttribute('aria-label',c?'Expand sidebar':'Collapse sidebar');};
    it.forEach(b=>b.onclick=()=>{it.forEach(x=>x.classList.toggle('on',x===b));m.textContent=b.title;});},
  css:`
.sn{display:flex;width:88%;max-width:300px;height:140px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--demo-2);font-size:12px}
.sn-bar{width:112px;flex:none;border-right:1px solid var(--line);padding:6px;display:flex;flex-direction:column;gap:2px;transition:width .2s}
.sn.col .sn-bar{width:42px}
.sn-bar button{display:flex;align-items:center;gap:8px;border:0;background:none;padding:5px 7px;border-radius:7px;cursor:pointer;color:var(--muted);white-space:nowrap;overflow:hidden;text-align:left}
.sn-bar .sn-i.on{background:var(--accent-soft);color:var(--ink);font-weight:700}
.sn-bar span{width:14px;flex:none;text-align:center}
.sn.col .sn-bar b{display:none}
.sn-t{justify-content:flex-end;font-size:14px}
.sn.col .sn-t{justify-content:center;transform:scaleX(-1)}
.sn-main{flex:1;display:grid;place-items:center;font:700 14px var(--display)}
`
});
