Whatsit.addPattern({id:'countdown',name:'Countdown timer',aka:['Timer','Launch countdown','Sale timer','Flip clock'],cat:'Feedback',
  say:'Boxes showing days, hours, minutes and seconds ticking down to a moment.',
  keys:'days hours minutes seconds ticking down timer clock sale ends launch coming soon offer expires boxes numbers deadline',
  use:'A real deadline: a launch, a sale that ends, an event start, a code that expires.',
  avoid:'Fake urgency. A timer that resets on every visit teaches people not to trust you.',
  confuse:[['progress','A progress bar shows how much is done. A countdown shows how much time is left.'],['ring','A progress ring fills up toward a goal. A countdown ticks down toward a time.'],['stepper','A stepper counts steps in a task. A countdown counts time.']],
  parts:[['Unit box','One box each for days, hours, minutes and seconds'],['Digits','The number, always two digits'],['Unit label','“Days”, “Hours”…'],['Heading','What it’s counting down to'],['End state','What shows when it reaches zero']],
  opts:[['Days, hours, minutes, seconds','separate boxes for days, hours, minutes and seconds with two-digit numbers',1],['End state','a message that replaces the timer when it reaches zero',1],['Visitor’s time zone','the target time converted to the visitor’s time zone',1],['Flip animation','digits that flip like a departure board when they change',0]],
  a11y:'role="timer", the target date written out in text as well, and no screen reader announcement every second',
  html:()=>`<div class="cd" role="timer" aria-label="Sale ends in"><small>Sale ends in</small><div class="cd-r">${['Days','Hours','Min','Sec'].map(l=>`<div><b>00</b><span>${l}</span></div>`).join('')}</div></div>`,
  init(r){const b=[...r.querySelectorAll('.cd-r b')];let t=2*86400+14*3600+36*60+9;const paint=()=>{[Math.floor(t/86400),Math.floor(t/3600)%24,Math.floor(t/60)%60,t%60].forEach((v,i)=>b[i].textContent=String(v).padStart(2,'0'));};paint();const id=setInterval(()=>{if(!r.isConnected)return clearInterval(id);if(t>0)t--;paint();},1000);},
  css:`
.cd{display:grid;gap:8px;justify-items:center}
.cd>small{color:var(--muted);font-size:12px}
.cd-r{display:flex;gap:6px}
.cd-r div{width:52px;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;padding:9px 0 6px;display:grid;justify-items:center;gap:3px}
.cd-r b{font:800 22px/1 var(--display);font-variant-numeric:tabular-nums}
.cd-r span{font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
`
});
