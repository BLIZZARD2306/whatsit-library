Whatsit.addPattern({id:'marquee',name:'Logo marquee',aka:['Ticker','Scrolling logos','Marquee'],cat:'Media',
  say:'A row of logos or text that scrolls sideways by itself, forever.',
  keys:'logos scrolling moving sideways ticker trusted companies brands infinite loop auto scroll strip',
  use:'“Trusted by” logo strips and announcements.',
  avoid:'Anything people need to read carefully. Moving text is hard to read.',
  confuse:[['carousel','A carousel moves one slide at a time when asked. A marquee scrolls nonstop by itself.']],
  parts:[['Track','The moving strip'],['Items','Logos or phrases'],['Loop','Items repeated so the end joins the start'],['Faded edges','A soft fade at both sides']],
  opts:[['Pause on hover','pausing while hovered',1],['Faded edges','fading out at the left and right edges',1],['Respect reduced motion','stopping the animation for people who prefer reduced motion',1]],
  a11y:'content readable without motion, and the animation off under prefers-reduced-motion',
  html:()=>{const l=['Kitebird','Fernway','Quartzly','Bramble','Nimbus Labs','Lumen','Orbitly'].map(x=>`<span>${x}</span>`).join('');return `<div class="mq" aria-label="Trusted by"><div class="mq-t">${l}<span aria-hidden="true" style="display:contents">${l}</span></div></div>`;},
  css:`
.mq{width:92%;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent);mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)}
.mq-t{display:flex;width:max-content;animation:mq 14s linear infinite}
.mq-t span{font:800 20px var(--display);color:var(--muted);margin-right:32px;letter-spacing:-.01em}
.mq:hover .mq-t{animation-play-state:paused}
@keyframes mq{to{transform:translateX(-50%)}}
`
});
