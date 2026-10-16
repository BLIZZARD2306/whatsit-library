Whatsit.addAnimation({id:'cinematic-landing',name:'Cinematic landing page',aka:['Immersive landing page','Animated homepage','Motion-first website','Showcase site'],kind:'Pages',
  say:'A whole landing page built for motion: glowing hero, headline that rises in, a floating centrepiece and sections that arrive as you scroll.',
  keys:'whole website full page landing page animated homepage cinematic immersive premium site motion template hero to footer',
  use:'Launch pages, portfolios, agencies and products that need to feel premium at first glance.',
  avoid:'Docs, dashboards and content-heavy sites, where speed of reading beats spectacle.',
  tech:'Plain HTML/CSS with small scripts for each effect (see “Built from”). Optional: a motion library already in the project, such as Motion or GSAP.',
  uses:['mesh-gradient','text-reveal','glass-orb','scroll-reveal','card-stack','spotlight-panel'],
  patterns:['navbar','marquee','pricing','accordion'],
  parts:[['Hero','Full-height section: mesh gradient behind, staggered headline, one call to action, a floating orb as the centrepiece'],['Logo strip','A “trusted by” marquee just under the fold'],['Feature stack','3–5 features as stacking cards on scroll'],['Spotlight cards','A grid of dark cards with a cursor spotlight for secondary features'],['Pricing','A simple pricing table that reveals on scroll'],['FAQ','An accordion of common questions'],['Final call to action','A short closing section that repeats the main button'],['Footer','Links, newsletter field and legal']],
  motion:[['Intro','headline words rise in 0–900ms, button fades in at 700ms, orb fades and floats in at 400ms'],['Section entrances','fade + 32px rise, 700ms, staggered 80ms'],['Easing','one shared curve everywhere: cubic-bezier(.2,.7,.2,1)'],['Budget','no more than 2 continuously moving things on screen at once'],['Reduced motion','everything shown in place, loops stopped']],
  build:[
    'Set up design tokens first: a dark base, 3–4 glow colours, one display font for headlines and a plain body font.',
    'Build the hero: a full-viewport section with the mesh gradient behind, the headline with a staggered word reveal, a subheading, one primary button and a floating iridescent orb to the side (stacked under the text on mobile).',
    'Add a sticky, translucent navbar that gains a blurred background after the first 40px of scroll.',
    'Under the hero, add a slow logo marquee with faded edges.',
    'Build the feature section as stacking cards on scroll, each with a short title, two lines of copy and an image or small looping visual.',
    'Add a grid of spotlight cards for secondary features, then pricing and an FAQ accordion, all using the shared scroll reveal.',
    'Finish with a closing call to action on a second, calmer gradient and a simple footer.',
    'Check it at 375px, 768px and 1440px wide, run Lighthouse (aim for 90+ performance), and test with reduced motion turned on.',
  ],
  opts:[['Floating orb in the hero','a floating iridescent orb as the hero centrepiece',1],['Stacking feature cards','the features section as stacking cards on scroll',1],['Spotlight card grid','a grid of dark cards with a cursor spotlight',1],['Pricing section','a pricing table section',1],['FAQ accordion','an FAQ accordion near the end',1],['Dark and light themes','a light theme as well as the dark one, following the system setting',0]],
  perf:'Lazy-load anything below the fold, keep the hero’s first paint free of JavaScript, preload the display font, animate only transform and opacity, and pause every loop off screen.',
  a11y:'one h1, landmark regions (header, main, footer), visible focus styles, 4.5:1 text contrast over every gradient, and all motion off under prefers-reduced-motion',
  html:()=>`<div class="cl"><div class="cl-bg" aria-hidden="true"><i></i><i></i><i></i></div><div class="cl-nav"><b>Lumen</b><span>Work</span><span>Pricing</span><em>Start</em></div><div class="cl-hero"><div class="cl-copy"><h4 aria-label="Launch something unforgettable">${'Launch something unforgettable'.split(' ').map((w,i)=>`<span class="cl-m" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ')}</h4><button class="cl-btn" tabindex="-1">Get started</button></div><div class="cl-orb" aria-hidden="true"></div></div><div class="cl-row" aria-hidden="true"><i></i><i></i><i></i></div></div>`,
  css:`
.cl{position:absolute;inset:0;overflow:hidden;background:#0c0a1c;color:#fff;display:flex;flex-direction:column;padding:10px 14px;gap:10px}
.cl-bg{position:absolute;inset:0}
.cl-bg i{position:absolute;width:60%;aspect-ratio:1;border-radius:50%;filter:blur(30px);mix-blend-mode:screen;opacity:.75;animation:cl-d 15s ease-in-out infinite alternate}
.cl-bg i:nth-child(1){background:#6c4dff;left:-15%;top:-35%}
.cl-bg i:nth-child(2){background:#ff5f8f;right:-20%;top:-20%;animation-delay:-5s;animation-direction:alternate-reverse}
.cl-bg i:nth-child(3){background:#17c3b2;left:25%;bottom:-70%;animation-delay:-9s}
.cl-nav{position:relative;display:flex;gap:10px;align-items:center;font-size:10px;color:rgba(255,255,255,.75)}
.cl-nav b{font:800 13px var(--display);color:#fff;margin-right:auto}
.cl-nav em{font-style:normal;font-weight:700;color:#0c0a1c;background:#fff;border-radius:999px;padding:2px 8px}
.cl-hero{position:relative;flex:1;display:flex;align-items:center;justify-content:space-between;gap:10px}
.cl-copy{display:grid;gap:8px;justify-items:start}
.cl h4{margin:0;max-width:150px;font:800 20px/1.02 var(--display);letter-spacing:-.03em}
.cl-m{display:inline-block;overflow:hidden;vertical-align:top}
.cl-m>span{display:inline-block;animation:cl-w 6s cubic-bezier(.2,.7,.2,1) infinite;animation-delay:calc(var(--i)*90ms)}
.cl-btn{border:0;border-radius:999px;padding:5px 11px;font:700 11px var(--body);background:#fff;color:#0c0a1c}
.cl-orb{width:64px;height:64px;flex:none;border-radius:50%;margin-right:6px;background:radial-gradient(circle at 35% 30%,#fff,#d9d4ff 14%,#8f7fe0 48%,#2a2060);box-shadow:inset 0 0 0 1px rgba(255,255,255,.5),0 8px 30px rgba(140,120,255,.5);animation:cl-f 5s ease-in-out infinite}
.cl-row{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.cl-row i{height:22px;border-radius:7px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);animation:cl-up 6s cubic-bezier(.2,.7,.2,1) infinite}
.cl-row i:nth-child(2){animation-delay:.08s}.cl-row i:nth-child(3){animation-delay:.16s}
@keyframes cl-d{to{transform:translate(25%,20%) scale(1.2)}}
@keyframes cl-w{0%{transform:translateY(110%)}14%,85%{transform:none}100%{transform:none}}
@keyframes cl-f{50%{transform:translateY(-7px)}}
@keyframes cl-up{0%,18%{opacity:0;transform:translateY(14px)}32%,100%{opacity:1;transform:none}}
`
});
