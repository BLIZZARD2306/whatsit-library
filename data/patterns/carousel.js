Whatsit.addPattern({id:'carousel',name:'Carousel',aka:['Slider','Slideshow','Image slider'],cat:'Media',
  say:'A row of slides that moves sideways, one at a time.',
  keys:'pictures images photos slide slides sideways swipe left right arrows dots gallery rotate banner hero horizontal moving',
  use:'Showing several images or cards in limited space, like a hero banner or testimonials.',
  avoid:'Content everyone must see. Most people never go past slide two.',
  confuse:[['tabs','Tabs swap content with labelled buttons. A carousel moves through slides with arrows or swipe.'],['range','People also call a range input a “slider”. If you mean moving pictures, say carousel.']],
  parts:[['Slide','One item in the row'],['Track','The strip holding every slide; it moves'],['Arrows','Previous / next buttons'],['Dots','Indicators showing the active slide'],['Autoplay','Moves by itself on a timer']],
  opts:[['Arrows (previous / next)','previous and next arrow buttons',1],['Dot indicators','dot indicators that show the active slide and can be clicked',1],['Swipe on touch screens','swipe support on touch screens',1],['Autoplay','autoplay every 5 seconds, pausing on hover and focus',0],['Loop back to start','looping from the last slide back to the first',0]],
  a11y:'keyboard support with the left and right arrow keys, and aria-labels on the arrow buttons',
  html:()=>`<div class="d-car"><div class="d-car-track"><div class="d-slide">Summer sale</div><div class="d-slide">New arrivals</div><div class="d-slide">Free shipping</div></div><button class="d-arrow d-prev" aria-label="Previous slide">‹</button><button class="d-arrow d-next" aria-label="Next slide">›</button><div class="d-dots"><button aria-label="Slide 1"></button><button aria-label="Slide 2"></button><button aria-label="Slide 3"></button></div></div>`,
  init(r){const t=r.querySelector('.d-car-track'),d=[...r.querySelectorAll('.d-dots button')];let i=0;const go=n=>{i=(n+3)%3;t.style.transform=`translateX(-${i*100}%)`;d.forEach((x,k)=>x.classList.toggle('on',k===i));};r.querySelector('.d-prev').onclick=()=>go(i-1);r.querySelector('.d-next').onclick=()=>go(i+1);d.forEach((x,k)=>x.onclick=()=>go(k));go(0);},
  css:`
.d-car{position:relative;width:88%;max-width:340px;height:auto;aspect-ratio:2/1;min-height:120px;border-radius:10px;overflow:hidden}
.d-car-track{display:flex;height:100%;transition:transform .45s cubic-bezier(.6,.1,.2,1)}
.d-slide{flex:0 0 100%;display:grid;place-items:center;font:700 18px var(--display);color:#fff}
.d-slide:nth-child(1){background:#2E7C8C}
.d-slide:nth-child(2){background:#9A5B34}
.d-slide:nth-child(3){background:#5A6B2E}
.d-arrow{position:absolute;top:50%;translate:0 -50%;width:28px;height:28px;border-radius:50%;border:0;background:rgba(255,255,255,.9);color:#17231F;cursor:pointer;font-size:16px;line-height:1}
.d-prev{left:8px}
.d-next{right:8px}
.d-dots{position:absolute;bottom:8px;left:50%;translate:-50% 0;display:flex;gap:6px}
.d-dots button{width:8px;height:8px;border-radius:50%;border:0;padding:0;background:rgba(255,255,255,.5);cursor:pointer}
.d-dots button.on{background:#fff;width:18px;border-radius:4px}
`
});
