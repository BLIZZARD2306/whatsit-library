Whatsit.addPattern({id:'progress',name:'Progress bar',aka:['Loading bar','Progress indicator'],cat:'Feedback',
  say:'A bar that fills up to show how much of a task is done.',
  keys:'bar fills filling percent percentage loading upload download progress complete track how much done',
  use:'Uploads, downloads, installs, or any wait where you know the percentage.',
  avoid:'Waits with no known length. Use a spinner.',
  confuse:[['spinner','A spinner says “working” without a percentage. A progress bar shows how far along it is.'],['stepper','A stepper shows named steps. A progress bar shows a percentage.']],
  parts:[['Track','The empty bar'],['Fill','The colored part that grows'],['Label','Text like “64%” or “3 of 5 files”'],['Indeterminate','A moving stripe when the percentage is unknown']],
  opts:[['Percentage label','the percentage shown as text',1],['Striped animation','animated stripes on the fill',0],['Success state','a “Done” state when it reaches 100%',1]],
  a11y:'role="progressbar" with aria-valuenow, aria-valuemin and aria-valuemax',
  html:()=>`<div class="prg dbox"><div class="row"><span>Uploading photos</span><b>0%</b></div><div class="trk"><i></i></div><button class="dbtn ghost">Restart</button></div>`,
  init(r){const f=r.querySelector('.trk i'),t=r.querySelector('.prg b');let v=0,h;const run=()=>{clearInterval(h);v=0;h=setInterval(()=>{v=Math.min(100,v+2);f.style.width=v+'%';t.textContent=v===100?'Done':v+'%';if(v===100)clearInterval(h);},40);};r.querySelector('.prg button').onclick=run;run();},
  css:`
.prg{width:84%;max-width:300px;display:flex;flex-direction:column;gap:8px}
.trk{height:8px;border-radius:999px;background:color-mix(in srgb,var(--ink) 12%,transparent);overflow:hidden}
.trk i{display:block;height:100%;width:0;background:var(--accent);border-radius:inherit;transition:width .1s linear}
.prg .dbtn{align-self:flex-start;padding:5px 10px;font-size:12px}
`
});
