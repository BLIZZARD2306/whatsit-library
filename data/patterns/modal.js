Whatsit.addPattern({id:'modal',name:'Modal',aka:['Dialog','Popup','Lightbox'],cat:'Overlays',
  say:'A box that appears in the middle and darkens everything behind it.',
  keys:'popup pop up box middle center centre dark darkens background overlay confirm are you sure dialog window blocks lightbox',
  use:'Something needs a decision before continuing, like confirming a delete.',
  avoid:'Information that can sit on the page. Surprise popups annoy people.',
  confuse:[['drawer','A drawer slides in from an edge. A modal appears in the center.'],['toast','A toast is a small message that leaves on its own and never blocks the page.']],
  parts:[['Backdrop','The dark layer behind the box'],['Dialog','The box itself'],['Title','Heading at the top'],['Actions','Buttons like Cancel and Delete'],['Close button','The × in the corner']],
  opts:[['Close on backdrop click and Esc','closing when the backdrop is clicked or Escape is pressed',1],['Cancel / Confirm buttons','Cancel and Confirm buttons, with Confirm styled red for destructive actions',1],['Open / close animation','a fade and scale animation on open and close',0]],
  a11y:'focus moved into the dialog and trapped while open, then returned to the button that opened it',
  html:()=>`<button class="dbtn red o">Delete project</button><div class="ov"><div class="d-modal" role="dialog" aria-label="Delete project?"><h4>Delete project?</h4><p>This can't be undone.</p><div class="acts"><button class="dbtn ghost c">Cancel</button><button class="dbtn red c">Delete</button></div></div></div>`,
  init(r){const o=r.querySelector('.ov');r.querySelector('.o').onclick=()=>o.classList.add('open');o.onclick=e=>{if(e.target===o||e.target.classList.contains('c'))o.classList.remove('open');};},
  css:`
.d-modal{background:var(--demo-2);border-radius:12px;padding:14px 16px;width:78%;max-width:260px;font-size:14px;scale:.94;transition:scale .2s}
.ov.open .d-modal{scale:1}
.d-modal h4{margin:0 0 4px;font:700 16px var(--display)}
.d-modal p{margin:0 0 12px;color:var(--muted)}
.d-modal .acts{display:flex;justify-content:flex-end;gap:8px}
.dbtn.red{background:var(--danger);color:#fff}
`
});
