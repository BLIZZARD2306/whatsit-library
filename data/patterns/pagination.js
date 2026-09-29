Whatsit.addPattern({id:'pagination',name:'Pagination',aka:['Page numbers','Pager'],cat:'Navigation',
  say:'Numbered buttons for moving between pages of results.',
  keys:'page pages numbers next previous prev bottom results list more dots ellipsis pager change',
  use:'Long lists split into pages, like search results or order history.',
  avoid:'Feeds people scroll casually. Infinite scroll or a “Load more” button fits better.',
  confuse:[['stepper','A stepper walks through the steps of one task. Pagination moves through pages of the same list.']],
  parts:[['Page button','One number'],['Current page','The highlighted number'],['Previous / Next','The arrow buttons'],['Ellipsis','The “…” standing in for skipped pages']],
  opts:[['Always show first and last page','the first and last page numbers always visible, with “…” for gaps',1],['Page size selector','a “Show 10 / 25 / 50 per page” selector',0],['Sync with URL','the current page kept in the URL (?page=3) so it survives reloads and sharing',1]],
  a11y:'a nav with aria-label="Pagination" and aria-current="page" on the current page',
  html:()=>`<nav class="pg" aria-label="Pagination"></nav>`,
  init(r){const n=r.querySelector('.pg'),T=9;let c=4;const draw=()=>{const a=[...new Set([1,T,c-1,c,c+1].filter(x=>x>=1&&x<=T))].sort((x,y)=>x-y);let h=`<button class="pa" ${c===1?'disabled':''} aria-label="Previous page">‹</button>`,prev=0;a.forEach(p=>{if(p-prev>1)h+='<span>…</span>';h+=`<button class="${p===c?'on':''}" ${p===c?'aria-current="page"':''}>${p}</button>`;prev=p;});h+=`<button class="pa" ${c===T?'disabled':''} aria-label="Next page">›</button>`;n.innerHTML=h;const b=[...n.querySelectorAll('button')];b[0].onclick=()=>{c--;draw();};b[b.length-1].onclick=()=>{c++;draw();};b.slice(1,-1).forEach(x=>x.onclick=()=>{c=+x.textContent;draw();});};draw();},
  css:`
.pg{display:flex;gap:4px;align-items:center;font-size:13px;flex-wrap:wrap;justify-content:center}
.pg button{min-width:30px;height:30px;border-radius:8px;border:1px solid var(--line);background:var(--demo-2);cursor:pointer;padding:0 6px}
.pg button.on{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);font-weight:700}
.pg button:disabled{opacity:.4;cursor:default}
.pg span{color:var(--muted);padding:0 2px}
`
});
