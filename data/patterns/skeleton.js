Whatsit.addPattern({id:'skeleton',name:'Skeleton loader',aka:['Skeleton screen','Loading placeholder','Shimmer'],cat:'Feedback',
  say:'Grey shapes where content will appear, shown while it loads.',
  keys:'loading grey gray boxes shimmer placeholder blank waiting lines shapes pulse load spinner',
  use:'Content takes a moment to load and you know roughly its layout.',
  avoid:'Loads faster than about 300ms. It just flickers.',
  confuse:[],
  parts:[['Block','A grey shape standing in for text or an image'],['Shimmer','The light sweep that shows it\'s working'],['Layout match','Shapes sized like the real content']],
  opts:[['Shimmer animation','a left-to-right shimmer, turned off for people who prefer reduced motion',1],['Match the card layout','shapes matching the real card: image, title line and two text lines',1]],
  a11y:'aria-busy="true" on the loading region',
  html:()=>`<div class="d-skel dbox"><div class="sk" style="width:52px;height:52px;border-radius:50%;flex:none"></div><div style="flex:1;display:flex;flex-direction:column;gap:8px"><div class="sk" style="height:12px;width:70%"></div><div class="sk" style="height:10px"></div><div class="sk" style="height:10px;width:85%"></div></div></div>`,
  css:`
.d-skel{width:86%;max-width:300px;display:flex;gap:12px;align-items:center}
.sk{background:color-mix(in srgb,var(--ink) 12%,transparent);border-radius:6px;position:relative;overflow:hidden}
.sk::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--demo-2) 70%,transparent),transparent);translate:-100% 0;animation:shim 1.4s infinite}
@keyframes shim{to{translate:100% 0}}
`
});
