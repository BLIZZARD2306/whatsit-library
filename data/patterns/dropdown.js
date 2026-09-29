Whatsit.addPattern({id:'dropdown',name:'Select menu',aka:['Dropdown','Picker','Combo box'],cat:'Forms',
  say:'A button that opens a list of options to pick one from.',
  keys:'dropdown drop down list menu opens click choose pick country options arrow down select combo picker',
  use:'Picking one option from a long list, like a country.',
  avoid:'Two to four options. Radios show them without a click.',
  confuse:[['radio','Radios show every option at once. A select menu hides them until clicked.'],['accordion','An accordion reveals content in place. A select menu floats a list of choices.']],
  parts:[['Trigger','The button showing the current value'],['Listbox','The list that opens'],['Option','One row in the list'],['Placeholder','Grey text before anything is picked'],['Search field','Optional filter at the top; this makes it a combo box']],
  opts:[['Search / filter field','a search field at the top that filters options as you type',0],['Checkmark on selected option','a checkmark beside the selected option',1],['Grouped options','options grouped under small headings',0]],
  a11y:'arrow keys, Enter and Escape, with listbox and option roles',
  html:()=>`<div class="d-sel"><button aria-haspopup="listbox" aria-expanded="false"><span>Philippines</span><span>⌄</span></button><ul role="listbox" hidden><li role="option">Philippines <span>✓</span></li><li role="option">Japan <span></span></li><li role="option">Canada <span></span></li></ul></div>`,
  init(r){const b=r.querySelector('.d-sel>button'),l=r.querySelector('ul'),li=[...l.children];b.onclick=()=>{l.hidden=!l.hidden;b.setAttribute('aria-expanded',!l.hidden);};li.forEach(x=>x.onclick=()=>{b.firstElementChild.textContent=x.firstChild.textContent.trim();li.forEach(y=>y.lastElementChild.textContent=y===x?'✓':'');l.hidden=true;b.setAttribute('aria-expanded',false);});},
  css:`
.d-sel{position:relative;width:200px;font-size:14px}
.d-sel>button{width:100%;text-align:left;border:1px solid var(--line);background:var(--demo-2);border-radius:8px;padding:8px 12px;cursor:pointer;display:flex;justify-content:space-between}
.d-sel ul{position:absolute;top:calc(100% + 4px);left:0;right:0;margin:0;padding:4px;list-style:none;background:var(--demo-2);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.12);z-index:3}
.d-sel li{padding:6px 10px;border-radius:5px;cursor:pointer;display:flex;justify-content:space-between}
.d-sel li:hover{background:var(--accent-soft)}
`
});
