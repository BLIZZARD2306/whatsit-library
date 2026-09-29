Whatsit.addPattern({id:'range',name:'Range slider',aka:['Slider','Range input'],cat:'Forms',
  say:'A handle you drag along a track to pick a number.',
  keys:'drag slide handle volume price range number track bar min max brightness',
  use:'Picking an approximate value like volume, or a price range.',
  avoid:'Exact numbers. Use a number field.',
  confuse:[['carousel','People also call carousels “sliders”. If you mean moving pictures, say carousel.']],
  parts:[['Track','The line'],['Thumb','The handle you drag'],['Fill','The colored part of the track up to the thumb'],['Value label','The current number']],
  opts:[['Show the current value','the current value shown next to the slider',1],['Two handles (min and max)','two handles for a min–max range, like a price filter',0],['Step marks','tick marks at each step',0]],
  a11y:'a native range input, or role="slider" with aria-valuenow',
  html:()=>`<label class="d-range dbox">Max price <input type="range" min="10" max="200" value="80"><output>$80</output></label>`,
  init(r){const i=r.querySelector('input'),o=r.querySelector('output');i.oninput=()=>o.textContent='$'+i.value;},
  css:`
.d-range{display:flex;flex-direction:column;gap:8px;width:80%;max-width:260px;font-size:14px}
.d-range input{accent-color:var(--accent);width:100%}
.d-range output{font:500 13px var(--mono)}
`
});
