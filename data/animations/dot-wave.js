Whatsit.addAnimation({id:'dot-wave',name:'Dot grid wave',aka:['Ripple dots','Dot matrix wave','Halftone wave','Interactive dot field'],kind:'Backgrounds',
  say:'A grid of tiny dots that swell and fade in a slow wave, rippling outward where your cursor is.',
  keys:'dots grid wave ripple pulse points pattern halftone matrix tech background moving dots cursor ripple',
  use:'Tech, AI and developer-tool sites that want a precise, “engineered” background.',
  avoid:'Soft or organic brands, where a gradient or photo fits better.',
  tech:'One <canvas> drawn with the 2D API in a requestAnimationFrame loop. No libraries.',
  parts:[['Grid','Evenly spaced dots, 14–22px apart'],['Wave','A sine wave travelling across the grid that changes dot size and brightness'],['Cursor ripple','A circular bump centred on the pointer'],['Vignette','The edges fading out so the grid doesn’t end abruptly']],
  motion:[['Wave speed','about one full wave every 3s'],['Dot size','1px at rest, up to 3px at the crest'],['Ripple radius','about 120px around the cursor, easing back over 0.4s'],['Frame rate','tied to requestAnimationFrame, paused off screen']],
  build:[
    'Add a canvas that fills the section and size it with devicePixelRatio so dots stay sharp.',
    'Each frame, loop over a grid of points and work out a wave value from sin(distance from a corner − time).',
    'Add a ripple term for points near the pointer, fading with distance.',
    'Draw each dot as a small circle whose radius and opacity follow the combined value.',
    'Multiply by a radial vignette so the grid fades out at the edges.',
    'Resize the canvas on ResizeObserver and pause the loop when it scrolls off screen.',
  ],
  opts:[['Cursor ripple','dots near the cursor swelling in a ripple',1],['Brand-coloured crests','the brightest dots tinted with my brand colour',1],['Edge vignette','the grid fading out toward the edges',1],['Click to pulse','a click sending a ring-shaped pulse outward',0]],
  perf:'Cap the grid to about 3,000 dots, skip off-screen frames, and draw at most at device pixel ratio 2.',
  a11y:'the canvas aria-hidden, no information carried by the animation, and a single still frame under prefers-reduced-motion',
  html:()=>`<canvas class="dw" aria-hidden="true"></canvas>`,
  init(root){
    const c=root.querySelector('.dw');let mx=-999,my=-999,pull=0;
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;pull=1;});
    c.addEventListener('pointerleave',()=>{pull=0;});
    let ease=0;
    Whatsit.loop(root,t=>{
      const [x,w,h]=Whatsit.fitCanvas(c);ease+=(pull-ease)*.08;
      x.fillStyle='#07090d';x.fillRect(0,0,w,h);
      const gap=14,cx=w/2,cy=h/2,maxd=Math.hypot(cx,cy);
      for(let gy=gap/2;gy<h;gy+=gap)for(let gx=gap/2;gx<w;gx+=gap){
        let v=(Math.sin(Math.hypot(gx,gy)*.035-t*2.1)+1)/2;
        const md=Math.hypot(gx-mx,gy-my);if(md<120)v+=(1-md/120)*ease*1.2;
        const vig=1-Math.pow(Math.hypot(gx-cx,gy-cy)/maxd,2);
        const a=Math.min(1,(.12+v*.8)*vig);
        x.fillStyle=v>.95?`rgba(110,230,200,${a})`:`rgba(200,214,235,${a})`;
        x.beginPath();x.arc(gx,gy,.8+Math.min(v,1.4)*1.5,0,6.283);x.fill();
      }
    });
  },
  css:`
.dw{position:absolute;inset:0;width:100%;height:100%;display:block}
`
});
