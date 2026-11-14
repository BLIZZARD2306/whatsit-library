Whatsit.addPattern({id:'swipe',name:'Swipe actions',aka:['Swipe to delete','Swipeable row','Slide actions','Swipe to archive'],cat:'Data',
  say:'Drag a row in a list sideways and buttons like Archive and Delete appear behind it.',
  keys:'slide row sideways left delete archive red button appears behind list item mail inbox phone drag finger swipe',
  use:'Quick actions on list items in phone apps: mail, messages, to-dos, notifications.',
  avoid:'The only way to do something. Swipes are invisible, so the same actions need to live in a menu too.',
  confuse:[['contextmenu','A context menu opens on right-click or long-press. Swipe actions slide out from under the row.'],['carousel','A carousel swipes between slides. Swipe actions reveal buttons on one row.'],['drawer','A drawer slides a whole panel in from the edge. Swipe actions belong to a single row.']],
  parts:[['Row','The list item you drag'],['Action buttons','What’s revealed behind it'],['Threshold','How far you must drag before it stays open'],['Full swipe','Dragging all the way to run the first action'],['Undo','A toast that lets you take it back']],
  opts:[['Archive and Delete','“Archive” and a red “Delete” revealed by swiping left',1],['Undo toast','an “Undo” toast for five seconds after the action',1],['Menu alternative','the same actions in a “⋯” menu for mouse and keyboard users',1],['Full swipe','a full swipe running the first action immediately',0],['Second side','a different action when swiping right, like “Mark as read”',0]],
  a11y:'every swipe action also reachable from a button or menu, and the result announced (“Message archived”)',
  html:()=>`<ul class="swp">${[['Dana','Lunch tomorrow?'],['Lee','Invoice attached'],['Kai','Photos from Saturday']].map(([n,m])=>`<li><div class="swp-a"><button class="swp-ar">Archive</button><button class="swp-de">Delete</button></div><div class="swp-c"><span><b>${n}</b><small>${m}</small></span><button class="swp-m" aria-label="Actions for ${n}" aria-expanded="false">⋯</button></div></li>`).join('')}</ul>`,
  init(r){const w=r.querySelector('.swp'),o=w.innerHTML;const bind=()=>{const rows=[...w.children];const open=(li,x)=>rows.forEach(y=>{const on=y===li&&x;y.classList.toggle('open',on);y.querySelector('.swp-m').setAttribute('aria-expanded',on);});rows.forEach(li=>{const c=li.querySelector('.swp-c');let x0=null;c.onpointerdown=e=>{x0=e.clientX;};c.onpointerup=e=>{if(x0===null)return;const d=e.clientX-x0;x0=null;if(d<-24)open(li,true);else if(d>24)open(li,false);};c.onpointercancel=()=>{x0=null;};li.querySelector('.swp-m').onclick=()=>open(li,!li.classList.contains('open'));li.querySelectorAll('.swp-a button').forEach(b=>b.onclick=()=>{li.remove();if(!w.children.length){w.innerHTML='<li class="swp-e"><button class="dbtn ghost">Inbox zero · reset</button></li>';w.querySelector('button').onclick=()=>{w.innerHTML=o;bind();};}});});};bind();},
  css:`
.swp{list-style:none;margin:0;padding:0;width:100%;display:grid;gap:5px}
.swp li{position:relative;overflow:hidden;border-radius:10px;border:1px solid var(--line)}
.swp li.swp-e{border:0;display:grid;place-items:center;overflow:visible}
.swp-a{position:absolute;top:0;bottom:0;right:0;display:flex;visibility:hidden}
.swp li.open .swp-a{visibility:visible}
.swp-a button{border:0;width:58px;font-size:11px;font-weight:700;color:#fff;cursor:pointer}
.swp-ar{background:#56655F}
.swp-de{background:#B8412F}
.swp-c{position:relative;display:flex;justify-content:space-between;align-items:center;background:var(--demo-2);padding:4px 6px 4px 12px;transition:transform .2s;touch-action:pan-y;cursor:grab;user-select:none}
.swp li.open .swp-c{transform:translateX(-116px)}
.swp-c span{display:grid;line-height:1.25}
.swp-c b{font-size:12px}
.swp-c small{font-size:11px;color:var(--muted)}
.swp-m{border:0;background:none;color:var(--muted);font-size:16px;cursor:pointer;width:28px;height:28px;border-radius:6px}
`
});
