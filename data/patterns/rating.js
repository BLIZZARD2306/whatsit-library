Whatsit.addPattern({id:'rating',name:'Star rating',aka:['Rating','Review stars'],cat:'Forms',
  say:'A row of stars you click to give a score out of five.',
  keys:'stars star rate rating review score five feedback yellow click out of',
  use:'Reviews, feedback forms, and showing average scores.',
  avoid:'Detailed feedback. Ask a question instead.',
  confuse:[['range','A range slider picks any value on a scale. Stars pick a whole score from 1 to 5.']],
  parts:[['Star','One point'],['Filled / empty','Selected or not'],['Hover preview','Stars fill as you point'],['Half star','Used for averages like 4.5'],['Count','e.g. “(212 reviews)”']],
  opts:[['Hover preview','stars filling as the pointer moves over them',1],['Read-only average with half stars','a read-only version showing averages with half stars, like 4.5',1],['Review count','the number of reviews next to the stars',0]],
  a11y:'a radiogroup with labels like "4 stars", usable with the arrow keys',
  html:()=>`<div class="rate"><div class="stars" role="radiogroup" aria-label="Rating">${[1,2,3,4,5].map(n=>`<button role="radio" aria-label="${n} star${n>1?'s':''}">★</button>`).join('')}</div><span>4 of 5</span></div>`,
  init(r){const s=[...r.querySelectorAll('.stars button')],t=r.querySelector('.rate>span');let v=4;const paint=n=>s.forEach((x,i)=>x.classList.toggle('on',i<n));s.forEach((x,i)=>{x.onmouseenter=()=>paint(i+1);x.onclick=()=>{v=i+1;t.textContent=v+' of 5';s.forEach((y,k)=>y.setAttribute('aria-checked',k===i));};});r.querySelector('.stars').onmouseleave=()=>paint(v);paint(v);},
  css:`
.rate{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:13px;color:var(--muted)}
.stars{display:flex}
.stars button{border:0;background:none;font-size:30px;line-height:1;cursor:pointer;color:color-mix(in srgb,var(--ink) 20%,transparent);padding:0 2px}
.stars button.on{color:#E0A526}
`
});
