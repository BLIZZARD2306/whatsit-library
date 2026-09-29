Whatsit.addPattern({id:'pricing',name:'Pricing table',aka:['Pricing cards','Plans'],cat:'Layout',
  say:'Plan cards side by side, each with a price, features and a button.',
  keys:'price pricing plans tiers free pro monthly subscription compare popular per month upgrade',
  use:'Any product with paid plans.',
  avoid:'More than four plans. Too many choices make people stall.',
  confuse:[['segmented','Pair a pricing table with a segmented control for Monthly / Yearly.'],['card','Pricing cards are a specific kind of card.']],
  parts:[['Plan card','One tier'],['Price','The big number with /month'],['Feature list','What’s included'],['Highlight','The “Most popular” badge and border'],['Billing toggle','The Monthly / Yearly switch']],
  opts:[['Monthly / Yearly toggle','a Monthly / Yearly toggle that updates the prices and shows the yearly saving',1],['Highlight the popular plan','a “Most popular” badge and stronger border on one plan',1],['Feature checklist','a checklist of features with checkmarks for each plan',1]],
  a11y:'each plan as a heading with its price in text, not shown by visual emphasis alone',
  html:()=>`<div class="price"><div class="plan"><b>Starter</b><strong>$0</strong><span>1 project</span><button class="dbtn ghost">Start free</button></div><div class="plan hot"><em>Popular</em><b>Pro</b><strong>$12<small>/mo</small></strong><span>Unlimited projects</span><button class="dbtn">Go Pro</button></div></div>`,
  css:`
.price{display:flex;gap:8px}
.plan{position:relative;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:2px;font-size:11px;width:108px}
.plan b{font-size:12px}
.plan strong{font:800 20px var(--display)}
.plan strong small{font:400 11px var(--body);color:var(--muted)}
.plan span{color:var(--muted)}
.plan .dbtn{margin-top:6px;padding:5px;font-size:11px}
.plan.hot{border:2px solid var(--accent)}
.plan em{position:absolute;top:-9px;right:8px;background:var(--accent);color:var(--accent-ink);font:700 10px var(--body);padding:1px 7px;border-radius:999px}
`
});
