Whatsit.addPattern({id:'drawer',name:'Drawer',aka:['Side panel','Off-canvas menu','Sheet'],cat:'Overlays',
  say:'A panel that slides in from the edge of the screen, often holding the menu.',
  keys:'side panel slides in left right edge hamburger menu three lines mobile nav off canvas sheet cart sidebar',
  use:'Mobile navigation, a shopping cart, or a filter panel.',
  avoid:'Primary actions people need all the time on desktop. Keep those visible.',
  confuse:[['modal','A modal appears in the center. A drawer slides in from an edge.']],
  parts:[['Panel','The sliding sheet'],['Backdrop','The dimmed page behind it'],['Hamburger','The three-line button that opens it'],['Side','Left, right or bottom']],
  opts:[['Slide from the left','sliding in from the left side',1],['Close on backdrop click and Esc','closing on backdrop click or Escape',1],['Hamburger that turns into ×','a hamburger icon that morphs into an × when open',0]],
  a11y:'focus trapped inside while open and returned to the menu button on close',
  html:()=>`<button class="dbtn ghost o">☰ Menu</button><div class="ov"></div><div class="d-drawer"><b>Menu</b><span>Home</span><span>Shop</span><span>Orders</span><span>Settings</span></div>`,
  init(r){const o=r.querySelector('.ov'),d=r.querySelector('.d-drawer');r.querySelector('.o').onclick=()=>{o.classList.add('open');d.classList.add('open');};o.onclick=()=>{o.classList.remove('open');d.classList.remove('open');};},
  css:`
.d-drawer{position:absolute;inset:0 auto 0 0;width:58%;max-width:200px;background:var(--demo-2);padding:14px;translate:-100% 0;transition:translate .25s;display:flex;flex-direction:column;gap:10px;font-size:14px;z-index:2}
.d-drawer.open{translate:0 0}
.d-drawer b{font-family:var(--display)}
`
});
