Whatsit.addPattern({id:'radio',name:'Radio group',aka:['Radio buttons','Option buttons'],cat:'Forms',
  say:'A list of round options where picking one un-picks the others.',
  keys:'pick choose select only one single option answer circles round dot quiz survey plan choice exclusive shipping',
  use:'The user must choose exactly one option from 2–6 choices they should see at once, like shipping speed.',
  avoid:'More than about six options (use a select menu), or when several can be picked (use checkboxes).',
  confuse:[['checkbox','Checkboxes allow many picks. Radios allow exactly one.'],['dropdown','A select menu hides options until clicked. Radios show them all.'],['segmented','A segmented control is a compact, button-style version for 2–4 options.']],
  parts:[['Option','One choice: its circle and label'],['Label','Text beside the circle; clicking it selects too'],['Group label','The question the group answers'],['Selected state','The filled circle'],['Helper text','Small grey text under an option']],
  opts:[['Preselect a default','one option selected by default',1],['Description under each option','a short description under each option label',0],['Card style','each option shown as a clickable card whose border highlights when selected',0],['Required validation','an error message if the form is submitted with nothing selected',0]],
  a11y:'a fieldset with a legend, and arrow-key navigation between options',
  html:u=>`<div class="d-list dbox"><fieldset><legend>Shipping</legend><label><input type="radio" name="r${u}" checked> Standard · free</label><label><input type="radio" name="r${u}"> Express · $9</label><label><input type="radio" name="r${u}"> Next day · $19</label></fieldset></div>`
});
