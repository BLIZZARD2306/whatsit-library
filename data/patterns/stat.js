Whatsit.addPattern({id:'stat',name:'Stat card',aka:['KPI card','Metric card','Scorecard'],cat:'Data',
  say:'A card with one big number, what it measures, and whether it went up or down.',
  keys:'number big metric kpi dashboard revenue users growth percent up down trend arrow sparkline stats',
  use:'Dashboards that answer “how are we doing?” at a glance.',
  avoid:'Numbers nobody acts on. Four useful stats beat twelve decorative ones.',
  confuse:[['card','A stat card is a card built around a single number.'],['progress','A progress bar shows how close you are to a goal. A stat card shows a value and how it changed.']],
  parts:[['Label','What the number measures'],['Value','The big number'],['Change','Up or down since last period, in green or red'],['Sparkline','A tiny line chart of the trend'],['Period','For example “vs last month”']],
  opts:[['Change badge with arrow','a change badge like ▲ 12% in green or ▼ 3% in red',1],['Sparkline','a small sparkline of the last 12 periods',1],['Short numbers','large numbers shortened, like 12.4k and 1.2M',1]],
  a11y:'the change described in text (“up 12% from last month”), not only by color or an arrow',
  html:()=>`<div class="kpi"><span class="kpi-l">Monthly revenue</span><b class="kpi-v">$12.4k</b><div class="kpi-r"><span class="kpi-c" aria-label="up 12%">▲ 12%</span><small>vs last month</small></div><svg class="kpi-s" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24 L9 20 L18 22 L27 16 L36 18 L45 12 L54 14 L63 9 L72 11 L81 6 L90 8 L100 3"/></svg></div>`,
  css:`
.kpi{width:190px;background:var(--demo-2);border:1px solid var(--line);border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:2px}
.kpi-l{font-size:12px;color:var(--muted)}
.kpi-v{font:800 26px/1.1 var(--display);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.kpi-r{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
.kpi-c{color:var(--ok);font-weight:700;background:color-mix(in srgb,var(--ok) 14%,transparent);padding:1px 6px;border-radius:999px}
.kpi-s{width:100%;height:30px;margin-top:6px}
.kpi-s path{fill:none;stroke:var(--accent);stroke-width:2;vector-effect:non-scaling-stroke;stroke-linejoin:round}
`
});
