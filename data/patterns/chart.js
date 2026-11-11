Whatsit.addPattern({id:'chart',name:'Bar chart',aka:['Column chart','Bar graph','Graph'],cat:'Data',
  say:'A row of bars where taller means more, so you can compare amounts at a glance.',
  keys:'bars graph tall short compare numbers days months sales columns chart analytics statistics visual data axis hover value',
  use:'Comparing a handful of amounts: sales per day, sign-ups per month, votes per option.',
  avoid:'One number (use a stat card), parts of a whole, or more than about twelve bars.',
  confuse:[['stat','A stat card shows one number. A bar chart compares several.'],['progress','A progress bar shows one thing moving toward a goal. A bar chart compares separate things.'],['table','A table gives exact values to look up. A chart shows the shape of them.']],
  parts:[['Bar','One amount'],['Axis labels','What each bar is, and the scale'],['Gridlines','Faint lines that help read the height'],['Tooltip','The exact value on hover'],['Legend','What each color means, when there’s more than one']],
  opts:[['Value on hover','a tooltip with the exact value on hover or focus',1],['Axis labels and gridlines','axis labels and faint horizontal gridlines',1],['Highlight the highest bar','the highest bar in the accent color and the rest in a lighter tint',0],['Grow in','bars growing from zero when the chart first appears',0],['Time range switch','a control to switch between Week, Month and Year',0]],
  a11y:'a text summary of what the chart shows, values available to screen readers, and no meaning carried by color alone',
  html:()=>`<div class="bc"><div class="bc-h"><span>Orders this week</span><b class="bc-v">Thu · 64</b></div><div class="bc-p" role="group" aria-label="Orders per day">${[['Mon',32],['Tue',45],['Wed',38],['Thu',64],['Fri',52],['Sat',28],['Sun',18]].map(([d,v])=>`<button class="bc-b${v===64?' on':''}" style="--h:${v}%" data-l="${d} · ${v}" aria-label="${d}: ${v} orders"><i></i><span>${d[0]}</span></button>`).join('')}</div></div>`,
  init(r){const v=r.querySelector('.bc-v'),b=[...r.querySelectorAll('.bc-b')];const pick=x=>{b.forEach(y=>y.classList.toggle('on',y===x));v.textContent=x.dataset.l;};b.forEach(x=>{x.onmouseenter=x.onfocus=x.onclick=()=>pick(x);});},
  css:`
.bc{width:100%;height:100%;display:grid;grid-template-rows:auto 1fr;gap:6px;min-height:0}
.bc-h{display:flex;justify-content:space-between;font-size:11px;color:var(--muted)}
.bc-h b{color:var(--ink);font-variant-numeric:tabular-nums}
.bc-p{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;min-height:0;background:repeating-linear-gradient(to top,transparent 0 24px,var(--line) 24px 25px) 0 -16px no-repeat}
.bc-b{border:0;background:none;padding:0;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:3px;cursor:pointer;color:var(--muted);font-size:10px}
.bc-b i{display:block;height:calc(var(--h) * 1.15);border-radius:4px 4px 0 0;background:color-mix(in srgb,var(--accent) 40%,transparent);transition:background .15s}
.bc-b.on i{background:var(--accent)}
.bc-b.on span{color:var(--ink);font-weight:700}
`
});
