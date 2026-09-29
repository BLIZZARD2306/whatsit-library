Whatsit.addPattern({id:'input',name:'Text input',aka:['Text field','Input box','Floating label'],cat:'Forms',
  say:'A box you type into, with a label saying what goes there.',
  keys:'text box type field input form email name password label placeholder write enter',
  use:'Every form: names, emails, search, messages.',
  avoid:'Choosing from fixed options. Use radios or a select menu.',
  confuse:[['dropdown','A select menu picks from a list. A text input accepts anything typed.'],['otp','A code input splits a fixed-length code into boxes.']],
  parts:[['Label','What goes in the box'],['Placeholder','Grey example text inside'],['Helper text','The hint below the box'],['Error message','Red text when the value is wrong'],['Floating label','A label that shrinks to the top when you type']],
  opts:[['Floating label','a label that moves above the text when the field is focused or filled',1],['Inline validation','checking the value when the field loses focus and showing an error below it',1],['Show / hide password','an eye button to show or hide a password',0]],
  a11y:'a visible label linked to the input, with errors linked through aria-describedby',
  html:u=>`<div class="fl-w"><label class="fl"><input id="in${u}" type="email" placeholder=" " autocomplete="off"><span>Email address</span></label><small>We’ll never share it.</small></div>`,
  init(r){const w=r.querySelector('.fl-w'),i=w.querySelector('input'),s=w.querySelector('small');i.onblur=()=>{const bad=i.value&&!/^\S+@\S+\.\S+$/.test(i.value);w.classList.toggle('err',bad);s.textContent=bad?'Enter an email like name@example.com':'We’ll never share it.';};},
  css:`
.fl-w{width:80%;max-width:260px;display:flex;flex-direction:column;gap:4px}
.fl{position:relative;display:block}
.fl input{width:100%;border:1px solid var(--line);background:var(--demo-2);border-radius:8px;padding:18px 12px 6px;font-size:14px}
.fl span{position:absolute;left:12px;top:50%;translate:0 -50%;color:var(--muted);font-size:14px;pointer-events:none;transition:.15s}
.fl input:focus+span,.fl input:not(:placeholder-shown)+span{top:9px;translate:0 0;font-size:11px;color:var(--accent)}
.fl input:focus{outline:2px solid var(--accent);outline-offset:-1px}
.fl-w small{color:var(--muted);font-size:12px}
.fl-w.err input{border-color:var(--danger)}
.fl-w.err small{color:var(--danger)}
`
});
