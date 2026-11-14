Whatsit.addPattern({id:'bento',name:'Bento grid',aka:['Bento box layout','Feature grid','Mosaic grid','Tile layout'],cat:'Layout',
  say:'Rounded boxes of different sizes packed into one neat rectangle, like a lunch box with compartments.',
  keys:'boxes different sizes grid tiles big one small ones rounded apple style features section lunch box compartments mosaic collage',
  use:'Showing off several features or facts at once on a landing page, with the most important one in the biggest box.',
  avoid:'Lists where every item matters equally, like products or search results. Use plain cards in an even grid.',
  confuse:[['card','A card is one box. A bento grid is how several boxes of different sizes fit together.'],['kanban','A kanban board has columns you move cards between. A bento grid is a fixed layout.'],['pricing','A pricing table lines up plans to compare. A bento grid mixes unrelated highlights.']],
  parts:[['Tile','One box in the grid'],['Feature tile','The big box that gets the most space'],['Gap','The even space between tiles'],['Span','How many columns or rows a tile covers']],
  opts:[['One big feature tile','one tile twice the size of the others for the main feature',1],['Stack on mobile','tiles stacked in a single column on small screens',1],['Hover lift','a slight lift and shadow on hover',0],['Mini visuals','a small illustration, chart or number inside each tile',0]],
  a11y:'a reading order that still makes sense when tiles stack, and a real heading in each tile',
  html:()=>`<div class="bn"><div class="bn-a"><b>Fast</b><small>Loads in under a second</small></div><div class="bn-b"><b>99.9%</b><small>Uptime</small></div><div><b>Secure</b></div><div><b>Teams</b></div></div>`,
  css:`
.bn{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:6px;width:100%;height:100%}
.bn>div{background:var(--demo-2);border:1px solid var(--line);border-radius:12px;padding:9px 10px;display:flex;flex-direction:column;justify-content:flex-end;gap:1px;transition:transform .2s}
.bn>div:hover{transform:translateY(-2px)}
.bn b{font:700 14px var(--display)}
.bn small{font-size:10px;color:var(--muted)}
.bn .bn-a{grid-column:span 2}
.bn .bn-b{grid-row:span 2;grid-column:3;grid-row-start:1;background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.bn .bn-b b{font-size:20px}
.bn .bn-b small{color:inherit;opacity:.85}
`
});
