Whatsit.addAnimation({id:'mesh-gradient',name:'Mesh gradient',aka:['Animated gradient','Blob gradient','Aurora background','Liquid gradient'],kind:'Backgrounds',
  say:'Soft blobs of colour that slowly drift and melt into each other behind the content.',
  keys:'moving gradient colors blobs blurry glow background slowly shifting colours lava lamp aurora liquid soft',
  use:'Hero sections, sign-up pages and anywhere you want a calm, premium feel without a photo.',
  avoid:'Behind long text or dense data. The movement competes with reading.',
  tech:'CSS only: 3 to 5 blurred circles moved with keyframes, plus an SVG noise overlay. A WebGL shader is an optional upgrade for full-screen use.',
  parts:[['Base','A dark or deep solid colour that fills the section'],['Blobs','Large circles of colour, each on its own path'],['Blur','A heavy blur that melts the blobs together'],['Blend mode','“screen” so overlapping colours glow brighter'],['Grain','A faint noise texture on top that stops colour banding'],['Content layer','Your headline and buttons, above everything']],
  motion:[['Loop','14–22s per blob, each a different length so the pattern never visibly repeats'],['Direction','alternate (drift out and back)'],['Easing','ease-in-out'],['Travel','up to 30% of the section, scaling between 0.8 and 1.25'],['Blur','about 40% of a blob’s width']],
  build:[
    'Make a full-width section with position: relative, overflow: hidden and a deep base colour.',
    'Add 4 absolutely positioned circles about 60–70% of the section width, each a different brand colour.',
    'Blur them heavily (filter: blur) and set mix-blend-mode: screen so they glow where they overlap.',
    'Give each circle its own keyframe path (translate and scale), duration and negative delay so they start mid-motion.',
    'Lay an SVG fractal-noise texture over the top at 10–20% opacity to add grain.',
    'Put the content in a layer above with position: relative and z-index, and check text contrast against the brightest blob.',
  ],
  opts:[['Film grain overlay','a subtle film-grain noise overlay so the gradient doesn’t band',1],['Dark base colour','a near-black base colour so the blobs glow',1],['Follow the cursor','the blobs drifting gently toward the mouse pointer',0],['Pause off screen','pausing the animation while the section is scrolled out of view',1],['Colour props','the blob colours passed in as props or CSS variables so I can rebrand it',1]],
  perf:'Animate only transform; keep it to 3–5 blobs; add will-change: transform; on phones lower the blur radius or swap in a still image.',
  a11y:'the gradient aria-hidden, text contrast of at least 4.5:1 over every part of it, and the blobs frozen under prefers-reduced-motion',
  html:()=>`<div class="mg" aria-hidden="true"><i></i><i></i><i></i><i></i><b class="mg-n"></b></div><p class="mg-t">Calm, glowing colour</p>`,
  css:`
.mg{position:absolute;inset:0;overflow:hidden;background:#0e0b1f}
.mg i{position:absolute;width:68%;aspect-ratio:1;border-radius:50%;filter:blur(34px);mix-blend-mode:screen;opacity:.9;will-change:transform;animation:mg-a 16s ease-in-out infinite alternate}
.mg i:nth-child(1){background:#ff5f6d;left:-12%;top:-30%}
.mg i:nth-child(2){background:#6c4dff;right:-18%;top:-10%;animation-duration:19s;animation-delay:-6s;animation-name:mg-b}
.mg i:nth-child(3){background:#17c3b2;left:10%;bottom:-55%;animation-duration:22s;animation-delay:-11s}
.mg i:nth-child(4){background:#ffb347;right:5%;bottom:-50%;width:50%;animation-duration:14s;animation-delay:-3s;animation-name:mg-b}
.mg-n{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.mg-t{position:relative;margin:0;font:800 22px/1.1 var(--display);color:#fff;letter-spacing:-.02em;text-shadow:0 2px 18px rgba(0,0,0,.35)}
@keyframes mg-a{to{transform:translate(30%,22%) scale(1.25)}}
@keyframes mg-b{to{transform:translate(-26%,18%) scale(.8)}}
`
});
