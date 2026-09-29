Whatsit.addPattern({id:'toast',name:'Toast',aka:['Snackbar','Notification','Flash message'],cat:'Feedback',
  say:'A small message that slides in at the edge, then leaves by itself.',
  keys:'message popup corner bottom disappears goes away notification saved success error alert little small slides fades temporary copied',
  use:'Confirming something happened, like “Saved” or “Link copied”.',
  avoid:'Errors people must act on. They may miss it before it goes.',
  confuse:[['modal','A modal blocks the page until you answer. A toast never blocks.'],['badge','A badge is a count that stays on an icon. A toast is a message that leaves.']],
  parts:[['Toast','The message box'],['Variant','Success, error or info colors'],['Action','An optional button like “Undo”'],['Duration','How long before it hides'],['Stack','Several toasts piled up']],
  opts:[['Success / error / info variants','success, error and info variants with matching icons and colors',1],['Undo button','an “Undo” button on the toast',0],['Auto-hide after 4 seconds','auto-hiding after 4 seconds, pausing while hovered',1]],
  a11y:'an aria-live region so screen readers announce the message',
  html:()=>`<button class="dbtn o">Save changes</button><div class="toast" role="status"><i>✓</i> Changes saved</div>`,
  init(r){const t=r.querySelector('.toast');let h;r.querySelector('.o').onclick=()=>{t.classList.add('show');clearTimeout(h);h=setTimeout(()=>t.classList.remove('show'),2200);};},
  css:`
.toast{position:absolute;bottom:12px;left:50%;translate:-50% 30px;opacity:0;background:var(--ink);color:var(--bg);padding:8px 14px;border-radius:8px;font-size:14px;transition:.25s;white-space:nowrap;display:flex;gap:8px;align-items:center;pointer-events:none}
.toast.show{translate:-50% 0;opacity:1}
.toast i{color:var(--ok);font-style:normal;font-weight:700}
`
});
