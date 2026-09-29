Whatsit.addPattern({id:'dropzone',name:'File dropzone',aka:['File upload','Drag-and-drop upload','Uploader'],cat:'Forms',
  say:'A dashed box you drag files into, or click to pick them.',
  keys:'upload file files drag drop dashed box attach image photo browse choose document',
  use:'Uploading photos, documents or attachments.',
  avoid:'One small upload on a phone. A plain “Choose file” button is enough.',
  confuse:[['progress','Pair a dropzone with a progress bar to show each upload.']],
  parts:[['Drop area','The dashed box'],['Browse link','Opens the file picker'],['Rules','Allowed types and maximum size'],['Drag-over state','The highlight while a file hovers'],['File list','What was added, with remove buttons']],
  opts:[['Image previews','thumbnails of the chosen images',1],['Type and size limits','rejecting files that aren’t PNG or JPG or are over 5 MB, with a clear error',1],['Multiple files with progress','several files at once, each with its own progress bar',0]],
  a11y:'a real file input inside a label, so it works with the keyboard and screen readers',
  html:u=>`<label class="drop" for="f${u}"><input type="file" id="f${u}" hidden><svg viewBox="0 0 24 24"><path d="M12 16V4m0 0-5 5m5-5 5 5M4 20h16"/></svg><b>Drop files here</b><span>or <u>browse</u> · PNG, JPG up to 5 MB</span></label>`,
  init(r){const d=r.querySelector('.drop'),i=d.querySelector('input'),s=d.querySelector('span');const show=f=>{if(f)s.textContent='✓ '+f.name;};i.onchange=()=>show(i.files[0]);['dragenter','dragover'].forEach(e=>d.addEventListener(e,x=>{x.preventDefault();d.classList.add('over');}));['dragleave','drop'].forEach(e=>d.addEventListener(e,x=>{x.preventDefault();d.classList.remove('over');}));d.addEventListener('drop',x=>show(x.dataTransfer.files[0]));},
  css:`
.drop{width:86%;max-width:300px;border:2px dashed var(--line);border-radius:12px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:13px;cursor:pointer;background:var(--demo-2);text-align:center}
.drop.over{border-color:var(--accent);background:var(--accent-soft)}
.drop svg{width:24px;height:24px;stroke:var(--accent);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.drop span{color:var(--muted);font-size:12px}
`
});
