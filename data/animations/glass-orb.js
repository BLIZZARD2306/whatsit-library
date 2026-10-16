Whatsit.addAnimation({id:'glass-orb',name:'Iridescent orb',aka:['Glass sphere','Holographic orb','Floating orb','Bubble orb'],kind:'3D',
  say:'A glossy, soap-bubble-like ball with shifting rainbow colours that floats gently up and down.',
  keys:'shiny ball orb sphere glass bubble rainbow holographic iridescent floating glowing ai orb blob',
  use:'AI assistants and voice products (as the “thinking” or speaking visual), and hero centrepieces.',
  avoid:'Places where it has to mean something specific without a label; on its own it’s decoration.',
  tech:'CSS only: layered radial and conic gradients, blur and keyframes. A WebGL shader or Three.js with a transmission material is the high-end upgrade.',
  parts:[['Body','The round base with a deep inner gradient'],['Colour film','A rotating conic gradient that gives the rainbow sheen'],['Highlight','A small bright spot near the top-left, like a reflection'],['Rim light','A thin bright edge around the outside'],['Shadow','A soft blurred ellipse under it that shrinks as it floats up'],['Float','A slow up-and-down bob']],
  motion:[['Float','6s up-and-down loop, about 8px of travel'],['Colour spin','one turn of the colour film every 9–12s'],['Shadow','scaling 1 → 0.8 as the orb rises'],['Breathing (optional)','scale 1 → 1.04 to show “listening” or “speaking”']],
  build:[
    'Make a square element with border-radius: 50% and a radial-gradient body (light centre, deep edges).',
    'Add a pseudo-element with a conic-gradient of 4–6 soft hues, blurred and blended with mix-blend-mode: screen or overlay, rotating slowly.',
    'Add a small white radial highlight at the top-left and an inset box-shadow for the rim light.',
    'Put a blurred dark ellipse beneath it and animate it in sync with the float.',
    'Animate the orb’s translateY in a gentle loop; optionally scale it with audio or a state prop for speaking/listening.',
  ],
  opts:[['Floating bob','a gentle up-and-down float',1],['Rotating rainbow film','a slowly rotating rainbow sheen',1],['Ground shadow','a soft shadow underneath that reacts to the float',1],['Pulse with a state','a breathing pulse when a “speaking” or “listening” state is on',0]],
  perf:'Animate transform only; keep blur radius moderate; one orb per screen.',
  a11y:'the orb aria-hidden or given a role="img" label if it shows a state, state changes also shown in text, and no motion under prefers-reduced-motion',
  html:()=>`<div class="gorb" aria-hidden="true"><div class="gorb-o"></div><div class="gorb-s"></div></div>`,
  css:`
.gorb{position:relative;width:120px;height:150px;display:grid;justify-items:center}
.gorb-o{position:relative;width:104px;height:104px;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 35% 30%,#ffffff 0,#e8e6ff 12%,#8f86d9 45%,#2c235e 100%);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.55),inset -10px -16px 28px rgba(20,10,60,.55),0 10px 40px rgba(130,110,255,.35);animation:gorb-f 6s ease-in-out infinite}
.gorb-o::before{content:"";position:absolute;inset:-30%;background:conic-gradient(from 0deg,#ff9ad5,#9ae6ff,#b6ffb0,#ffe59a,#c7a6ff,#ff9ad5);filter:blur(14px);mix-blend-mode:overlay;opacity:.9;animation:gorb-r 10s linear infinite}
.gorb-o::after{content:"";position:absolute;left:20%;top:14%;width:30%;height:22%;border-radius:50%;background:radial-gradient(rgba(255,255,255,.95),transparent 70%);filter:blur(1px)}
.gorb-s{position:absolute;bottom:4px;width:70px;height:12px;border-radius:50%;background:rgba(30,20,70,.35);filter:blur(5px);animation:gorb-sh 6s ease-in-out infinite}
@keyframes gorb-f{50%{transform:translateY(-10px)}}
@keyframes gorb-r{to{transform:rotate(1turn)}}
@keyframes gorb-sh{50%{transform:scale(.78);opacity:.6}}
`
});
