Whatsit.addPattern({id:'search',name:'Search bar',aka:['Search box','Search field','Autocomplete'],cat:'Forms',
  say:'A text box with a magnifying glass that finds things as you type.',
  keys:'search magnifying glass find look up type box suggestions autocomplete results filter query',
  use:'Any site with more content than fits on one screen: shops, docs, settings.',
  avoid:'Tiny sites with a handful of pages. Plain navigation is enough.',
  confuse:[['cmdk','A command palette opens with a keyboard shortcut and runs actions. A search bar sits on the page and finds content.'],['input','A search bar is a text input plus a search icon, a clear button and suggestions.']],
  parts:[['Icon','The magnifying glass'],['Input','Where you type'],['Clear button','The × that empties it'],['Suggestions','The list that appears while typing'],['Highlight','The matching letters in bold']],
  opts:[['Live suggestions','suggestions that appear while typing, with the matching text in bold',1],['Clear button','an × button that clears the text',1],['Recent searches','recent searches shown when the box is focused and empty',0],['Press / to search','pressing / anywhere focuses the search box',0]],
  a11y:'role="search" on the form, a label for the input, and combobox semantics for the suggestions',
  html:()=>`<div class="sb-w"><div class="sb"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input value="Ru" placeholder="Search products" aria-label="Search products"><button class="sb-x" aria-label="Clear search">×</button></div><ul class="sb-s" role="listbox"></ul></div>`,
  init(r){const i=r.querySelector('.sb input'),x=r.querySelector('.sb-x'),ul=r.querySelector('.sb-s'),items=['Running shoes','Rain jacket','Road bike','Rucksack','Sun hat','Sunglasses','Hiking boots','Water bottle'];
    const draw=()=>{const q=i.value.trim().toLowerCase();x.hidden=!q;const m=q?items.filter(t=>t.toLowerCase().includes(q)).slice(0,4):[];ul.hidden=!m.length;
      ul.innerHTML=m.map(t=>{const k=t.toLowerCase().indexOf(q);return `<li role="option">${t.slice(0,k)}<b>${t.slice(k,k+q.length)}</b>${t.slice(k+q.length)}</li>`;}).join('');
      ul.querySelectorAll('li').forEach(li=>li.onclick=()=>{i.value=li.textContent;draw();ul.hidden=true;});};
    i.oninput=draw;x.onclick=()=>{i.value='';draw();i.focus();};draw();},
  css:`
.sb-w{position:relative;width:86%;max-width:280px;align-self:start;margin-top:12px}
.sb{display:flex;align-items:center;gap:8px;background:var(--demo-2);border:1px solid var(--line);border-radius:999px;padding:0 12px}
.sb:focus-within{outline:2px solid var(--accent)}
.sb svg{width:16px;height:16px;stroke:var(--muted);fill:none;stroke-width:2.2;flex:none}
.sb input{flex:1;min-width:0;border:0;background:transparent;padding:9px 0;font-size:14px;outline:none}
.sb-x{border:0;background:none;cursor:pointer;color:var(--muted);font-size:16px;padding:0 2px}
.sb-s{list-style:none;margin:6px 0 0;padding:4px;background:var(--demo-2);border:1px solid var(--line);border-radius:12px;font-size:13px;box-shadow:0 8px 20px rgba(0,0,0,.12)}
.sb-s li{padding:5px 10px;border-radius:8px;cursor:pointer;color:var(--muted)}
.sb-s li b{color:var(--ink)}
.sb-s li:hover{background:var(--accent-soft)}
`
});
