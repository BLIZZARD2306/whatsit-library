Whatsit.addPattern({id:'codeblock',name:'Code block',aka:['Code snippet','Code box','Copy code box'],cat:'Data',
  say:'A dark box of code in even-width letters, with colors for different words and a Copy button in the corner.',
  keys:'code box dark background copy button snippet terminal command colored words monospace install docs developer line numbers',
  use:'Anything people will copy and paste: commands, API keys, config, examples in docs.',
  avoid:'A word or two of code inside a sentence. That’s inline code, a small grey highlight.',
  confuse:[['input','A text input is for typing. A code block is for reading and copying.'],['table','A table lines up values in rows and columns. A code block keeps text exactly as written.'],['alert','An alert banner calls out a message. A code block shows text to copy.']],
  parts:[['Header','The file name or language'],['Copy button','Copies everything in the box'],['Line numbers','The grey numbers down the side'],['Syntax highlighting','Colors for keywords, text and comments'],['Scroll area','Sideways scrolling for long lines']],
  opts:[['Copy button with feedback','a Copy button that changes to “Copied” for two seconds',1],['Syntax highlighting','syntax highlighting for the language shown',1],['Line numbers','line numbers that aren’t included when copying',0],['File name header','a header bar with the file name or language',1],['Tabs for variants','tabs to switch between npm, pnpm and yarn versions',0]],
  a11y:'real pre and code elements, a Copy button with a label, “Copied” announced to screen readers, and the scroll area focusable by keyboard',
  html:()=>`<div class="cdb"><div class="cdb-h"><span>setup.sh</span><button class="cdb-c">Copy</button></div><pre tabindex="0"><code><span><em>npm</em> install whatsit</span><span><em>npx</em> whatsit init</span><span><em>echo</em> <i>"Ready"</i></span></code></pre></div>`,
  init(r){const b=r.querySelector('.cdb-c'),c=r.querySelector('code');let id=0;b.onclick=()=>{const t=[...c.children].map(s=>s.textContent).join('\n');if(navigator.clipboard)navigator.clipboard.writeText(t).catch(()=>{});b.textContent='Copied ✓';clearTimeout(id);id=setTimeout(()=>{b.textContent='Copy';},2000);};},
  css:`
.cdb{width:100%;max-width:250px;border-radius:10px;overflow:hidden;border:1px solid var(--line);background:#0F1715;color:#DCE7E2;font:12px var(--mono)}
.cdb-h{display:flex;justify-content:space-between;align-items:center;padding:5px 6px 5px 12px;background:rgba(255,255,255,.07);font-size:11px;color:#9FB1AA}
.cdb-c{border:1px solid rgba(255,255,255,.22);background:transparent;color:#DCE7E2;border-radius:6px;padding:3px 8px;font:11px var(--body);cursor:pointer}
.cdb pre{margin:0;padding:10px 12px;overflow-x:auto;counter-reset:l}
.cdb code{display:grid;gap:3px;font:inherit}
.cdb code span{counter-increment:l;white-space:pre}
.cdb code span::before{content:counter(l);display:inline-block;width:12px;margin-right:12px;color:#5F726B;text-align:right}
.cdb em{font-style:normal;color:#8FD3C8}
.cdb i{font-style:normal;color:#F0C48A}
`
});
