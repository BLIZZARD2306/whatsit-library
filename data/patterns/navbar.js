Whatsit.addPattern({id:'navbar',name:'Navigation bar',aka:['Navbar','Header','Top bar','Menu bar'],cat:'Navigation',
  say:'The strip across the top with the logo, main links and a button.',
  keys:'top bar header menu logo links nav navigation home about contact sign in sticky across',
  use:'Every multi-page site and app. It’s how people move between the main sections.',
  avoid:'More than 5–7 links. Group the rest into a dropdown or drawer.',
  confuse:[['tabs','Tabs switch content inside a page. A navbar moves between pages.'],['drawer','On phones, the navbar’s links usually move into a drawer.'],['tabbar','A bottom tab bar is the phone-app version, at the bottom of the screen.']],
  parts:[['Logo','Brand mark that links home'],['Links','The main sections'],['Active link','The highlighted current page'],['Call to action','The main button, like “Sign in”'],['Sticky','Stays at the top while scrolling']],
  opts:[['Sticky on scroll','staying fixed at the top while scrolling, with a shadow once scrolled',1],['Hamburger menu on mobile','links collapsing into a hamburger button that opens a drawer on small screens',1],['Transparent over the hero','a transparent background over the hero that turns solid on scroll',0]],
  a11y:'a nav element with aria-current="page" on the active link',
  html:()=>`<div class="nbar"><b>Plantly</b><nav><a class="on">Home</a><a>Shop</a><a>About</a></nav><button class="dbtn">Sign in</button></div>`,
  init(r){const a=[...r.querySelectorAll('.nbar a')];a.forEach(x=>x.onclick=()=>a.forEach(y=>y.classList.toggle('on',y===x)));},
  css:`
.nbar{width:94%;display:flex;align-items:center;justify-content:space-between;gap:8px;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px;font-size:12px}
.nbar b{font-family:var(--display);font-size:14px}
.nbar nav{display:flex;gap:8px}
.nbar a{color:var(--muted);cursor:pointer}
.nbar a.on{color:var(--accent);font-weight:700}
.nbar .dbtn{padding:5px 9px;font-size:12px}
`
});
