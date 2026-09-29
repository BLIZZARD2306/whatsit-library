Whatsit.addPattern({id:'alert',name:'Alert banner',aka:['Banner','Callout','Notice'],cat:'Feedback',
  say:'A colored strip with an important message that stays until dismissed.',
  keys:'banner message warning notice yellow red strip top info announcement trial expires alert callout important dismiss',
  use:'Important news people must see: a trial ending, an outage, a failed payment.',
  avoid:'Quick confirmations. Use a toast.',
  confuse:[['toast','A toast leaves after a few seconds. A banner stays until dismissed or fixed.'],['modal','A modal blocks the page. A banner sits in the page.']],
  parts:[['Icon','Shows the type at a glance'],['Message','One or two short sentences'],['Action','A link like “Upgrade”'],['Dismiss','The × button'],['Variant','Info, success, warning or error colors']],
  opts:[['Info / success / warning / error','info, success, warning and error variants with matching icons',1],['Dismissible','an × button that hides it and remembers the choice',1],['Full-width site banner','a version that spans the top of the whole site',0]],
  a11y:'role="alert" for urgent messages, role="status" for calm ones',
  html:()=>`<div class="alw"><div class="alert" role="status"><b>!</b><span>Your trial ends in 3 days.</span><a href="#" onclick="return false">Upgrade</a><button aria-label="Dismiss">×</button></div></div>`,
  init(r){const w=r.querySelector('.alw'),o=w.innerHTML;const bind=()=>{w.querySelector('.alert button').onclick=()=>{w.innerHTML='<button class="dbtn ghost">Show banner again</button>';w.firstChild.onclick=()=>{w.innerHTML=o;bind();};};};bind();},
  css:`
.alw{width:92%;display:grid;place-items:center}
.alert{width:100%;display:flex;align-items:center;gap:10px;background:color-mix(in srgb,var(--warn) 14%,var(--demo-2));border:1px solid color-mix(in srgb,var(--warn) 40%,transparent);border-radius:10px;padding:10px 12px;font-size:13px}
.alert b{width:22px;height:22px;border-radius:50%;background:var(--warn);color:var(--demo-2);display:grid;place-items:center;flex:none}
.alert span{flex:1}
.alert a{color:var(--ink);font-weight:700}
.alert button{border:0;background:none;cursor:pointer;font-size:16px;color:var(--muted)}
`
});
