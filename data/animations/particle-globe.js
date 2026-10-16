Whatsit.addAnimation({id:'particle-globe',name:'Particle globe',aka:['Dot sphere','Point cloud globe','Particle sphere','Rotating globe'],kind:'3D',
  say:'Hundreds of glowing dots arranged on a sphere that slowly spins, nearer dots brighter and bigger.',
  keys:'3d sphere made of dots globe spinning particles points planet rotating ball network data world',
  use:'Global, network, AI or data products, and hero visuals that need depth without heavy 3D files.',
  avoid:'Very low-end devices as a must-have, or pages that already have a busy hero.',
  tech:'Canvas 2D with simple 3D maths (rotate, then perspective-project). Three.js Points is an optional upgrade for thousands of particles.',
  parts:[['Points','Dots spread evenly over a sphere (a Fibonacci spiral gives an even spread)'],['Rotation','A slow spin around the vertical axis, with a slight tilt'],['Projection','Perspective that makes near dots bigger and far dots smaller'],['Depth shading','Far dots fading out so the sphere reads as round'],['Pointer nudge','Dragging or moving the cursor adding a little spin']],
  motion:[['Spin','one full turn every 20–30s'],['Tilt','15–25° toward the viewer'],['Dot size','0.6px far, 2.4px near'],['Pointer','up to 0.5 extra radians of spin, easing back']],
  build:[
    'Generate 400–1,200 points on a unit sphere with a Fibonacci spiral (golden-angle spacing).',
    'Each frame, rotate every point around the Y axis by the time-based angle, then tilt around X.',
    'Project with perspective: scale = focal / (focal + z), screen x/y = centre + point × radius × scale.',
    'Sort or simply draw with size and opacity based on z so the near side is bright and the far side fades.',
    'Add a soft radial glow behind the sphere and let pointer movement add extra spin that eases away.',
    'Size the canvas with devicePixelRatio and pause when off screen.',
  ],
  opts:[['Depth fade','far-side dots fading out for a sense of depth',1],['Glow behind','a soft glow behind the sphere',1],['Drag to spin','dragging (or moving the pointer) to spin it faster',1],['Connecting lines','faint lines between nearby dots like a network',0]],
  perf:'Keep under about 1,500 points on canvas; precompute the sphere once; cap pixel ratio at 2; pause off screen.',
  a11y:'the canvas aria-hidden with a text alternative if it carries meaning, and a still frame under prefers-reduced-motion',
  html:()=>`<canvas class="pgb" aria-hidden="true"></canvas>`,
  init(root){
    const c=root.querySelector('.pgb'),N=520,pts=[];
    for(let i=0;i<N;i++){const y=1-(i/(N-1))*2,r=Math.sqrt(1-y*y),a=i*2.39996;pts.push([Math.cos(a)*r,y,Math.sin(a)*r]);}
    let push=0,ext=0,lx=null;
    c.addEventListener('pointermove',e=>{if(lx!==null)push+=(e.clientX-lx)*.004;lx=e.clientX;});
    c.addEventListener('pointerleave',()=>{lx=null;});
    Whatsit.loop(root,t=>{
      const [x,w,h]=Whatsit.fitCanvas(c);ext+=push;push*=.9;
      x.clearRect(0,0,w,h);
      const R=Math.min(w,h)*.38,cx=w/2,cy=h/2,ang=t*.25+ext,tilt=.35,ca=Math.cos(ang),sa=Math.sin(ang),ct=Math.cos(tilt),st=Math.sin(tilt);
      const g=x.createRadialGradient(cx,cy,R*.2,cx,cy,R*1.5);g.addColorStop(0,'rgba(90,140,255,.22)');g.addColorStop(1,'rgba(90,140,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);
      for(const [px,py,pz] of pts){
        const x1=px*ca+pz*sa,z1=-px*sa+pz*ca,y2=py*ct-z1*st,z2=py*st+z1*ct;
        const s=2.6/(2.6+z2),d=(1-z2)/2;
        x.fillStyle=`rgba(${170+d*60|0},${200+d*40|0},255,${.12+d*.85})`;
        x.beginPath();x.arc(cx+x1*R*s,cy+y2*R*s,.5+d*1.9,0,6.283);x.fill();
      }
    });
  },
  css:`
.pgb{position:absolute;inset:0;width:100%;height:100%;display:block;background:radial-gradient(ellipse at 50% 60%,#121a33,#05070d 70%)}
`
});
