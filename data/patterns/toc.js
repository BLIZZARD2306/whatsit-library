Whatsit.addPattern({id:'toc',name:'Table of contents',aka:['On this page','Scrollspy','Anchor links','Jump links'],cat:'Navigation',
  say:'A list of the page’s headings off to the side. The one you’re reading lights up as you scroll.',
  keys:'on this page list of headings side links jump to section highlights as you scroll scrollspy docs article outline anchor',
  use:'Long pages people skim: docs, articles, policies, long settings pages.',
  avoid:'Short pages, or moving between different pages. That’s a sidebar.',
  confuse:[['sidebar','A sidebar moves between pages. A table of contents moves around inside one page.'],['breadcrumb','Breadcrumbs show where the page sits in the site. A table of contents shows what’s on the page.'],['tabs','Tabs hide the other sections. A table of contents scrolls to them.']],
  parts:[['Title','Usually “On this page”'],['Link','One heading you can jump to'],['Active marker','The highlight on the section in view'],['Nested links','Indented links for sub-headings']],
  opts:[['Highlight while scrolling','the link for the section in view highlighted as the page scrolls (scrollspy)',1],['Smooth scroll','a smooth scroll to the section when a link is clicked',1],['Sticky','the list staying in view while the page scrolls',1],['Collapse on mobile','a collapsed “On this page” dropdown on small screens',0]],
  a11y:'a nav landmark labelled “On this page”, with aria-current on the active link',
  html:()=>{const s=['Install','Set up','Deploy'];return `<div class="toc"><div class="toc-a" tabindex="0" aria-label="Article">${s.map(x=>`<section><b>${x}</b><i></i><i></i><i></i><i></i></section>`).join('')}</div><nav class="toc-n" aria-label="On this page"><small>On this page</small>${s.map((x,i)=>`<button${i?'':' class="on"'}>${x}</button>`).join('')}</nav></div>`;},
  init(r){const a=r.querySelector('.toc-a'),s=[...a.children],b=[...r.querySelectorAll('.toc-n button')];const still=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;const mark=()=>{let k=0;s.forEach((x,i)=>{if(x.offsetTop<=a.scrollTop+14)k=i;});if(a.scrollTop+a.clientHeight>=a.scrollHeight-2)k=s.length-1;b.forEach((x,i)=>x.classList.toggle('on',i===k));};a.onscroll=mark;b.forEach((x,i)=>x.onclick=()=>a.scrollTo({top:s[i].offsetTop-10,behavior:still?'auto':'smooth'}));},
  css:`
.toc{position:absolute;inset:12px;display:grid;grid-template-columns:1fr 92px;grid-template-rows:minmax(0,1fr);gap:10px;font-size:12px}
.toc-a{position:relative;overflow-y:auto;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;padding:10px}
.toc-a section{display:grid;gap:7px;margin-bottom:18px}
.toc-a i{height:7px;border-radius:4px;background:color-mix(in srgb,var(--ink) 12%,transparent)}
.toc-a i:last-child{width:60%}
.toc-n{display:grid;align-content:start;gap:2px}
.toc-n small{color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.toc-n button{border:0;border-left:2px solid var(--line);background:none;text-align:left;padding:4px 8px;color:var(--muted);font-size:12px;cursor:pointer}
.toc-n button.on{border-color:var(--accent);color:var(--ink);font-weight:700}
`
});
