Whatsit.addPattern({id:'spinner',name:'Spinner',aka:['Loader','Loading indicator','Throbber'],cat:'Feedback',
  say:'A small spinning circle that means “working on it”.',
  keys:'spinning circle loading wait waiting rotating dots bouncing busy working buffering',
  use:'Short waits of a few seconds where you don’t know how long it will take.',
  avoid:'Waits with a known length (use a progress bar), or page loads where a skeleton can show the layout.',
  confuse:[['progress','A progress bar shows how much is done. A spinner only says “busy”.'],['skeleton','A skeleton shows the shape of the coming content. A spinner is one small icon.']],
  parts:[['Ring','The circle track'],['Arc','The colored part that spins'],['Label','Optional text like “Loading…”'],['Delay','Waiting ~300ms before showing, so quick loads don’t flicker']],
  opts:[['Show after 300ms','a 300ms delay before appearing so quick loads don’t flicker',1],['Bouncing dots variant','a three-dot bouncing variant',0],['Inside a button','a small version that replaces a button’s label while it submits',1]],
  a11y:'role="status" with an aria-label such as "Loading"',
  html:()=>`<div class="spn"><div class="spin" role="status" aria-label="Loading"></div><div class="dots" aria-hidden="true"><i></i><i></i><i></i></div><span>Loading…</span></div>`,
  css:`
.spn{display:flex;align-items:center;gap:18px;font-size:14px;color:var(--muted)}
.spin{width:34px;height:34px;border-radius:50%;border:4px solid color-mix(in srgb,var(--ink) 14%,transparent);border-top-color:var(--accent);animation:spin .8s linear infinite}
@keyframes spin{to{rotate:360deg}}
.dots{display:flex;gap:5px}
.dots i{width:9px;height:9px;border-radius:50%;background:var(--accent);animation:bob 1s infinite ease-in-out}
.dots i:nth-child(2){animation-delay:.15s}
.dots i:nth-child(3){animation-delay:.3s}
@keyframes bob{0%,80%,100%{opacity:.25;translate:0 0}40%{opacity:1;translate:0 -5px}}
`
});
