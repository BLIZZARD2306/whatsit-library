Whatsit.addPattern({id:'otp',name:'Code input',aka:['OTP input','Verification code','PIN input'],cat:'Forms',
  say:'A row of single-digit boxes for a code sent by text or email.',
  keys:'code verification otp pin digits boxes sms text six one time password two factor 2fa',
  use:'Sign-in codes, phone verification and two-factor login.',
  avoid:'Long passwords. Use a normal password field.',
  confuse:[['input','A text input takes any text. A code input splits a fixed-length code into boxes.']],
  parts:[['Digit box','One character'],['Auto-advance','Jumps to the next box after each digit'],['Paste support','Pasting fills every box'],['Resend link','“Resend code”, often with a countdown']],
  opts:[['Auto-advance and Backspace','jumping forward after each digit and back on Backspace',1],['Paste the whole code','pasting a full code into any box fills all of them',1],['Resend with countdown','a “Resend code” link that unlocks after 30 seconds',1]],
  a11y:'autocomplete="one-time-code" so phones can fill it, and one label for the whole group',
  html:()=>`<div class="otp-w"><div class="otp" role="group" aria-label="Verification code">${'<input inputmode="numeric" maxlength="1" aria-label="Digit">'.repeat(6)}</div><span>Enter the 6-digit code we texted you</span></div>`,
  init(r){const b=[...r.querySelectorAll('.otp input')],s=r.querySelector('.otp-w>span');const done=()=>{if(b.every(y=>y.value))s.textContent='✓ Code complete';};b.forEach((x,i)=>{x.oninput=()=>{x.value=x.value.replace(/\D/g,'').slice(-1);if(x.value&&b[i+1])b[i+1].focus();done();};x.onkeydown=e=>{if(e.key==='Backspace'&&!x.value&&b[i-1])b[i-1].focus();};x.onpaste=e=>{const t=((e.clipboardData&&e.clipboardData.getData('text'))||'').replace(/\D/g,'').slice(0,6);if(!t)return;e.preventDefault();t.split('').forEach((c,k)=>b[k].value=c);b[t.length-1].focus();done();};});},
  css:`
.otp-w{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:12px;color:var(--muted)}
.otp{display:flex;gap:6px}
.otp input{width:32px;height:40px;text-align:center;font:700 18px var(--body);border:1px solid var(--line);border-radius:8px;background:var(--demo-2);padding:0}
.otp input:focus{outline:2px solid var(--accent)}
`
});
