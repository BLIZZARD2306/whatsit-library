Whatsit.addPattern({id:'tour',name:'Product tour',aka:['Coach marks','Walkthrough','Guided tour','Onboarding tooltips'],cat:'Overlays',
  say:'A series of small bubbles that point at parts of the screen one at a time, with Next and Skip.',
  keys:'first time guide bubbles point at buttons next skip step 1 of 3 highlight walkthrough tutorial show me around spotlight coach',
  use:'Showing new users the three or four things they need to get started, or pointing out a new feature.',
  avoid:'Explaining everything. People skip long tours. If a screen needs seven steps, simplify the screen.',
  confuse:[['tooltip','A tooltip appears when you hover and explains one thing. A tour runs by itself, step by step.'],['stepper','A stepper tracks progress through a form. A tour points at things that are already on the screen.'],['modal','A modal blocks the page for one decision. A tour leaves the page visible and walks across it.']],
  parts:[['Spotlight','The highlight around the thing being explained'],['Bubble','The small box with the explanation'],['Arrow','The point that connects the bubble to its target'],['Step counter','“1 of 3”'],['Skip','The way out at any step']],
  opts:[['Step counter','a step counter like “1 of 3”',1],['Skip and Back','a Skip button on every step and a Back button after the first',1],['Dim the rest','everything except the highlighted element dimmed',1],['Show once','the tour shown only on the first visit, with a way to replay it from the help menu',0]],
  a11y:'focus moved into each bubble, Escape to end the tour, and each step announced to screen readers',
  html:()=>`<div class="pto"><div class="pto-bar"><span class="pto-t on">Search</span><span class="pto-t">Share</span><span class="pto-t">Export</span></div><div class="pto-tip" role="dialog" aria-label="Product tour"><p class="pto-x">Find anything in your workspace.</p><div class="pto-f"><small>1 of 3</small><span><button class="pto-s">Skip</button><button class="dbtn pto-n">Next</button></span></div></div><button class="dbtn ghost pto-r" hidden>Replay tour</button></div>`,
  init(r){const w=r.querySelector('.pto'),t=[...r.querySelectorAll('.pto-t')],tip=r.querySelector('.pto-tip'),x=r.querySelector('.pto-x'),c=r.querySelector('.pto-f small'),n=r.querySelector('.pto-n'),re=r.querySelector('.pto-r');const steps=['Find anything in your workspace.','Invite people with a link.','Download your work as a PDF.'];let i=0;const paint=()=>{const on=i>=0;w.classList.toggle('off',!on);tip.hidden=!on;re.hidden=on;t.forEach((y,k)=>y.classList.toggle('on',k===i));if(on){x.textContent=steps[i];c.textContent=`${i+1} of ${steps.length}`;n.textContent=i===steps.length-1?'Done':'Next';tip.style.setProperty('--x',(i*2+1)*100/6+'%');}};n.onclick=()=>{i=i===steps.length-1?-1:i+1;paint();};r.querySelector('.pto-s').onclick=()=>{i=-1;paint();};re.onclick=()=>{i=0;paint();};paint();},
  css:`
.pto{width:100%;display:grid;gap:12px;justify-items:center}
.pto-bar{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
.pto-t{text-align:center;padding:7px 4px;border-radius:8px;background:var(--demo-2);border:1px solid var(--line);font-size:12px;opacity:.4;transition:opacity .2s,box-shadow .2s}
.pto-t.on{opacity:1;box-shadow:0 0 0 3px var(--accent)}
.pto.off .pto-t{opacity:1}
.pto-tip{position:relative;width:100%;background:var(--ink);color:var(--demo);border-radius:10px;padding:10px 12px}
.pto-tip::before{content:"";position:absolute;top:-5px;left:var(--x,16.6%);width:10px;height:10px;background:inherit;transform:translateX(-50%) rotate(45deg);transition:left .2s}
.pto-tip p{margin:0 0 8px;font-size:12px}
.pto-f{display:flex;justify-content:space-between;align-items:center}
.pto-f small{opacity:.7;font-size:11px}
.pto-f button{padding:4px 10px;font-size:11px}
.pto-s{border:0;background:transparent;color:inherit;opacity:.8;cursor:pointer}
`
});
