Whatsit.addAnimation({id:'text-reveal',name:'Staggered text reveal',aka:['Split text animation','Word reveal','Masked text reveal','Line rise'],kind:'Text',
  say:'A headline whose words slide up into view one after another, as if rising from behind a line.',
  keys:'words appear one by one sliding up headline animation text comes in letters rising reveal intro title stagger',
  use:'The main headline of a hero, or section titles as they scroll into view.',
  avoid:'Body text and buttons. People shouldn’t have to wait to read anything they need.',
  tech:'CSS transforms and keyframes on per-word spans, with a small script (or the framework) to split the text.',
  parts:[['Mask','Each word wrapped in a box with overflow: hidden, so it appears from nowhere'],['Word','The inner span that moves up into the mask'],['Stagger','The small delay between one word and the next'],['Trigger','What starts it: page load, or the headline scrolling into view']],
  motion:[['Duration','700ms per word'],['Stagger','70–90ms between words'],['Easing','cubic-bezier(.2,.7,.2,1) (fast start, soft landing)'],['Travel','from 110% below to 0'],['Extra','a slight rotate (3–4°) that straightens as it lands']],
  build:[
    'Split the headline into words, keeping spaces, and wrap each in an outer span (display: inline-block; overflow: hidden) and an inner span.',
    'Start each inner span at translateY(110%) rotate(4deg).',
    'Animate them to translateY(0) rotate(0) with the easing above, delaying each by its index × 80ms (a --i CSS variable works well).',
    'Trigger it on load for a hero, or with IntersectionObserver for headings lower down, and only play it once.',
    'Keep the full sentence readable to screen readers with aria-label on the heading and aria-hidden on the split spans.',
  ],
  opts:[['Play on scroll','playing when the heading scrolls into view, once',1],['Slight rotation','a small rotation that straightens as each word lands',1],['Letter by letter','splitting into letters instead of words for short titles',0],['Fade as well','fading each word in while it rises',0]],
  perf:'Animate only transform and opacity; split text once, not every render; avoid it on headings longer than about 12 words.',
  a11y:'the heading keeping its full text for screen readers (aria-label on the heading, aria-hidden on the word spans), and the words shown instantly under prefers-reduced-motion',
  html:()=>{const w='Make the first second count'.split(' ');return `<h3 class="txr" aria-label="Make the first second count">${w.map((x,i)=>`<span class="txr-m" aria-hidden="true"><span style="--i:${i}">${x}</span></span>`).join(' ')}</h3>`;},
  css:`
.txr{margin:0;max-width:260px;text-align:center;font:800 26px/1.08 var(--display);letter-spacing:-.03em;color:var(--ink)}
.txr-m{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em}
.txr-m>span{display:inline-block;transform-origin:0 100%;animation:txr-a 4.6s cubic-bezier(.2,.7,.2,1) infinite;animation-delay:calc(var(--i)*80ms)}
@keyframes txr-a{0%{transform:translateY(110%) rotate(4deg)}16%,78%{transform:none}92%,100%{transform:translateY(-110%)}}
`
});
