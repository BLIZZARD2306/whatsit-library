Whatsit.addPattern({id:'tabbar',name:'Bottom tab bar',aka:['Bottom navigation','Tab bar','App bar'],cat:'Navigation',
  say:'A row of icons with labels fixed to the bottom of a phone screen.',
  keys:'bottom icons phone mobile app bar home search profile settings fixed navigation instagram',
  use:'Mobile apps and mobile sites with 3–5 main sections.',
  avoid:'Desktop layouts, or more than five sections.',
  confuse:[['navbar','A navbar sits at the top and suits desktop. A bottom tab bar sits within thumb reach on phones.'],['tabs','Tabs switch content inside one screen. A tab bar switches the whole screen.']],
  parts:[['Tab','An icon with a short label'],['Active tab','The colored icon and label'],['Safe area','Extra space for the phone’s home bar'],['Badge','An optional count on an icon']],
  opts:[['Labels under icons','a short text label under every icon',1],['Respect the safe area','bottom padding for the phone’s home indicator using env(safe-area-inset-bottom)',1],['Hide on scroll down','hiding while scrolling down and coming back on scroll up',0]],
  a11y:'a nav whose buttons each have a text label, with aria-current on the active one',
  html:()=>`<div class="phone"><div class="scr">Home</div><nav class="tbar">${[['⌂','Home'],['⌕','Search'],['♡','Saved'],['☺','Profile']].map((x,i)=>`<button class="${i?'':'on'}"><span aria-hidden="true">${x[0]}</span>${x[1]}</button>`).join('')}</nav></div>`,
  init(r){const b=[...r.querySelectorAll('.tbar button')],s=r.querySelector('.scr');b.forEach(x=>x.onclick=()=>{b.forEach(y=>y.classList.toggle('on',y===x));s.textContent=x.lastChild.textContent;});},
  css:`
.phone{width:150px;height:146px;border:2px solid var(--line);border-radius:18px;background:var(--demo-2);display:flex;flex-direction:column;overflow:hidden}
.phone .scr{flex:1;display:grid;place-items:center;font:700 15px var(--display)}
.tbar{display:flex;border-top:1px solid var(--line)}
.tbar button{flex:1;border:0;background:none;display:flex;flex-direction:column;align-items:center;font-size:9px;padding:5px 0 7px;color:var(--muted);cursor:pointer}
.tbar button span{font-size:15px;line-height:1.1}
.tbar button.on{color:var(--accent);font-weight:700}
`
});
