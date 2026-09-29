Whatsit.addPattern({id:'datepicker',name:'Date picker',aka:['Calendar picker','Date input'],cat:'Forms',
  say:'A field that opens a small calendar for choosing a date.',
  keys:'calendar date day month year pick choose booking schedule appointment deadline',
  use:'Bookings, deadlines and appointments, where seeing the weekday helps.',
  avoid:'Birthdays far in the past. Typing the date is faster.',
  confuse:[['dropdown','A select menu shows a list. A date picker shows a calendar grid.']],
  parts:[['Input','Shows the chosen date'],['Calendar','The month grid'],['Month switcher','The ‹ › arrows'],['Today','The marked current day'],['Disabled days','Days that can’t be picked']],
  opts:[['Disable past dates','past days greyed out and unselectable',1],['Date range','picking a start and an end date, with the days between highlighted',0],['Typing allowed','typing the date directly as well as clicking',1]],
  a11y:'a grid with arrow-key navigation, and each day labelled with the full date',
  html:()=>`<div class="dp"><button class="dp-btn" aria-haspopup="dialog"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg><span>Pick a date</span></button><div class="cal" hidden><div class="cal-h"><button class="cp" aria-label="Previous month">‹</button><b></b><button class="cn" aria-label="Next month">›</button></div><div class="cal-g"></div></div></div>`,
  init(r){const btn=r.querySelector('.dp-btn'),cal=r.querySelector('.cal'),g=r.querySelector('.cal-g'),h=r.querySelector('.cal-h b'),lab=btn.querySelector('span'),M=['January','February','March','April','May','June','July','August','September','October','November','December'];const now=new Date();let y=now.getFullYear(),m=now.getMonth(),sel=null;
    const draw=()=>{h.textContent=M[m]+' '+y;const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();let s='SMTWTFS'.split('').map(d=>`<i>${d}</i>`).join('');for(let k=0;k<first;k++)s+='<span></span>';for(let d=1;d<=days;d++){const isT=d===now.getDate()&&m===now.getMonth()&&y===now.getFullYear(),isS=sel&&sel.d===d&&sel.m===m&&sel.y===y;s+=`<button class="${isT?'today ':''}${isS?'on':''}">${d}</button>`;}g.innerHTML=s;g.querySelectorAll('button').forEach(b=>b.onclick=()=>{sel={d:+b.textContent,m,y};lab.textContent=`${M[m].slice(0,3)} ${sel.d}, ${y}`;cal.hidden=true;});};
    btn.onclick=()=>{cal.hidden=!cal.hidden;draw();};r.querySelector('.cal .cp').onclick=()=>{if(--m<0){m=11;y--;}draw();};r.querySelector('.cal .cn').onclick=()=>{if(++m>11){m=0;y++;}draw();};},
  css:`
.dp-btn{display:flex;gap:8px;align-items:center;border:1px solid var(--line);background:var(--demo-2);border-radius:8px;padding:8px 12px;cursor:pointer;font-size:14px}
.dp-btn svg{width:16px;height:16px;stroke:var(--ink);fill:none;stroke-width:2}
.cal{position:absolute;top:6px;left:50%;translate:-50% 0;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;padding:5px 8px 7px;box-shadow:0 8px 24px rgba(0,0,0,.18);z-index:4;font-size:11px}
.cal-h{display:flex;justify-content:space-between;align-items:center}
.cal-h button{border:0;background:none;cursor:pointer;font-size:14px;padding:0 6px}
.cal-g{display:grid;grid-template-columns:repeat(7,22px);gap:1px;text-align:center}
.cal-g i{font-style:normal;color:var(--muted);font-size:10px}
.cal-g button{border:0;background:none;height:17px;border-radius:5px;cursor:pointer;font-size:11px;padding:0}
.cal-g button:hover{background:var(--accent-soft)}
.cal-g .today{font-weight:700;color:var(--accent)}
.cal-g .on{background:var(--accent);color:var(--accent-ink)}
`
});
