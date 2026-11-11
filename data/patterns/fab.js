Whatsit.addPattern({id:'fab',name:'Floating action button',aka:['FAB','Speed dial','Compose button'],cat:'Navigation',
  say:'A round button that floats in the bottom corner, above everything else, for the main thing to do on the screen.',
  keys:'round circle plus button bottom right corner floating stays while scrolling add new create compose chat bubble speed dial',
  use:'The one action a screen exists for: new message, add task, start chat.',
  avoid:'More than one per screen, or actions people rarely need. It covers content, so it has to earn the spot.',
  confuse:[['tabbar','A bottom tab bar moves between screens. A floating action button does one thing.'],['badge','A badge is a small count on an icon. A floating action button is a button of its own.']],
  parts:[['Button','The round floating button'],['Icon','Usually a plus or a pencil'],['Speed dial','Smaller actions that fan out when it’s pressed'],['Label','Optional text beside the icon (“extended” version)']],
  opts:[['Speed dial','two or three smaller actions that fan out above it when pressed, with the plus rotating into an ×',1],['Hide on scroll down','the button sliding away while scrolling down and returning when scrolling up',0],['Extended with label','a wider pill version with a text label beside the icon',0]],
  a11y:'an aria-label that names the action (“New message”), aria-expanded when it opens a speed dial, and a 48px touch target',
  html:()=>`<div class="fab-w"><div class="fab-l" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="fab-d"><button class="fab-o" tabindex="-1">Photo</button><button class="fab-o" tabindex="-1">Note</button></div><button class="fab-b" aria-label="Create" aria-expanded="false">+</button></div>`,
  init(r){const w=r.querySelector('.fab-w'),b=r.querySelector('.fab-b'),o=[...r.querySelectorAll('.fab-o')];const set=x=>{w.classList.toggle('open',x);b.setAttribute('aria-expanded',x);o.forEach(y=>y.tabIndex=x?0:-1);};b.onclick=()=>set(!w.classList.contains('open'));o.forEach(y=>y.onclick=()=>set(false));},
  css:`
.fab-w{position:relative;width:100%;height:100%}
.fab-l{display:grid;gap:9px;padding:6px 64px 0 6px}
.fab-l i{height:9px;border-radius:5px;background:color-mix(in srgb,var(--ink) 12%,transparent)}
.fab-l i:nth-child(2){width:80%}.fab-l i:nth-child(4){width:65%}.fab-l i:nth-child(5){width:88%}
.fab-b{position:absolute;right:4px;bottom:4px;width:48px;height:48px;border-radius:50%;border:0;background:var(--accent);color:var(--accent-ink);font-size:28px;line-height:1;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.25);transition:transform .2s}
.fab-w.open .fab-b{transform:rotate(45deg)}
.fab-d{position:absolute;right:8px;bottom:60px;display:grid;gap:6px;justify-items:end}
.fab-o{border:1px solid var(--line);background:var(--demo-2);color:var(--ink);border-radius:999px;padding:5px 12px;font-size:12px;cursor:pointer;opacity:0;transform:translateY(8px) scale(.9);pointer-events:none;transition:opacity .18s,transform .18s;box-shadow:0 4px 10px rgba(0,0,0,.12)}
.fab-w.open .fab-o{opacity:1;transform:none;pointer-events:auto}
`
});
