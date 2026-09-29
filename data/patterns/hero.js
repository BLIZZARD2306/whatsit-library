Whatsit.addPattern({id:'hero',name:'Hero section',aka:['Hero','Hero banner','Above the fold'],cat:'Layout',
  say:'The big first section of a landing page: headline, short pitch and main button.',
  keys:'big headline top landing first section banner title subtitle call action get started main page',
  use:'Landing pages and home pages.',
  avoid:'Inside apps. People there want their data, not a pitch.',
  confuse:[['carousel','A hero is one fixed message. A carousel rotates several.'],['navbar','The navbar sits above the hero.']],
  parts:[['Eyebrow','The small label above the headline'],['Headline','The main promise'],['Subheadline','One supporting sentence'],['Call to action','Main and secondary buttons'],['Visual','A screenshot, image or illustration']],
  opts:[['Primary and secondary buttons','a main button and a secondary outlined button',1],['Product screenshot','a product screenshot or image beside or below the text',1],['Social proof line','a line like “Trusted by 2,000 teams” under the buttons',0]],
  a11y:'one h1 for the headline, and buttons with clear labels',
  html:()=>`<div class="hero"><em>New · v2.0</em><b>Ship your app this weekend</b><span>Templates, auth and payments ready to go.</span><div><button class="dbtn">Get started</button><button class="dbtn ghost">Live demo</button></div></div>`,
  css:`
.hero{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;max-width:280px}
.hero em{font-style:normal;font-size:11px;background:var(--accent-soft);padding:2px 8px;border-radius:999px}
.hero b{font:800 19px/1.1 var(--display);text-wrap:balance}
.hero span{font-size:12px;color:var(--muted)}
.hero div{display:flex;gap:6px;margin-top:6px}
.hero .dbtn{padding:6px 10px;font-size:12px}
`
});
