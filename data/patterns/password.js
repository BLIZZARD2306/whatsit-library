Whatsit.addPattern({id:'password',name:'Password field',aka:['Password input','Strength meter','Show password'],cat:'Forms',
  say:'A hidden-text box with a show/hide button and a meter that rates how strong the password is.',
  keys:'password hidden dots show hide eye strength meter weak strong secure sign up requirements rules',
  use:'Sign-up and change-password forms.',
  avoid:'Login forms. A strength meter only helps when someone is choosing a new password.',
  confuse:[['input','A password field is a text input that hides what you type and adds show/hide and a strength meter.'],['otp','A code input takes a short code sent to you. A password field takes a secret you choose.']],
  parts:[['Input','Shows dots instead of letters'],['Show / hide','The button that reveals the text'],['Strength meter','Bars that fill from weak to strong'],['Rules','A checklist like “8+ characters”']],
  opts:[['Show / hide button','a button that shows or hides the password',1],['Strength meter','a four-step strength meter labelled Weak, Fair, Good and Strong',1],['Rules checklist','a checklist (8+ characters, a number, a symbol) that ticks as each rule is met',1]],
  a11y:'a visible label, autocomplete="new-password", and the strength announced through aria-live',
  html:()=>`<div class="pw"><div class="pw-f"><input type="password" value="sunny24" aria-label="New password" autocomplete="new-password"><button class="pw-e" aria-label="Show password">Show</button></div><div class="pw-m" aria-hidden="true"><i></i><i></i><i></i><i></i></div><small class="pw-l" aria-live="polite"></small></div>`,
  init(r){const w=r.querySelector('.pw'),i=w.querySelector('input'),e=w.querySelector('.pw-e'),l=w.querySelector('.pw-l'),L=['Type a password','Weak','Fair','Good','Strong'];
    const rate=()=>{const v=i.value;let s=0;if(v){s=1;if(v.length>=8)s++;if(/\d/.test(v)&&/[a-z]/i.test(v))s++;if(/[^a-z0-9]/i.test(v)||(/[a-z]/.test(v)&&/[A-Z]/.test(v)))s++;}
      w.className='pw s'+s;l.textContent=s?`Strength: ${L[s]}`+(s<4?' · add a symbol or more characters':''):L[0];};
    i.oninput=rate;e.onclick=()=>{const show=i.type==='password';i.type=show?'text':'password';e.textContent=show?'Hide':'Show';e.setAttribute('aria-label',show?'Hide password':'Show password');};rate();},
  css:`
.pw{width:82%;max-width:260px;display:flex;flex-direction:column;gap:6px}
.pw-f{display:flex;align-items:center;border:1px solid var(--line);background:var(--demo-2);border-radius:8px;padding-right:8px}
.pw-f:focus-within{outline:2px solid var(--accent)}
.pw-f input{flex:1;min-width:0;border:0;background:transparent;padding:9px 12px;font-size:14px;outline:none}
.pw-e{border:0;background:none;font-size:12px;font-weight:700;color:var(--accent);cursor:pointer}
.pw-m{display:flex;gap:4px}
.pw-m i{flex:1;height:5px;border-radius:3px;background:color-mix(in srgb,var(--ink) 12%,transparent);transition:background .2s}
.pw.s1 .pw-m i:nth-child(-n+1){background:var(--danger)}
.pw.s2 .pw-m i:nth-child(-n+2){background:var(--warn)}
.pw.s3 .pw-m i:nth-child(-n+3){background:#7DAA3C}
.pw.s4 .pw-m i{background:var(--ok)}
.pw-l{font-size:12px;color:var(--muted)}
`
});
