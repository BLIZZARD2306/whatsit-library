Whatsit.addPattern({id:'segmented',name:'Segmented control',aka:['Button group','Toggle group','Pill switcher'],cat:'Forms',
  say:'A row of joined buttons with one highlighted, like Day / Week / Month.',
  keys:'day week month buttons joined row pill pick one view switch filter monthly yearly annual pricing billing toggle',
  use:'Switching a view or filter between 2–4 short options, like monthly vs yearly pricing.',
  avoid:'Long labels or more than five choices.',
  confuse:[['tabs','Tabs swap whole sections. A segmented control changes a setting or view of the same content.'],['radio','Radios are the plain form version of the same idea.']],
  parts:[['Segment','One button in the row'],['Active indicator','Highlighted background on the chosen segment'],['Container','The rounded outline around all segments']],
  opts:[['Sliding highlight','an active background that slides smoothly between segments',1],['Full width','segments stretched to fill the container',0],['Monthly / Yearly pricing example','sample options “Monthly” and “Yearly (save 20%)” that switch the displayed prices',0]],
  a11y:'radiogroup semantics and arrow-key navigation',
  html:()=>`<div class="seg"><button>Day</button><button class="on">Week</button><button>Month</button></div>`,
  init(r){const b=[...r.querySelectorAll('.seg button')];b.forEach(x=>x.onclick=()=>b.forEach(y=>y.classList.toggle('on',y===x)));}
});
