Whatsit.addPattern({id:'tree',name:'Tree view',aka:['File tree','Nested list','Folder tree'],cat:'Data',
  say:'A nested list of folders and files that you expand and collapse with arrows.',
  keys:'folders files tree nested expand collapse arrow hierarchy explorer indent children parent outline',
  use:'File browsers, org charts, nested categories and settings.',
  avoid:'Lists with only one level. A plain list is simpler.',
  confuse:[['accordion','An accordion opens sections of content. A tree view nests items inside items, many levels deep.'],['breadcrumb','Breadcrumbs show the path to where you are. A tree shows the whole structure.']],
  parts:[['Node','One item'],['Toggle','The arrow that expands or collapses a folder'],['Indent','How nesting is shown'],['Leaf','An item with no children'],['Selected','The highlighted item']],
  opts:[['Expand / collapse arrows','arrows that expand and collapse folders',1],['Folder and file icons','folder and file icons next to each item',1],['Keyboard navigation','arrow keys to move, Right to expand and Left to collapse',1]],
  a11y:'role="tree" with treeitems, aria-expanded on folders, and arrow-key navigation',
  html:()=>`<div class="tr"><details open><summary>src</summary><details open><summary>components</summary><span class="on">Button.jsx</span><span>Navbar.jsx</span></details><span>app.js</span></details><details><summary>public</summary><span>logo.svg</span></details><span>README.md</span></div>`,
  init(r){const s=[...r.querySelectorAll('.tr span')];s.forEach(x=>x.onclick=()=>s.forEach(y=>y.classList.toggle('on',y===x)));},
  css:`
.tr{width:80%;max-width:240px;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;padding:6px;font:12px/1.4 var(--mono)}
.tr summary{list-style:none;cursor:pointer;padding:1px 6px;border-radius:5px;display:flex;align-items:center;gap:4px;font-weight:500}
.tr summary::-webkit-details-marker{display:none}
.tr summary::before{content:"▸";display:inline-block;width:10px;color:var(--muted);transition:rotate .15s}
.tr details[open]>summary::before{rotate:90deg}
.tr details>:not(summary){margin-left:14px}
.tr span{display:block;padding:1px 6px 1px 20px;border-radius:5px;cursor:pointer;color:var(--muted)}
.tr span.on{background:var(--accent-soft);color:var(--ink)}
.tr summary:hover,.tr span:hover{background:color-mix(in srgb,var(--ink) 6%,transparent)}
`
});
