Whatsit.addPattern({id:'popover',name:'Popover',aka:['Popup menu','Flyout','Dropdown panel'],cat:'Overlays',
  say:'A small panel that opens next to a button and holds clickable things.',
  keys:'small panel box opens next button click menu options share more three dots actions flyout bubble',
  use:'A few extra actions or settings tied to one button, like Share or ⋯ More.',
  avoid:'Long forms. Use a modal or a page.',
  confuse:[['tooltip','A tooltip shows text on hover and can’t be clicked. A popover opens on click and has buttons inside.'],['modal','A modal blocks the page. A popover sits beside its button and closes when you click away.'],['dropdown','A select menu picks one value for a form. A popover can hold anything.']],
  parts:[['Trigger','The button that opens it'],['Panel','The floating box'],['Arrow','The pointer toward the trigger'],['Dismiss','Closing on an outside click or Escape']],
  opts:[['Close on outside click and Esc','closing when clicking outside or pressing Escape',1],['Arrow pointing at the button','a small arrow pointing at the button',1],['Flip near the edge','flipping above the button when there isn’t room below',1]],
  a11y:'aria-expanded on the trigger, with focus moved into the panel when it opens',
  html:()=>`<div class="popw"><button class="dbtn ghost o" aria-expanded="false">Share ▾</button><div class="popv" hidden><b>Share this</b><button>Copy link</button><button>Email</button><button>Embed</button></div></div>`,
  init(r){const b=r.querySelector('.popw .o'),p=r.querySelector('.popv');const set=v=>{p.hidden=!v;b.setAttribute('aria-expanded',v);};b.onclick=e=>{e.stopPropagation();set(p.hidden);};p.querySelectorAll('button').forEach(x=>x.onclick=()=>set(false));r.addEventListener('click',e=>{if(!e.target.closest('.popw'))set(false);});},
  css:`
.popw{position:relative;align-self:start;margin-top:10px}
.popv{position:absolute;top:calc(100% + 8px);left:50%;translate:-50% 0;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;padding:6px;display:flex;flex-direction:column;gap:1px;min-width:150px;box-shadow:0 8px 24px rgba(0,0,0,.15);font-size:13px;z-index:3}
.popv::before{content:"";position:absolute;top:-6px;left:50%;width:10px;height:10px;background:var(--demo-2);border-left:1px solid var(--line);border-top:1px solid var(--line);rotate:45deg;translate:-50% 0}
.popv b{padding:2px 8px 3px;font-size:12px;color:var(--muted)}
.popv button{border:0;background:none;text-align:left;padding:5px 8px;border-radius:6px;cursor:pointer}
.popv button:hover{background:var(--accent-soft)}
`
});
