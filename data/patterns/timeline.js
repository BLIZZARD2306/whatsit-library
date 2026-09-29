Whatsit.addPattern({id:'timeline',name:'Timeline',aka:['Activity feed','Order tracker','History'],cat:'Data',
  say:'Events listed in order along a line, with a dot for each one.',
  keys:'history events order tracking line dots steps delivery shipped status activity log dates',
  use:'Order tracking, activity history and project milestones.',
  avoid:'Steps the user still has to complete. Use a stepper.',
  confuse:[['stepper','A stepper is a task the user moves through. A timeline shows what already happened.']],
  parts:[['Event','One entry with a title and time'],['Dot','Marks each event'],['Line','Connects the events'],['Current','The latest or active event']],
  opts:[['Timestamps','a date and time under each event',1],['Status colors','completed events colored, upcoming ones grey',1],['Icons in the dots','small icons inside each dot',0]],
  a11y:'an ordered list, so the order is announced',
  html:()=>`<ol class="tl"><li class="done"><b>Order placed</b><span>Sep 26, 9:14 AM</span></li><li class="done"><b>Shipped</b><span>Sep 27, 2:30 PM</span></li><li class="cur"><b>Out for delivery</b><span>Today</span></li><li><b>Delivered</b><span>Expected by 6 PM</span></li></ol>`,
  css:`
.tl{list-style:none;margin:0;padding:0;font-size:12px;display:flex;flex-direction:column;gap:6px;width:80%;max-width:260px}
.tl li{position:relative;padding-left:22px;display:flex;flex-direction:column;line-height:1.25}
.tl li::before{content:"";position:absolute;left:0;top:2px;width:10px;height:10px;border-radius:50%;border:2px solid var(--line);background:var(--demo-2);z-index:1}
.tl li:not(:last-child)::after{content:"";position:absolute;left:6px;top:14px;bottom:-8px;width:2px;background:var(--line)}
.tl li.done::before{background:var(--accent);border-color:var(--accent)}
.tl li.done::after{background:var(--accent)}
.tl li.cur::before{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.tl span{color:var(--muted)}
`
});
