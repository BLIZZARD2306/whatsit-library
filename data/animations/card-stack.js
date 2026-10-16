Whatsit.addAnimation({id:'card-stack',name:'Stacking cards',aka:['Sticky card stack','Card cascade','Scroll stack','Deck on scroll'],kind:'Scroll',
  say:'Cards pin to the screen as you scroll and pile on top of each other, the ones underneath shrinking back like a deck.',
  keys:'cards stack on scroll pile up sticky cards overlap deck shrinking behind each other scroll cards cascade',
  use:'Showing 3–6 features, steps or case studies one at a time in a memorable way.',
  avoid:'More than about 6 items, or content people want to compare side by side (use a grid or table).',
  tech:'position: sticky for the pinning, plus a little script (or CSS scroll-driven animations where supported) for the shrink.',
  parts:[['Track','A tall wrapper that gives the cards room to scroll'],['Card','Each panel, sticky at the top with a small offset'],['Offset','Each card pinning a little lower than the last so their tops peek out'],['Recede','Cards underneath scaling down and dimming as the next one covers them']],
  motion:[['Pin offset','top: 80px + index × 16px'],['Recede scale','down to about 0.9 for the bottom card'],['Dim','underneath cards darkening to about 60% brightness'],['Coupling','tied directly to scroll position (no timers)']],
  build:[
    'Wrap the cards in a track; give each card position: sticky and a top of 80px plus its index × 16px.',
    'Space the cards with a margin so each one scrolls for about a screen before the next arrives.',
    'For each card, measure how far the next card has covered it (0 to 1) on scroll, throttled to one update per frame.',
    'Map that progress to scale(1 → 0.9) and filter: brightness(1 → 0.6) on the covered card, with transform-origin at the top.',
    'Use CSS animation-timeline: view() instead of the script where the browser supports it.',
    'On small screens, reduce the offsets and keep each card shorter than the viewport.',
  ],
  opts:[['Shrink cards underneath','cards underneath shrinking back as the next one covers them',1],['Dim cards underneath','cards underneath dimming as they’re covered',1],['Peek offset','each card pinning slightly lower so the stack’s edges show',1],['Progress dots','small dots beside the stack showing which card is on top',0]],
  perf:'Read layout once per frame and write only transform and filter; prefer CSS scroll-driven animations where available.',
  a11y:'the cards in normal reading order, each with a heading, and scaling turned off under prefers-reduced-motion (pinning alone is fine)',
  html:()=>`<div class="cs" tabindex="0" aria-label="Scrollable demo">${[['Discover','#1E6B7A'],['Prototype','#7B4DD6'],['Launch','#D1553E'],['Grow','#C4860F']].map(([x,c],i)=>`<article class="cs-c" style="--i:${i};background:${c}"><small>0${i+1}</small><b>${x}</b></article>`).join('')}<div class="cs-end"></div></div>`,
  init(root){
    const box=root.querySelector('.cs'),cards=[...box.querySelectorAll('.cs-c')];let user=false;
    ['pointerdown','wheel','touchstart','focus'].forEach(ev=>box.addEventListener(ev,()=>{user=true;},{passive:true}));
    const paint=()=>{cards.forEach((c,i)=>{const n=cards[i+1];let p=0;
      if(n){const a=c.getBoundingClientRect(),b=n.getBoundingClientRect();p=Math.max(0,Math.min(1,1-(b.top-a.top)/a.height));}
      c.style.transform=`scale(${1-p*.08})`;c.style.filter=`brightness(${1-p*.35})`;});};
    box.addEventListener('scroll',()=>requestAnimationFrame(paint),{passive:true});
    Whatsit.loop(root,t=>{if(!user){const max=box.scrollHeight-box.clientHeight;box.scrollTop=max*(.5-.5*Math.cos(t*.5));}paint();});
  },
  css:`
.cs{position:absolute;inset:0;overflow-y:auto;padding:12px 16% 0;scrollbar-width:none}
.cs::-webkit-scrollbar{display:none}
.cs-c{position:sticky;top:calc(12px + var(--i)*10px);height:120px;margin-bottom:56px;border-radius:14px;color:#fff;padding:14px 16px;display:flex;flex-direction:column;justify-content:space-between;transform-origin:50% 0;box-shadow:0 -6px 20px rgba(0,0,0,.18)}
.cs-c small{font:500 12px var(--mono);opacity:.8}
.cs-c b{font:800 24px var(--display);letter-spacing:-.02em}
.cs-end{height:30px}
@media (prefers-reduced-motion:reduce){.cs-c{transform:none!important;filter:none!important}}
`
});
