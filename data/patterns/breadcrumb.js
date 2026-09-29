Whatsit.addPattern({id:'breadcrumb',name:'Breadcrumbs',aka:['Breadcrumb trail'],cat:'Navigation',
  say:'A trail of links showing where you are, like Home › Shop › Shoes.',
  keys:'home path trail location where am i links arrows greater than site hierarchy back folder',
  use:'Sites with nested pages, like shops or documentation.',
  avoid:'Flat sites with only one level of pages.',
  confuse:[['stepper','A stepper shows progress through a task. Breadcrumbs show your place in the site.']],
  parts:[['Crumb','One link in the trail'],['Separator','The › or / between crumbs'],['Current page','The last crumb, not a link']],
  opts:[['Collapse on mobile','middle crumbs collapsed into “…” on small screens',1],['Built from the URL','crumbs generated automatically from the current route',0]],
  a11y:'a nav with aria-label="Breadcrumb" and aria-current="page" on the last crumb',
  html:()=>`<nav class="crumbs dbox" aria-label="Breadcrumb"><a href="#" onclick="return false">Home</a><span class="sep">›</span><a href="#" onclick="return false">Shop</a><span class="sep">›</span><span class="cur" aria-current="page">Trail shoes</span></nav>`,
  css:`
.crumbs{display:flex;gap:8px;font-size:14px;align-items:center;flex-wrap:wrap}
.crumbs a{color:var(--accent);text-decoration:none}
.crumbs a:hover{text-decoration:underline}
.crumbs .sep{color:var(--muted)}
.crumbs .cur{font-weight:700}
`
});
