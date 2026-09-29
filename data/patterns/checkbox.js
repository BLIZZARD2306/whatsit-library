Whatsit.addPattern({id:'checkbox',name:'Checkbox',aka:['Tick box','Check box'],cat:'Forms',
  say:'Square boxes you can tick, as many as you like.',
  keys:'tick check mark square box many multiple several agree terms todo to-do list select all',
  use:'The user can pick any number of options, or must agree to something like terms.',
  avoid:'Only one option is allowed (use radios), or the change should apply instantly (use a switch).',
  confuse:[['radio','Radios allow exactly one pick. Checkboxes allow any number.'],['toggle','A switch applies a setting instantly. A checkbox is usually saved with a form.']],
  parts:[['Box','The square, ticked or not'],['Checked','The ticked state'],['Indeterminate','A dash meaning some, not all, children are ticked'],['Label','Text beside the box; clicking it toggles too']],
  opts:[['“Select all” parent checkbox','a “Select all” checkbox that ticks every option and shows an indeterminate dash when only some are ticked',0],['Strike through ticked items','ticked items shown with a strike-through, to-do style',0],['Count of selected items','a small counter showing how many are selected',1]],
  a11y:'real input elements with linked labels so the label is clickable',
  html:()=>`<div class="d-list dbox"><label><input type="checkbox" checked> Email updates</label><label><input type="checkbox"> SMS alerts</label><label><input type="checkbox" checked> Weekly digest</label><span class="ct">2 selected</span></div>`,
  init(r){const b=[...r.querySelectorAll('input')],c=r.querySelector('.ct');b.forEach(x=>x.onchange=()=>c.textContent=b.filter(y=>y.checked).length+' selected');}
});
