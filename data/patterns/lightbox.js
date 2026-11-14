Whatsit.addPattern({id:'lightbox',name:'Image lightbox',aka:['Photo viewer','Gallery viewer','Image zoom','Fullscreen gallery'],cat:'Media',
  say:'Click a small picture and it opens big over a dark background, with arrows to flip through the rest.',
  keys:'click photo opens big dark background thumbnails gallery zoom enlarge full screen arrows next previous close x viewer pictures',
  use:'Photo galleries, product photos and portfolios, where people want a closer look without leaving the page.',
  avoid:'Anything that isn’t an image or video. For forms and messages use a modal.',
  confuse:[['modal','A modal holds text, a form or a decision. A lightbox is only for looking at media.'],['carousel','A carousel sits in the page and shows slides in place. A lightbox opens on top of the page.'],['compare','A before/after slider layers two images. A lightbox shows one at a time, large.']],
  parts:[['Thumbnail','The small image you click'],['Backdrop','The dark layer over the page'],['Stage','The large image'],['Arrows','Previous and next'],['Counter','“2 / 8”'],['Close button','The × in the corner']],
  opts:[['Arrows and keyboard','previous and next arrows, plus the left and right arrow keys',1],['Counter','a counter like “2 / 8”',1],['Close on backdrop or Escape','closing on a backdrop click or the Escape key',1],['Swipe on touch','swiping left and right on touch screens',0],['Captions','a caption under each image',0]],
  a11y:'a dialog that traps focus, Escape to close, focus returned to the thumbnail, and alt text on every image',
  html:()=>`<div class="lb-g">${[0,1,2,3].map(i=>`<button class="lb-t lb-c${i}" aria-label="Open photo ${i+1}"></button>`).join('')}</div><div class="ov lb-o"><div class="lb-big lb-c0"></div><button class="lb-x" aria-label="Close">×</button><button class="lb-p" aria-label="Previous photo">‹</button><button class="lb-n" aria-label="Next photo">›</button><span class="lb-k">1 / 4</span></div>`,
  init(r){const o=r.querySelector('.lb-o'),big=r.querySelector('.lb-big'),k=r.querySelector('.lb-k');let i=0;const show=n=>{i=(n+4)%4;big.className='lb-big lb-c'+i;k.textContent=`${i+1} / 4`;};r.querySelectorAll('.lb-t').forEach((t,n)=>t.onclick=()=>{show(n);o.classList.add('open');});r.querySelector('.lb-p').onclick=()=>show(i-1);r.querySelector('.lb-n').onclick=()=>show(i+1);r.querySelector('.lb-x').onclick=()=>o.classList.remove('open');o.onclick=e=>{if(e.target===o)o.classList.remove('open');};},
  css:`
.lb-g{display:grid;grid-template-columns:repeat(2,84px);gap:8px}
.lb-t{height:56px;border:0;border-radius:8px;cursor:zoom-in}
.lb-c0{background:linear-gradient(135deg,#2E7C8C,#8FD3C8)}
.lb-c1{background:linear-gradient(135deg,#9A5B34,#F0C48A)}
.lb-c2{background:linear-gradient(135deg,#5A6B2E,#C9D98A)}
.lb-c3{background:linear-gradient(135deg,#6B4C9A,#E3A6C9)}
.lb-o{background:rgba(0,0,0,.84)}
.lb-big{width:60%;height:66%;border-radius:8px}
.lb-o button{position:absolute;border:0;background:rgba(255,255,255,.18);color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:18px;line-height:1}
.lb-x{top:8px;right:8px}
.lb-p{left:8px;top:calc(50% - 14px)}
.lb-n{right:8px;top:calc(50% - 14px)}
.lb-k{position:absolute;bottom:7px;left:0;right:0;text-align:center;color:#fff;font-size:11px}
`
});
