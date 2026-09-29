Whatsit.addPattern({id:'toggle',name:'Toggle switch',aka:['Switch','On/off toggle'],cat:'Forms',
  say:'A pill-shaped switch that flips a setting on or off instantly.',
  keys:'on off switch toggle flip dark mode light mode setting enable disable notifications pill iphone',
  use:'A single setting that takes effect immediately, like dark mode or notifications.',
  avoid:'The change only applies after pressing Save. Use a checkbox there.',
  confuse:[['checkbox','A checkbox is usually saved with a form. A switch acts immediately.'],['segmented','A segmented control picks between named options. A switch is only on or off.']],
  parts:[['Track','The pill background'],['Thumb','The circle that slides'],['On / off state','Colored when on, grey when off'],['Label','Says what the switch controls']],
  opts:[['Sun / moon icon in the thumb','a sun icon when off and a moon icon when on',0],['Remember the choice','the choice saved so it survives a reload',1],['Disabled state','a disabled style for when the setting is unavailable',0]],
  a11y:'role="switch" with aria-checked, toggled by Space and Enter',
  html:()=>`<div class="d-sw dbox"><span>Dark mode</span><button class="switch" role="switch" aria-checked="true" aria-label="Dark mode"></button></div>`,
  init(r){const s=r.querySelector('.switch');s.onclick=()=>s.setAttribute('aria-checked',s.getAttribute('aria-checked')!=='true');},
  css:`
.d-sw{display:flex;align-items:center;gap:12px;font-size:15px}
.switch{width:48px;height:28px;border-radius:999px;border:0;background:var(--line);position:relative;cursor:pointer;transition:background .2s;padding:0;flex:none}
.switch::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:translate .2s}
.switch[aria-checked="true"]{background:var(--accent)}
.switch[aria-checked="true"]::after{translate:20px 0}
`
});
