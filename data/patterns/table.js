Whatsit.addPattern({id:'table',name:'Data table',aka:['Table','Grid','Spreadsheet view'],cat:'Data',
  say:'Rows and columns of data, often sortable by clicking a header.',
  keys:'rows columns table spreadsheet grid data sort sortable header list excel records admin',
  use:'Comparing many records with the same fields: users, orders, invoices.',
  avoid:'Many columns on a phone. Switch to cards on small screens.',
  confuse:[['card','Cards suit browsing items with images. Tables suit comparing values.']],
  parts:[['Header','The column names'],['Row','One record'],['Sort arrow','Shows the sort direction'],['Pagination','Pages for long tables'],['Row actions','Edit / delete on each row']],
  opts:[['Sortable columns','sorting by clicking a column header, with an arrow showing the direction',1],['Search filter','a search box that filters the rows',1],['Sticky header','the header staying visible while scrolling',0],['Cards on mobile','rows turning into cards on small screens',1]],
  a11y:'real table markup, th elements with scope, and aria-sort on the sorted column',
  html:()=>`<table class="tbl"><thead><tr><th><button data-k="0">Name</button></th><th><button data-k="1">Plan</button></th><th><button data-k="2">MRR</button></th></tr></thead><tbody></tbody></table>`,
  init(r){const rows=[['Acme','Pro',490],['Bloom','Starter',49],['Cobalt','Team',199]],tb=r.querySelector('tbody'),hs=[...r.querySelectorAll('th button')],base=['Name','Plan','MRR'];let k=2,dir=-1;const draw=()=>{rows.sort((a,b)=>(a[k]>b[k]?1:-1)*dir);tb.innerHTML=rows.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td>$${x[2]}</td></tr>`).join('');hs.forEach((h,i)=>h.textContent=base[i]+(i===k?(dir>0?' ↑':' ↓'):''));};hs.forEach(h=>h.onclick=()=>{const n=+h.dataset.k;dir=n===k?-dir:1;k=n;draw();});draw();},
  css:`
.tbl{border-collapse:collapse;font-size:12px;background:var(--demo-2);border-radius:8px;overflow:hidden;width:88%;max-width:300px}
.tbl th,.tbl td{padding:6px 10px;text-align:left;border-bottom:1px solid var(--line)}
.tbl th:last-child,.tbl td:last-child{text-align:right;font-variant-numeric:tabular-nums}
.tbl th button{border:0;background:none;font:700 12px var(--body);cursor:pointer;padding:0;color:var(--muted)}
.tbl tr:last-child td{border-bottom:0}
`
});
