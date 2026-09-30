Whatsit.addPattern({id:'swatch',name:'Color swatches',aka:['Color picker','Swatch selector','Variant picker'],cat:'Forms',
  say:'A row of colored circles you click to choose a color, like picking a product variant.',
  keys:'color colour circles swatch pick choose variant product shirt option dots palette picker',
  use:'Product variants like color or finish, and choosing a theme or label color.',
  avoid:'Showing colors without names. Some people can’t tell colors apart, so always show the name too.',
  confuse:[['radio','Swatches are a visual radio group: you pick exactly one, shown as colors.'],['segmented','A segmented control picks between text options. Swatches pick colors.']],
  parts:[['Swatch','One colored circle'],['Selected ring','The outline around the chosen color'],['Color name','Text naming the chosen color'],['Sold out','A crossed-out swatch that can’t be picked']],
  opts:[['Show the color name','the chosen color’s name shown next to the label',1],['Sold-out state','a crossed-out, disabled swatch for unavailable colors',1],['Custom color','a “+” swatch that opens a full color picker',0]],
  a11y:'a radiogroup where each swatch uses the color name as its label',
  html:()=>`<div class="sw-w"><span class="sw-l">Color: <b>Teal</b></span><div class="sw" role="radiogroup" aria-label="Color">${[['Teal','#2E7C8C'],['Rust','#B4532A'],['Olive','#6C8A2E'],['Plum','#7B4B94'],['Sand','#D8C3A5',1]].map(([n,c,so],i)=>`<button role="radio" aria-label="${n}${so?' (sold out)':''}" aria-checked="${i===0}" style="--sw:${c}"${so?' class="so" disabled':''}></button>`).join('')}</div></div>`,
  init(r){const b=[...r.querySelectorAll('.sw button:not(:disabled)')],l=r.querySelector('.sw-l b');b.forEach(x=>x.onclick=()=>{b.forEach(y=>y.setAttribute('aria-checked',y===x));l.textContent=x.getAttribute('aria-label');});},
  css:`
.sw-w{display:flex;flex-direction:column;gap:10px;align-items:center;font-size:13px}
.sw{display:flex;gap:10px}
.sw button{position:relative;width:30px;height:30px;border-radius:50%;border:0;padding:0;background:var(--sw);cursor:pointer;box-shadow:0 0 0 2px var(--demo),0 0 0 3px transparent;transition:box-shadow .15s}
.sw button[aria-checked="true"]{box-shadow:0 0 0 2px var(--demo),0 0 0 4px var(--ink)}
.sw button.so{cursor:not-allowed;opacity:.55}
.sw button.so::after{content:"";position:absolute;left:50%;top:-2px;bottom:-2px;width:2px;background:var(--ink);rotate:45deg}
`
});
