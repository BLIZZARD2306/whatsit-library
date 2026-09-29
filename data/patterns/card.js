Whatsit.addPattern({id:'card',name:'Card',aka:['Tile','Product card'],cat:'Layout',
  say:'A box that groups an image, a title and an action about one thing.',
  keys:'box tile product item image picture title price button grid container rounded shadow thumbnail',
  use:'Grids of similar items: products, articles, projects.',
  avoid:'Content that reads as one flowing piece. Wrapping everything in cards adds clutter.',
  confuse:[['modal','A modal floats over the page and blocks it. A card sits in the page layout.']],
  parts:[['Media','The image at the top'],['Body','Title, text and details'],['Actions','Buttons or links at the bottom'],['Hover state','A lift or shadow when pointed at']],
  opts:[['Whole card clickable','the whole card clickable as one link, with a visible focus ring',1],['Hover lift','a small lift and shadow on hover',1],['Responsive grid','a grid with 1 card per row on phones, 2 on tablets and 3–4 on desktop',1]],
  a11y:'one heading per card and a single link target, never nested links',
  html:()=>`<article class="pcard"><div class="img"></div><div class="bd"><b>Trail runner</b><span>$89</span><button class="dbtn">Add to cart</button></div></article>`,
  css:`
.pcard{width:150px;background:var(--demo-2);border:1px solid var(--line);border-radius:12px;overflow:hidden;font-size:13px}
.pcard .img{height:60px;background:linear-gradient(135deg,#2E7C8C,#9A5B34)}
.pcard .bd{padding:8px 10px;display:flex;flex-direction:column;gap:3px}
.pcard .dbtn{padding:5px 8px;font-size:12px}
`
});
