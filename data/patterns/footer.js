Whatsit.addPattern({id:'footer',name:'Footer',aka:['Site footer','Page footer','Fat footer','Bottom links'],cat:'Layout',
  say:'The block at the very bottom of every page with columns of links, the logo and the copyright line.',
  keys:'bottom of page links columns copyright privacy terms about contact social icons newsletter end of site sitemap',
  use:'Every public page. It’s where people look for About, Contact, Privacy and Terms.',
  avoid:'The only way to reach something important. Most visitors never scroll that far.',
  confuse:[['navbar','A navigation bar sits at the top with the few main links. A footer sits at the bottom with everything else.'],['tabbar','A bottom tab bar stays on screen in an app. A footer is only at the end of the page.'],['cookie','A cookie banner floats at the bottom until answered. A footer is part of the page.']],
  parts:[['Brand block','Logo and a one-line description'],['Link columns','Groups like Product, Company, Help'],['Bottom bar','Copyright, Privacy and Terms'],['Social links','Icons for social accounts'],['Newsletter form','An optional email sign-up']],
  opts:[['Link columns','three or four columns of links with a heading each',1],['Bottom bar','a bottom bar with the copyright line and Privacy and Terms links',1],['Social icons','a row of social media icons',0],['Newsletter sign-up','an email field with a “Subscribe” button',0],['Stack on mobile','columns stacked or collapsed into accordions on small screens',1]],
  a11y:'a footer landmark, link groups marked up as lists with headings, and social icons that have text labels',
  html:()=>`<div class="ft"><div class="ft-c"><div><b>Acme</b><small>Tools for small teams.</small></div><div><b>Product</b><span>Features</span><span>Pricing</span></div><div><b>Company</b><span>About</span><span>Careers</span></div></div><div class="ft-b"><span>© Acme Inc.</span><span>Privacy · Terms</span></div></div>`,
  css:`
.ft{width:100%;align-self:end;background:var(--demo-2);border:1px solid var(--line);border-radius:12px;padding:10px 12px;font-size:11px}
.ft-c{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:8px}
.ft-c div{display:grid;gap:3px;align-content:start}
.ft-c b{font-size:12px}
.ft-c span,.ft-c small{color:var(--muted)}
.ft-b{display:flex;justify-content:space-between;border-top:1px solid var(--line);margin-top:8px;padding-top:6px;color:var(--muted);font-size:10px}
`
});
