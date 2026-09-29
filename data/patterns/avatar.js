Whatsit.addPattern({id:'avatar',name:'Avatar group',aka:['Avatar stack','Profile pictures','Facepile'],cat:'Data',
  say:'Round profile pictures or initials, overlapped in a row.',
  keys:'profile picture photo circle round initials faces people users team members stacked overlapping row more',
  use:'Showing who is on a team, in a chat, or working on a document.',
  avoid:'When names matter more than faces. List the names instead.',
  confuse:[['badge','A badge shows a count on an icon. An avatar shows a person.'],['chips','Chips are text labels. Avatars are pictures of people.']],
  parts:[['Avatar','One circle with a photo or initials'],['Initials fallback','Letters shown when there is no photo'],['Overlap','Each circle tucked under the next'],['Overflow count','The “+3” circle for everyone else']],
  opts:[['Initials with colors','initials on a colored background when there is no photo, with the color picked from the name',1],['Name on hover','a tooltip with the person’s name on hover',1],['Online status dot','a small green dot for people who are online',0]],
  a11y:'alt text or an aria-label with each person’s name',
  html:()=>`<div class="avg"><span style="background:#2E7C8C">MR</span><span style="background:#9A5B34">JD</span><span style="background:#5A6B2E">AK</span><span style="background:#6B4C9A">LS</span><span class="more">+3</span></div>`,
  css:`
.avg{display:flex}
.avg span{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;color:#fff;font:700 14px var(--body);border:3px solid var(--demo);margin-left:-12px}
.avg span:first-child{margin-left:0}
.avg .more{background:var(--demo-2);color:var(--ink)}
`
});
