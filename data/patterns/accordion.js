Whatsit.addPattern({id:'accordion',name:'Accordion',aka:['Collapsible','Expandable section','FAQ dropdown'],cat:'Layout',
  say:'A stack of headings that open to show content when clicked.',
  keys:'faq question answer expand collapse click open close arrow plus minus hide show sections questions',
  use:'Long pages of optional detail, like an FAQ, where people need one or two answers.',
  avoid:'Content everyone needs. Hiding it only adds clicks.',
  confuse:[['tabs','Tabs show one section at a time. An accordion stacks them and opens them in place.'],['dropdown','A select menu floats over the page. An accordion pushes content down.']],
  parts:[['Item','One heading plus its hidden content'],['Trigger','The clickable heading'],['Chevron','The arrow that rotates when open'],['Content panel','The part that expands']],
  opts:[['Only one open at a time','opening one item closes the others',1],['Smooth height animation','a smooth open/close height animation',1],['Plus / minus icon','a plus icon that becomes a minus when open, instead of a chevron',0]],
  a11y:'buttons with aria-expanded and aria-controls',
  html:()=>`<div class="d-acc"><details open><summary>Can I return it?</summary><p>Yes, within 30 days.</p></details><details><summary>Do you ship abroad?</summary><p>To 40 countries.</p></details></div>`,
  css:`
.d-acc{width:88%;max-width:320px;display:flex;flex-direction:column;gap:6px}
.d-acc details{background:var(--demo-2);border:1px solid var(--line);border-radius:8px;font-size:14px}
.d-acc summary{padding:8px 12px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;font-weight:700}
.d-acc summary::-webkit-details-marker{display:none}
.d-acc summary::after{content:"⌄";transition:rotate .2s}
.d-acc details[open] summary::after{rotate:180deg}
.d-acc p{margin:0;padding:0 12px 10px;color:var(--muted)}
`
});
