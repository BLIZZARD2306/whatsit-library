Whatsit.addAnimation({id:'spotlight-panel',name:'Spotlight panel',aka:['Cursor glow','Glow card','Spotlight hero','Grain hero'],kind:'Backgrounds',
  say:'A dark, slightly grainy panel with a soft pool of light that follows your mouse.',
  keys:'light follows mouse cursor glow torch spotlight dark card grainy hero panel shine border highlight',
  use:'A hero or a feature card on a dark site, to make it feel alive when someone moves their mouse.',
  avoid:'Touch-only audiences as the main effect (there is no cursor) and light themes, where the glow barely shows.',
  tech:'CSS radial gradients positioned by CSS variables, updated from one pointermove listener. No libraries.',
  parts:[['Panel','The dark rounded box, usually the hero container'],['Spotlight','A large soft radial gradient that sits under the cursor'],['Border glow','A thin edge that lights up nearest the cursor'],['Grain','A faint noise texture so the dark doesn’t look flat'],['Idle drift','A slow automatic movement while nobody is pointing at it']],
  motion:[['Follow','the light trails the cursor with a 0.15s ease, not stuck to it'],['Spotlight size','about 60% of the panel width'],['Idle drift','an 8s loop across the panel when the cursor is away'],['Fade','the glow fades in over 0.3s on enter and out on leave']],
  build:[
    'Make a rounded panel with a near-black background, a 1px translucent border and overflow: hidden.',
    'Add a layer with a radial-gradient centred at var(--x) var(--y), white or brand colour at 10–15% fading to transparent.',
    'On pointermove, set --x and --y on the panel in pixels relative to its box (use requestAnimationFrame to throttle).',
    'Add a second, smaller gradient masked to the border so the edge nearest the cursor lights up.',
    'When the pointer leaves, hand back to a slow keyframe drift so the panel never looks dead.',
    'Overlay SVG noise at low opacity and keep the content on top.',
  ],
  opts:[['Border glow','the border lighting up nearest the cursor',1],['Film grain','a faint film-grain texture over the panel',1],['Idle drift','a slow automatic drift of the light when the cursor isn’t over it',1],['Brand-colour light','the spotlight tinted with my brand colour instead of white',0]],
  perf:'Update only CSS variables, never layout; throttle pointer events to one per frame; skip the effect entirely on touch devices.',
  a11y:'the glow purely decorative, content readable without it, and the drift stopped under prefers-reduced-motion',
  html:()=>`<div class="sp"><div class="sp-l" aria-hidden="true"></div><div class="sp-c"><small>Spotlight</small><b>Move your mouse here</b></div></div>`,
  init(root){
    const el=root.querySelector('.sp');let raf=0,ev=null;
    el.addEventListener('pointermove',e=>{ev=e;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const r=el.getBoundingClientRect();el.style.setProperty('--x',ev.clientX-r.left+'px');el.style.setProperty('--y',ev.clientY-r.top+'px');});});
    el.addEventListener('pointerenter',()=>el.classList.add('live'));
    el.addEventListener('pointerleave',()=>el.classList.remove('live'));
  },
  css:`
.sp{position:absolute;inset:10px;border-radius:14px;background:#0b0d10;border:1px solid rgba(255,255,255,.08);overflow:hidden;display:grid;place-items:center;--x:50%;--y:50%}
.sp::before{content:"";position:absolute;inset:0;opacity:.14;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.sp-l{position:absolute;width:70%;aspect-ratio:1;left:0;top:0;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.2),rgba(160,190,255,.07) 55%,transparent);translate:-50% -50%;animation:sp-d 8s ease-in-out infinite alternate;transition:left .15s ease-out,top .15s ease-out}
.sp.live .sp-l{animation:none;left:var(--x);top:var(--y)}
.sp::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:radial-gradient(160px circle at var(--x) var(--y),rgba(255,255,255,.55),transparent 70%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .3s}
.sp.live::after{opacity:1}
.sp-c{position:relative;text-align:center;color:#e9edf2;display:grid;gap:4px}
.sp-c small{font:500 11px var(--mono);text-transform:uppercase;letter-spacing:.12em;color:#8a94a3}
.sp-c b{font:800 20px var(--display);letter-spacing:-.02em}
@keyframes sp-d{0%{left:15%;top:20%}50%{left:80%;top:40%}100%{left:35%;top:85%}}
`
});
