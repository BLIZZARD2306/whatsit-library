Whatsit.addPattern({id:'cmdk',name:'Command palette',aka:['Command menu','Cmd+K','Quick search','Spotlight'],cat:'Overlays',
  say:'A search box that pops up with a keyboard shortcut and runs actions as you type.',
  keys:'search box shortcut cmd ctrl command keyboard spotlight quick actions type filter popup launcher',
  use:'Apps with many actions or pages, for people who prefer the keyboard.',
  avoid:'Simple sites. A normal search field is clearer.',
  confuse:[['modal','A modal asks a question. A command palette is a search box for actions.'],['dropdown','A select menu picks a value. A command palette runs a command.']],
  parts:[['Trigger','The shortcut (Ctrl/⌘ K) or search button'],['Input','Where you type'],['Results','The filtered list of actions'],['Highlighted item','What Enter will run'],['Groups','Headings like “Pages” and “Actions”']],
  opts:[['Ctrl / ⌘ K shortcut','opening with Ctrl+K on Windows and ⌘K on Mac',1],['Arrow keys and Enter','moving through results with the arrow keys and running the highlighted one with Enter',1],['Recent items','recently used commands shown when the input is empty',0]],
  a11y:'combobox and listbox roles, focus kept in the input, and Escape to close',
  html:()=>`<button class="dbtn ghost o">⌕ Search… <kbd>Ctrl K</kbd></button><div class="ov"><div class="cmdk"><input placeholder="Type a command…" aria-label="Command"><ul>${['New project','Open settings','Invite teammate','Switch theme','Log out'].map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`,
  init(r){const o=r.querySelector('.ov'),i=r.querySelector('.cmdk input'),li=[...r.querySelectorAll('.cmdk li')];const f=()=>{const q=i.value.toLowerCase();let first=true;li.forEach(x=>{const m=x.textContent.toLowerCase().includes(q);x.hidden=!m;x.classList.toggle('on',m&&first);if(m)first=false;});};r.querySelector('.o').onclick=()=>{o.classList.add('open');i.value='';f();i.focus();};i.oninput=f;i.onkeydown=e=>{if(e.key==='Escape'){e.stopPropagation();o.classList.remove('open');}};o.onclick=e=>{if(e.target===o||e.target.tagName==='LI')o.classList.remove('open');};f();},
  css:`
kbd{font:500 11px var(--mono);border:1px solid var(--line);border-radius:4px;padding:1px 5px;margin-left:8px;color:var(--muted)}
.cmdk{width:82%;max-width:280px;background:var(--demo-2);border-radius:10px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.25);font-size:13px;align-self:start;margin-top:8px}
.cmdk input{width:100%;border:0;border-bottom:1px solid var(--line);padding:9px 12px;background:transparent;outline:none}
.cmdk ul{list-style:none;margin:0;padding:4px}
.cmdk li{padding:4px 9px;border-radius:6px;cursor:pointer}
.cmdk li.on,.cmdk li:hover{background:var(--accent-soft)}
`
});
