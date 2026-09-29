Whatsit.addPattern({id:'stepper',name:'Stepper',aka:['Wizard','Progress steps','Multi-step form'],cat:'Navigation',
  say:'Numbered steps joined by a line, showing how far along you are.',
  keys:'steps step 1 2 3 numbered progress wizard checkout multi page form next back line circles onboarding signup',
  use:'A long process split into stages, like checkout or sign-up.',
  avoid:'Tasks with only one or two fields.',
  confuse:[['tabs','Tabs can be visited in any order. A stepper goes in sequence.'],['breadcrumb','Breadcrumbs show your place in a site. A stepper shows progress through a task.']],
  parts:[['Step','A numbered circle with a label'],['Connector','The line joining steps'],['States','Complete, current and upcoming'],['Back / Next','Buttons to move between steps']],
  opts:[['Validate before Next','each step validated before Next is allowed',1],['Checkmark on completed steps','completed steps shown with a checkmark',1],['Save progress','progress saved so a refresh doesn\'t lose it',0]],
  a11y:'aria-current="step" on the active step',
  html:()=>`<div class="d-step"><div class="steps"><div class="st"><span>1</span>Cart</div><div class="conn"></div><div class="st"><span>2</span>Address</div><div class="conn"></div><div class="st"><span>3</span>Pay</div></div><div style="display:flex;gap:8px"><button class="dbtn ghost b">Back</button><button class="dbtn n">Next</button></div></div>`,
  init(r){const s=[...r.querySelectorAll('.st')],c=[...r.querySelectorAll('.conn')];let i=1;const go=n=>{i=Math.max(0,Math.min(2,n));s.forEach((x,k)=>{x.className='st'+(k<i?' done':k===i?' cur':'');x.firstElementChild.textContent=k<i?'✓':k+1;});c.forEach((x,k)=>x.classList.toggle('done',k<i));};r.querySelector('.b').onclick=()=>go(i-1);r.querySelector('.n').onclick=()=>go(i+1);go(1);},
  css:`
.d-step{width:90%;max-width:320px;display:flex;flex-direction:column;gap:14px;align-items:center}
.steps{display:flex;align-items:center;width:100%}
.st{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:12px;color:var(--muted)}
.st span{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;border:2px solid var(--line);background:var(--demo-2);font-weight:700;font-size:13px}
.st.cur span{border-color:var(--accent);color:var(--accent)}
.st.done span{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.st.cur{color:var(--ink);font-weight:700}
.conn{flex:1;height:2px;background:var(--line);margin:0 4px 18px}
.conn.done{background:var(--accent)}
`
});
