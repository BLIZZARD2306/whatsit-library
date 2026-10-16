Whatsit.addAnimation({id:'tilt-card',name:'3D tilt card',aka:['Hover tilt','Holographic card','Perspective card','Glare card'],kind:'3D',
  say:'A card that tips toward your mouse in 3D, with a shiny glare sliding across it like light on a trading card.',
  keys:'card tilts follows mouse 3d hover rotate shiny glare holographic trading card perspective tip lean',
  use:'Product cards, pricing highlights, profile or membership cards, and collectibles.',
  avoid:'Cards packed with text or buttons; the motion makes them harder to read and click.',
  tech:'CSS 3D transforms (perspective + rotateX/rotateY) set from pointer position, plus a gradient glare layer.',
  parts:[['Stage','The parent with perspective set (about 800px)'],['Card','The element that rotates'],['Glare','A light gradient on top that moves opposite the tilt'],['Depth layers','Optional inner elements lifted with translateZ so they float above the card'],['Shadow','A soft shadow that shifts with the tilt']],
  motion:[['Max tilt','12–15° on each axis'],['Follow','easing toward the target at about 10% per frame'],['Return','springing back flat over 0.5s on leave'],['Glare','opacity 0 → 0.35 as the tilt grows']],
  build:[
    'Wrap the card in a stage with perspective: 800px; give the card transform-style: preserve-3d.',
    'On pointermove, convert the pointer to −1…1 across the card and set rotateY(x × 14deg) rotateX(−y × 14deg).',
    'Ease the rotation each frame so it feels weighty, not twitchy.',
    'Add a glare layer: a linear or radial white gradient whose position follows the pointer and whose opacity grows with the tilt.',
    'Lift inner elements (logo, badge) with translateZ(30–50px) for parallax inside the card.',
    'On pointerleave, ease back to flat; on touch devices, show the card flat.',
  ],
  opts:[['Glare highlight','a glossy glare that moves across the card',1],['Floating inner layers','inner elements lifted in 3D so they float above the card',1],['Holographic rainbow','a faint rainbow foil sheen that shifts with the angle',0],['Moving shadow','a shadow that shifts opposite the tilt',1]],
  perf:'Transform only; one listener per card (or one shared); disable on touch and coarse pointers.',
  a11y:'the card fully usable without hover, focus styles that don’t depend on the tilt, and no tilt under prefers-reduced-motion',
  html:()=>`<div class="tc"><div class="tc-c"><span class="tc-b">PRO</span><b>Member</b><small>No. 0042 · 2026</small><i class="tc-g" aria-hidden="true"></i></div></div>`,
  init(root){
    const st=root.querySelector('.tc'),c=st.querySelector('.tc-c'),g=c.querySelector('.tc-g');let tx=0,ty=0,x=0,y=0,live=false;
    st.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();tx=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));ty=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));live=true;});
    st.addEventListener('pointerleave',()=>{live=false;});
    Whatsit.loop(root,t=>{
      if(!live){tx=Math.sin(t*.9)*.6;ty=Math.sin(t*.6+1)*.4;}
      x+=(tx-x)*.1;y+=(ty-y)*.1;
      c.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg)`;
      g.style.background=`radial-gradient(circle at ${50+x*45}% ${50+y*45}%,rgba(255,255,255,.55),transparent 55%)`;
      g.style.opacity=.15+Math.hypot(x,y)*.3;
      c.style.boxShadow=`${-x*14}px ${18-y*8}px 30px -12px rgba(0,0,0,.45)`;
    });
  },
  css:`
.tc{perspective:800px;display:grid;place-items:center}
.tc-c{position:relative;width:190px;height:118px;border-radius:14px;padding:14px 16px;transform-style:preserve-3d;background:linear-gradient(135deg,#232a3d,#3b2d5c 55%,#1e6b7a);color:#fff;display:flex;flex-direction:column;justify-content:flex-end;gap:2px}
.tc-c b{font:800 22px var(--display);letter-spacing:-.02em;transform:translateZ(30px)}
.tc-c small{font:500 11px var(--mono);opacity:.7;transform:translateZ(20px)}
.tc-b{position:absolute;top:12px;left:16px;font:700 11px var(--mono);letter-spacing:.14em;padding:3px 7px;border-radius:5px;background:rgba(255,255,255,.16);transform:translateZ(40px)}
.tc-g{position:absolute;inset:0;border-radius:inherit;pointer-events:none;mix-blend-mode:soft-light}
`
});
