Whatsit.addPattern({id:'kanban',name:'Kanban board',aka:['Task board','Board view','Trello board'],cat:'Layout',
  say:'Columns like To do, Doing and Done, with cards you drag between them.',
  keys:'columns cards drag drop tasks todo doing done board trello project status move lanes',
  use:'Tracking work that moves through stages: tasks, orders, hiring.',
  avoid:'Long lists that need sorting and filtering. Use a data table.',
  confuse:[['table','A table compares many fields per row. A board shows which stage each item is in.'],['card','A kanban board is made of cards arranged in columns.']],
  parts:[['Column','One stage, like “Doing”'],['Card','One task'],['Count','How many cards a column holds'],['Drop zone','Where a dragged card will land'],['Add button','Creates a new card in a column']],
  opts:[['Drag and drop','dragging cards between columns and reordering them within a column',1],['Card count per column','the number of cards shown in each column header',1],['Add card button','an “Add card” button at the bottom of each column',0],['Move with the keyboard','moving a focused card with the arrow keys',0]],
  a11y:'a keyboard way to move cards (not only dragging), with the new position announced',
  html:()=>`<div class="kb">${['To do','Doing','Done'].map(c=>`<div class="kb-c" data-c="${c}"><b>${c}<span></span></b></div>`).join('')}</div>`,
  init(r){const cols=[...r.querySelectorAll('.kb-c')],cards=[['Design logo',0],['Write copy',0],['Build navbar',1],['Set up repo',2]];let drag=null;
    const count=()=>cols.forEach(c=>c.querySelector('span').textContent=c.querySelectorAll('.kb-k').length);
    cards.forEach(([t,ci])=>{const k=document.createElement('div');k.className='kb-k';k.textContent=t;k.draggable=true;k.tabIndex=0;k.title='Drag to move, or click to move right';
      k.ondragstart=e=>{drag=k;k.classList.add('dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',t);};
      k.ondragend=()=>{k.classList.remove('dragging');drag=null;cols.forEach(c=>c.classList.remove('over'));count();};
      k.onclick=()=>{const i=cols.indexOf(k.parentElement);cols[(i+1)%cols.length].appendChild(k);count();};
      cols[ci].appendChild(k);});
    cols.forEach(c=>{c.ondragover=e=>{e.preventDefault();c.classList.add('over');};c.ondragleave=()=>c.classList.remove('over');c.ondrop=e=>{e.preventDefault();if(drag)c.appendChild(drag);c.classList.remove('over');count();};});
    count();},
  css:`
.kb{display:flex;gap:6px;width:94%;max-width:330px}
.kb-c{flex:1;min-width:0;background:color-mix(in srgb,var(--ink) 6%,transparent);border-radius:8px;padding:5px;display:flex;flex-direction:column;gap:4px;min-height:124px;transition:background .15s}
.kb-c.over{background:var(--accent-soft)}
.kb-c>b{display:flex;justify-content:space-between;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);padding:2px 2px 0}
.kb-k{background:var(--demo-2);border:1px solid var(--line);border-radius:6px;padding:5px 6px;font-size:11px;cursor:grab;user-select:none}
.kb-k:active{cursor:grabbing}
.kb-k.dragging{opacity:.4}
`
});
