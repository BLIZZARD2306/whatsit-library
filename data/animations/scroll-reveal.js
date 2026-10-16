Whatsit.addAnimation({id:'scroll-reveal',name:'Scroll reveal',aka:['Fade in on scroll','Reveal on scroll','Scroll-triggered animation','Entrance animation'],kind:'Scroll',
  say:'Sections and cards fade and slide gently into place as you scroll down to them.',
  keys:'things appear when scrolling fade in slide up on scroll animate on scroll elements come in as you scroll down entrance',
  use:'Landing pages and long marketing pages, to give each section a small moment of arrival.',
  avoid:'Dashboards, forms and apps people use every day. Waiting for content to appear gets old fast.',
  tech:'IntersectionObserver plus CSS transitions on a class. No scroll listeners, no libraries.',
  parts:[['Trigger line','How far into the screen an element must come before it reveals (e.g. 15% visible)'],['Start state','Slightly lower and transparent'],['End state','In place and fully visible'],['Stagger','Siblings in a grid revealing a beat apart']],
  motion:[['Duration','600–800ms'],['Easing','cubic-bezier(.2,.7,.2,1)'],['Travel','24–40px upward'],['Stagger','60–100ms between siblings'],['Repeat','once only (don’t hide again on scroll up)']],
  build:[
    'Give reveal elements a data-reveal attribute and a start state: opacity 0, translateY(32px).',
    'Create one IntersectionObserver with a threshold around 0.15 and a rootMargin that triggers slightly before the element is fully in view.',
    'When an element intersects, add an is-visible class (transition to opacity 1, translateY 0) and stop observing it.',
    'For grids, set a --i index on each child and use it as transition-delay for a stagger.',
    'Only apply the hidden start state once JavaScript has run (e.g. a .js class on <html>), so content never stays invisible.',
  ],
  opts:[['Stagger in grids','cards in the same row revealing one after another',1],['Slide up as well as fade','a short upward slide along with the fade',1],['Scale in slightly','a subtle scale from 0.97 to 1',0],['Reveal once','each element revealing only the first time',1]],
  perf:'Use one shared IntersectionObserver; animate only transform and opacity; never hide content above the fold.',
  a11y:'content visible without JavaScript, nothing hidden from screen readers, and everything shown immediately under prefers-reduced-motion',
  html:()=>`<div class="sr" tabindex="0" aria-label="Scrollable demo"><p class="sr-h">Scroll ↓</p>${['Plan','Design','Build','Launch','Grow'].map((x,i)=>`<div class="sr-i" style="--i:${i%2}"><b>${String(i+1).padStart(2,'0')}</b>${x}</div>`).join('')}</div>`,
  init(root){
    const box=root.querySelector('.sr');let user=false;
    const io=typeof IntersectionObserver==='function'?new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('on',e.isIntersecting)),{root:box,threshold:.35}):null;
    box.querySelectorAll('.sr-i').forEach(el=>io?io.observe(el):el.classList.add('on'));
    ['pointerdown','wheel','touchstart','focus'].forEach(ev=>box.addEventListener(ev,()=>{user=true;},{passive:true}));
    Whatsit.loop(root,t=>{if(user)return;const max=box.scrollHeight-box.clientHeight;box.scrollTop=max*(.5-.5*Math.cos(t*.55));});
  },
  css:`
.sr{position:absolute;inset:0;overflow-y:auto;padding:14px 18% 40px;scrollbar-width:none;display:flex;flex-direction:column;gap:12px}
.sr::-webkit-scrollbar{display:none}
.sr-h{margin:0 0 40px;font:500 12px var(--mono);text-transform:uppercase;letter-spacing:.12em;color:var(--muted);text-align:center}
.sr-i{display:flex;gap:12px;align-items:baseline;padding:14px 16px;border-radius:12px;background:var(--demo-2);border:1px solid var(--line);font:700 18px var(--display);opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--i)*80ms)}
.sr-i b{font:500 12px var(--mono);color:var(--accent)}
.sr-i.on{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.sr-i{opacity:1;transform:none}}
`
});
