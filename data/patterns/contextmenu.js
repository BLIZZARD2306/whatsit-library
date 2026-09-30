Whatsit.addPattern({id:'contextmenu',name:'Context menu',aka:['Right-click menu','Shortcut menu'],cat:'Overlays',
  say:'A menu that appears where you right-click (or long-press), with actions for that spot.',
  keys:'right click menu options copy paste delete rename long press actions cursor mouse',
  use:'Shortcuts on items like files, messages or objects on a canvas.',
  avoid:'Being the only way to reach an action. Many people never right-click, so keep a visible button too.',
  confuse:[['popover','A popover opens from a visible button. A context menu opens wherever you right-click.'],['dropdown','A select menu picks a form value. A context menu runs actions.']],
  parts:[['Trigger area','Where right-clicking opens it'],['Menu','The floating list'],['Item','One action'],['Shortcut hint','Keys like Ctrl+C on the right'],['Divider','A line grouping related actions']],
  opts:[['Keyboard shortcut hints','shortcut hints like Ctrl+C aligned to the right of each item',1],['Dangerous actions in red','destructive actions like Delete in red, below a divider',1],['Long-press on touch','opening on long-press on touch screens',1]],
  a11y:'role="menu" with menuitems, arrow-key navigation, Escape to close, and Shift+F10 to open from the keyboard',
  html:()=>`<div class="cm-area" tabindex="0">Right-click (or tap) here</div><ul class="cm" role="menu" hidden><li role="menuitem">Copy<kbd>Ctrl C</kbd></li><li role="menuitem">Rename<kbd>F2</kbd></li><li role="menuitem">Duplicate<kbd>Ctrl D</kbd></li><li class="cm-sep" role="separator"></li><li role="menuitem" class="cm-del">Delete<kbd>Del</kbd></li></ul>`,
  init(r){const a=r.querySelector('.cm-area'),m=r.querySelector('.cm');
    const open=e=>{e.preventDefault();e.stopPropagation();const b=r.getBoundingClientRect();m.hidden=false;
      m.style.left=Math.min(e.clientX-b.left,b.width-m.offsetWidth-6)+'px';m.style.top=Math.min(e.clientY-b.top,b.height-m.offsetHeight-6)+'px';};
    a.oncontextmenu=open;a.onclick=open;m.onclick=()=>{m.hidden=true;};
    r.addEventListener('click',e=>{if(!m.contains(e.target))m.hidden=true;});a.onkeydown=e=>{if(e.key==='Escape')m.hidden=true;};},
  css:`
.cm-area{width:86%;height:120px;border:2px dashed var(--line);border-radius:12px;display:grid;place-items:center;font-size:13px;color:var(--muted);cursor:context-menu;user-select:none}
.cm{position:absolute;z-index:4;list-style:none;margin:0;padding:4px;min-width:150px;background:var(--demo-2);border:1px solid var(--line);border-radius:10px;box-shadow:0 10px 24px rgba(0,0,0,.18);font-size:13px}
.cm li[role=menuitem]{display:flex;justify-content:space-between;gap:16px;padding:5px 10px;border-radius:6px;cursor:pointer}
.cm li[role=menuitem]:hover{background:var(--accent-soft)}
.cm kbd{font:500 10px var(--mono);color:var(--muted);border:0;padding:0;margin:0}
.cm-sep{height:1px;background:var(--line);margin:4px 2px}
.cm-del{color:var(--danger)}
`
});
