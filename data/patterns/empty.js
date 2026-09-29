Whatsit.addPattern({id:'empty',name:'Empty state',aka:['Blank state','Zero state'],cat:'Feedback',
  say:'What a screen shows when there’s nothing in it yet, with a next step.',
  keys:'nothing empty blank no data results yet first time start illustration new zero none',
  use:'Lists, inboxes, dashboards and search results that can be empty.',
  avoid:'Leaving the area blank. An empty screen with no guidance feels broken.',
  confuse:[['skeleton','A skeleton says content is loading. An empty state says there is no content.']],
  parts:[['Illustration','A simple icon or drawing'],['Headline','What’s missing, like “No projects yet”'],['Explanation','One line on what goes here'],['Call to action','The button that fixes it']],
  opts:[['Primary action button','a button that creates the first item',1],['Separate “no results” version','a different message for empty search results, with a “Clear search” button',1],['Friendly illustration','a small friendly illustration',0]],
  a11y:'real text, never text baked into an image',
  html:()=>`<div class="empty-st"><svg viewBox="0 0 24 24"><path d="M3 7h6l2 2h10v10H3z"/></svg><b>No projects yet</b><span>Projects you create show up here.</span><button class="dbtn">New project</button></div>`,
  css:`
.empty-st{display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center;font-size:13px}
.empty-st svg{width:32px;height:32px;stroke:var(--muted);fill:none;stroke-width:1.6}
.empty-st span{color:var(--muted)}
.empty-st .dbtn{margin-top:6px;padding:6px 12px;font-size:12px}
`
});
