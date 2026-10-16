Whatsit.addAnimation({id:'parallax-layers',name:'Parallax layers',aka:['Depth parallax','Layered hero','Mouse parallax','Multi-plane scene'],kind:'3D',
  say:'A scene made of flat layers that slide at different speeds as you move the mouse or scroll, so it feels deep.',
  keys:'layers move different speeds depth mountains background moves slower parallax 3d feeling mouse move scene hero illustration',
  use:'Illustrated heroes, game and travel sites, and storytelling pages.',
  avoid:'Pages where people need to read while scrolling; heavy parallax can make some people feel sick.',
  tech:'CSS transforms on stacked layers, driven by pointer position (and optionally scroll) from one small script.',
  parts:[['Sky / back layer','The furthest layer, which barely moves'],['Middle layers','Shapes in between, each moving a little more'],['Front layer','The nearest layer, which moves the most'],['Depth factor','A number per layer that sets how far it moves'],['Content','Text that sits at its own depth, usually near the front']],
  motion:[['Range','back layer ±4px, front layer ±28px'],['Smoothing','each layer easing toward its target at about 8% per frame'],['Scroll depth','layers moving at 0.2×–0.8× scroll speed (optional)'],['Idle','a slow sway when the pointer isn’t over it']],
  build:[
    'Stack 3–5 absolutely positioned layers (SVG or transparent images) in a container with overflow: hidden.',
    'Give each layer a data-depth value from 0.1 (far) to 1 (near).',
    'On pointermove, work out the pointer offset from the centre as −1…1 on each axis.',
    'Each frame, ease each layer toward translate(offset × depth × range) for smooth, slightly lagging motion.',
    'Make the layers a little larger than the container so their edges never show while moving.',
    'Optionally add scroll-based translateY per layer, and use a gentle idle sway when there’s no pointer.',
  ],
  opts:[['Follow the mouse','layers shifting with the mouse position',1],['Scroll depth','layers moving at different speeds while scrolling',0],['Idle sway','a slow automatic sway when nobody is pointing at it',1],['Tilt on phones','using the phone’s tilt (device orientation) on mobile, if permitted',0]],
  perf:'Move layers only with transform: translate3d; keep the layer count small; use one requestAnimationFrame loop for all layers.',
  a11y:'the scene decorative (aria-hidden) with real text outside it, and all movement off under prefers-reduced-motion',
  html:()=>`<div class="px" aria-hidden="true"><i class="px-sun" data-d=".15"></i><svg class="px-l" data-d=".3" viewBox="0 0 400 200" preserveAspectRatio="none"><path d="M0 140 L60 90 L110 120 L170 60 L240 115 L300 75 L360 110 L400 90 V200 H0Z" fill="#6f5aa8"/></svg><svg class="px-l" data-d=".6" viewBox="0 0 400 200" preserveAspectRatio="none"><path d="M0 160 L70 120 L140 150 L210 105 L290 150 L350 125 L400 140 V200 H0Z" fill="#3f3277"/></svg><svg class="px-l" data-d="1" viewBox="0 0 400 200" preserveAspectRatio="none"><path d="M0 180 Q100 150 200 175 T400 165 V200 H0Z" fill="#1d1640"/></svg></div><b class="px-t">Depth</b>`,
  init(root){
    const box=root.querySelector('.px'),ls=[...box.querySelectorAll('[data-d]')],host=root;let tx=0,ty=0,x=0,y=0,live=false;
    host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*2-1;ty=(e.clientY-r.top)/r.height*2-1;live=true;});
    host.addEventListener('pointerleave',()=>{live=false;});
    Whatsit.loop(root,t=>{
      if(!live){tx=Math.sin(t*.6)*.7;ty=Math.cos(t*.45)*.3;}
      x+=(tx-x)*.08;y+=(ty-y)*.08;
      ls.forEach(l=>{const d=+l.dataset.d;l.style.transform=`translate3d(${-x*d*26}px,${-y*d*12}px,0)`;});
    });
  },
  css:`
.px{position:absolute;inset:0;overflow:hidden;background:linear-gradient(#f6b38f,#e9879a 45%,#9f6ab7)}
.px-sun{position:absolute;left:58%;top:18%;width:52px;height:52px;border-radius:50%;background:#fff3d6;box-shadow:0 0 40px 10px rgba(255,236,190,.6)}
.px-l{position:absolute;left:-8%;bottom:-6%;width:116%;height:78%}
.px-t{position:relative;font:800 30px var(--display);letter-spacing:-.03em;color:#fff;text-shadow:0 3px 20px rgba(60,20,80,.45);translate:0 -18px}
`
});
