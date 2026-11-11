Whatsit.addPattern({id:'splitbutton',name:'Split button',aka:['Button with dropdown','Menu button','Action menu'],cat:'Forms',
  say:'A button joined to a small arrow. The button does the usual thing, the arrow opens other choices.',
  keys:'button arrow next to it more options save as dropdown attached caret two part main action other actions',
  use:'One action people pick most of the time, plus a few close variations, like Save / Save as draft.',
  avoid:'Unrelated actions. If the choices aren’t versions of the same thing, use separate buttons.',
  confuse:[['dropdown','A select menu picks a value for a form. A split button runs an action.'],['contextmenu','A context menu opens on right-click. A split button’s menu opens from its arrow.']],
  parts:[['Main button','Runs the default action'],['Arrow button','Opens the menu'],['Divider','The thin line between the two'],['Menu','The list of other actions']],
  opts:[['Remember the last choice','the main button switching to whichever action was picked last',1],['Close on outside click','the menu closing on an outside click or the Escape key',1],['Icons in the menu','a small icon before each menu item',0]],
  a11y:'the arrow labelled “More options” with aria-haspopup and aria-expanded, and menu items reachable with the arrow keys',
  html:()=>`<div class="spb"><div class="spb-g"><button class="dbtn spb-m">Save</button><button class="dbtn spb-c" aria-label="More save options" aria-haspopup="menu" aria-expanded="false">▾</button></div><div class="spb-menu" role="menu" hidden><button role="menuitem">Save as draft</button><button role="menuitem">Save and publish</button><button role="menuitem">Save as template</button></div></div>`,
  init(r){const m=r.querySelector('.spb-m'),c=r.querySelector('.spb-c'),menu=r.querySelector('.spb-menu');const set=o=>{menu.hidden=!o;c.setAttribute('aria-expanded',o);};c.onclick=()=>set(menu.hidden);menu.querySelectorAll('button').forEach(b=>b.onclick=()=>{m.textContent=b.textContent;set(false);});r.addEventListener('keydown',e=>{if(e.key==='Escape')set(false);});},
  css:`
.spb{position:relative;align-self:start;margin-top:10px}
.spb-g{display:flex;gap:1px}
.spb-m{border-radius:8px 0 0 8px}
.spb-c{border-radius:0 8px 8px 0;padding:8px 10px}
.spb-menu{position:absolute;top:calc(100% + 6px);right:0;min-width:170px;display:grid;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;padding:4px;box-shadow:0 8px 20px rgba(0,0,0,.14);z-index:2}
.spb-menu[hidden]{display:none}
.spb-menu button{border:0;background:none;text-align:left;padding:5px 10px;border-radius:6px;font-size:13px;color:var(--ink);cursor:pointer}
.spb-menu button:hover{background:var(--accent-soft)}
`
});
