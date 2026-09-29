Whatsit.addPattern({id:'number',name:'Number input',aka:['Quantity selector','Stepper input','Counter'],cat:'Forms',
  say:'A number sitting between minus and plus buttons.',
  keys:'plus minus quantity count number amount increase decrease cart items add remove qty guests',
  use:'Small whole numbers, like cart quantity or number of guests.',
  avoid:'Large or exact numbers. A plain text field is faster.',
  confuse:[['stepper','A stepper is a multi-step progress bar. This is a number control, which some people also call a “stepper input”.'],['range','A range slider suits rough values on a scale. A number input suits small exact counts.']],
  parts:[['Minus button','Lowers the value'],['Value','The current number'],['Plus button','Raises the value'],['Limits','The minimum and maximum']],
  opts:[['Min and max limits','a minimum of 1 and a maximum of 10, with the buttons disabled at the limits',1],['Typing allowed','the number also editable by typing',0],['Hold to repeat','holding a button to change the value quickly',0]],
  a11y:'labelled buttons ("Increase quantity") and role="spinbutton", or a native number input',
  html:()=>`<div class="numw"><div class="num"><button aria-label="Decrease quantity">−</button><output>1</output><button aria-label="Increase quantity">+</button></div><span>Quantity (max 10)</span></div>`,
  init(r){const[b1,b2]=r.querySelectorAll('.num button'),o=r.querySelector('.num output');let v=1;const s=()=>{o.textContent=v;b1.disabled=v<=1;b2.disabled=v>=10;};b1.onclick=()=>{v--;s();};b2.onclick=()=>{v++;s();};s();},
  css:`
.numw{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:12px;color:var(--muted)}
.num{display:flex;align-items:center;border:1px solid var(--line);border-radius:10px;background:var(--demo-2);overflow:hidden}
.num button{width:38px;height:38px;border:0;background:none;font-size:18px;cursor:pointer}
.num button:disabled{opacity:.3;cursor:default}
.num output{min-width:44px;text-align:center;font:700 16px var(--body);color:var(--ink);border-inline:1px solid var(--line);line-height:38px}
`
});
