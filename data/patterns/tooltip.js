Whatsit.addPattern({id:'tooltip',name:'Tooltip',aka:['Hover hint','Info bubble'],cat:'Overlays',
  say:'A tiny label that appears when you hover over or focus something.',
  keys:'hover mouse over small text bubble hint info icon explain label appears question mark tip',
  use:'Explaining an icon-only button or a short bit of jargon.',
  avoid:'Important information, or anything mobile-first, since phones have no hover.',
  confuse:[['modal','A modal is a full box that asks for a decision. A tooltip is a one-line hint.']],
  parts:[['Trigger','The element you hover'],['Bubble','The small box of text'],['Arrow','The pointer toward the trigger'],['Delay','The wait before it shows']],
  opts:[['Arrow pointing at the trigger','a small arrow pointing at the trigger',1],['Smart positioning','flipping to the other side when near a screen edge',1],['300ms show delay','a 300ms delay before it shows',0]],
  a11y:'showing on keyboard focus as well as hover, linked with aria-describedby',
  html:()=>`<span class="tip-w"><button class="iconbtn" aria-label="Share"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></button><span class="tip" role="tooltip">Share this page</span></span>`,
  css:`
.tip-w{position:relative;display:inline-block}
.tip{position:absolute;bottom:calc(100% + 10px);left:50%;translate:-50% 4px;background:var(--ink);color:var(--bg);font-size:13px;padding:5px 9px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:.15s}
.tip::after{content:"";position:absolute;top:100%;left:50%;translate:-50% 0;border:5px solid transparent;border-top-color:var(--ink)}
.tip-w:hover .tip,.tip-w:focus-within .tip{opacity:1;translate:-50% 0}
`
});
