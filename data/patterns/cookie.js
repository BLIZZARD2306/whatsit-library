Whatsit.addPattern({id:'cookie',name:'Cookie banner',aka:['Consent banner','Cookie notice','Privacy banner'],cat:'Feedback',
  say:'A bar asking permission to use cookies, with accept, reject and settings choices.',
  keys:'cookie cookies consent privacy gdpr accept reject banner bottom bar tracking allow',
  use:'Sites that use analytics or marketing cookies and have visitors from places that require consent.',
  avoid:'Hiding the reject option or making it harder to find than accept. That breaks privacy rules in many places.',
  confuse:[['alert','An alert banner shares news. A cookie banner asks for a decision.'],['modal','A cookie banner usually sits at the edge of the page without blocking it.']],
  parts:[['Message','What the cookies are used for'],['Accept all','Allow every category'],['Reject all','Only the cookies the site needs to work'],['Settings','Choose categories one by one'],['Policy link','The link to the privacy policy']],
  opts:[['Equal Accept and Reject','“Accept all” and “Reject all” buttons of equal size and prominence',1],['Settings with categories','a settings view with toggles for analytics and marketing cookies',1],['Remember the choice','the choice saved so the banner doesn’t return on every visit',1]],
  a11y:'role="region" with a label, buttons reachable by keyboard, and no focus trap',
  html:()=>`<div class="ck-w"><div class="ck" role="region" aria-label="Cookie consent"><p>We use cookies to see how the site is used. <a href="#" onclick="return false">Privacy policy</a></p><div class="ck-b"><button class="dbtn ghost">Settings</button><button class="dbtn ghost">Reject all</button><button class="dbtn">Accept all</button></div></div></div>`,
  init(r){const w=r.querySelector('.ck-w'),o=w.innerHTML;const bind=()=>w.querySelectorAll('.ck-b button').forEach(b=>b.onclick=()=>{w.innerHTML=`<button class="dbtn ghost">✓ “${b.textContent}” saved · show again</button>`;w.firstChild.onclick=()=>{w.innerHTML=o;bind();};});bind();},
  css:`
.ck-w{width:94%;align-self:end;display:grid;place-items:center}
.ck{width:100%;background:var(--demo-2);border:1px solid var(--line);border-radius:12px;padding:10px 12px;font-size:12px;box-shadow:0 8px 20px rgba(0,0,0,.12)}
.ck p{margin:0 0 8px}
.ck a{color:var(--accent)}
.ck-b{display:flex;gap:6px;justify-content:flex-end;flex-wrap:wrap}
.ck-b .dbtn{padding:5px 10px;font-size:11px}
`
});
