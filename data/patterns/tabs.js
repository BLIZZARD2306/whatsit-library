Whatsit.addPattern({id:'tabs',name:'Tabs',aka:['Tab bar','Tabbed panel'],cat:'Navigation',
  say:'Labels along the top that swap which section shows below.',
  keys:'tabs folder labels switch sections top content panels profile overview details reviews specs underline',
  use:'Related content split into sections people flip between without leaving the page, like Overview / Reviews / Specs.',
  avoid:'People need to compare sections side by side, or there are more than about six.',
  confuse:[['segmented','A segmented control changes a view of the same content. Tabs swap whole sections.'],['accordion','An accordion stacks sections and opens them in place. Tabs show one section at a time.']],
  parts:[['Tab list','The row of labels'],['Tab','One label'],['Active tab','The selected label, often underlined'],['Tab panel','Content for the active tab']],
  opts:[['Animated underline','an underline under the active tab that slides between tabs',1],['Sync with URL','the active tab stored in the URL hash so it can be linked',0],['Scrollable on mobile','a tab list that scrolls sideways on small screens',1]],
  a11y:'tablist, tab and tabpanel roles with arrow-key navigation',
  html:()=>`<div class="d-tabs dbox"><div role="tablist"><button role="tab" aria-selected="true">Overview</button><button role="tab" aria-selected="false">Reviews</button><button role="tab" aria-selected="false">Specs</button></div><div role="tabpanel">Lightweight trail shoe with a grippy sole.</div></div>`,
  init(r){const t=[...r.querySelectorAll('[role=tab]')],p=r.querySelector('[role=tabpanel]'),c=['Lightweight trail shoe with a grippy sole.','★★★★☆ 4.3 from 212 reviews','Weight 280 g · Drop 6 mm'];t.forEach((x,k)=>x.onclick=()=>{t.forEach(y=>y.setAttribute('aria-selected',y===x));p.textContent=c[k];});},
  css:`
.d-tabs{width:88%;max-width:320px}
.d-tabs [role=tablist]{display:flex;gap:14px;border-bottom:1px solid var(--line)}
.d-tabs [role=tab]{border:0;background:none;padding:6px 0;font-size:14px;cursor:pointer;color:var(--muted);border-bottom:2px solid transparent;margin-bottom:-1px}
.d-tabs [role=tab][aria-selected=true]{color:var(--ink);font-weight:700;border-color:var(--accent)}
.d-tabs [role=tabpanel]{padding-top:10px;font-size:14px}
`
});
