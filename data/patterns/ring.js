Whatsit.addPattern({id:'ring',name:'Progress ring',aka:['Circular progress','Radial progress','Donut'],cat:'Feedback',
  say:'A circle that fills around its edge to show progress, with the number in the middle.',
  keys:'circle ring round progress percent donut radial fill goal completion circular',
  use:'Goals and completion in small spaces: profile completeness, daily steps, storage used.',
  avoid:'Comparing several values side by side. Bars are easier to compare.',
  confuse:[['progress','A progress bar is straight and suits wide spaces. A ring suits square spaces.'],['spinner','A spinner just spins. A ring fills to show an amount.']],
  parts:[['Track','The faint full circle'],['Arc','The colored part that fills'],['Label','The number in the middle'],['Caption','What it measures']],
  opts:[['Number in the middle','the percentage shown in the middle',1],['Animate on load','the arc filling smoothly when it first appears',1],['Color by level','the color moving from red to amber to green as it fills',0]],
  a11y:'role="progressbar" with aria-valuenow, and the value available as text',
  html:()=>`<div class="rg-w"><div class="rg" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" aria-label="Profile complete"><svg viewBox="0 0 100 100" class="rg-s" aria-hidden="true"><circle cx="50" cy="50" r="42" class="rg-t"/><circle cx="50" cy="50" r="42" class="rg-a"/></svg><div class="rg-l"><b>0%</b><small>Profile complete</small></div></div><button class="dbtn ghost rg-b">+10%</button></div>`,
  init(r){const a=r.querySelector('.rg-a'),b=r.querySelector('.rg-l b'),g=r.querySelector('.rg'),C=2*Math.PI*42;let v=70;
    a.style.strokeDasharray=C;a.style.strokeDashoffset=C;
    const set=()=>{a.style.strokeDashoffset=C*(1-v/100);b.textContent=v+'%';g.setAttribute('aria-valuenow',v);};
    requestAnimationFrame(()=>requestAnimationFrame(set));r.querySelector('.rg-b').onclick=()=>{v=v>=100?0:v+10;set();};},
  css:`
.rg-w{display:flex;align-items:center;gap:16px}
.rg{position:relative;width:118px;height:118px}
.rg-s{width:100%;height:100%;rotate:-90deg}
.rg-t,.rg-a{fill:none;stroke-width:10}
.rg-t{stroke:color-mix(in srgb,var(--ink) 12%,transparent)}
.rg-a{stroke:var(--accent);stroke-linecap:round;transition:stroke-dashoffset .6s ease}
.rg-l{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.rg-l b{font:800 24px var(--display)}
.rg-l small{font-size:9px;color:var(--muted);max-width:70px;line-height:1.2}
.rg-b{padding:6px 10px;font-size:12px}
`
});
