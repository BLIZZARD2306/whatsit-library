Whatsit.addPattern({id:'bubble',name:'Chat bubbles',aka:['Message bubbles','Speech bubbles','Message thread','Conversation view'],cat:'Data',
  say:'Messages in rounded bubbles: yours on the right in color, theirs on the left in grey.',
  keys:'messages text bubbles left right mine theirs conversation chat whatsapp imessage typing three dots read sent ai assistant reply',
  use:'Any back-and-forth conversation: chat, support, comments with replies, AI assistants.',
  avoid:'Long, formal messages like email. Those read better as a list with full-width text.',
  confuse:[['toast','A toast is a short message from the app that disappears. A chat bubble is a message from a person and stays.'],['timeline','A timeline lists events in order. Chat bubbles show a conversation between two sides.'],['tooltip','A tooltip is a hint on hover. A chat bubble is a message.']],
  parts:[['Sent bubble','Your message, on the right'],['Received bubble','Their message, on the left'],['Tail','The small corner that points to the sender'],['Status','Sent, Delivered or Read under your last message'],['Typing indicator','Three bouncing dots while they write'],['Composer','The text box and send button']],
  opts:[['Typing indicator','a typing indicator with three animated dots',1],['Read status','“Sent”, “Delivered” and “Read” under the last sent message',1],['Group by sender','consecutive messages from one person grouped, with the avatar shown once',1],['Timestamps','a time under each group and date dividers like “Today”',0],['Scroll to newest','the list scrolling to the newest message, with a “New messages” button when scrolled up',0]],
  a11y:'the message list as a log region so new messages are announced, and each bubble saying who sent it',
  html:()=>`<div class="cb"><div class="cb-l" role="log" aria-label="Messages"><p class="cb-t">Are we still on for 3?</p><p class="cb-m">Yes! See you there<small>Read</small></p><p class="cb-t cb-ty" aria-label="Sam is typing"><i></i><i></i><i></i></p></div><form class="cb-f"><input aria-label="Message" placeholder="Message" autocomplete="off"><button class="dbtn" aria-label="Send">↑</button></form></div>`,
  init(r){const l=r.querySelector('.cb-l'),f=r.querySelector('.cb-f'),i=f.querySelector('input'),ty=r.querySelector('.cb-ty');f.onsubmit=e=>{e.preventDefault();const v=i.value.trim();if(!v)return;l.querySelectorAll('.cb-m small').forEach(s=>s.remove());const p=document.createElement('p');p.className='cb-m';p.textContent=v;const s=document.createElement('small');s.textContent='Sent';p.appendChild(s);l.insertBefore(p,ty);i.value='';l.scrollTop=l.scrollHeight;};},
  css:`
.cb{position:absolute;inset:12px;display:grid;grid-template-rows:minmax(0,1fr) auto;gap:6px}
.cb-l{overflow-y:auto;display:flex;flex-direction:column;gap:4px;min-height:0}
.cb-l>:first-child{margin-top:auto}
.cb-l p{margin:0;max-width:78%;padding:6px 10px;border-radius:14px;font-size:12px;overflow-wrap:anywhere}
.cb-t{align-self:flex-start;background:var(--demo-2);border:1px solid var(--line);border-bottom-left-radius:4px}
.cb-m{align-self:flex-end;background:var(--accent);color:var(--accent-ink);border-bottom-right-radius:4px}
.cb-m small{display:block;font-size:9px;opacity:.8;text-align:right}
.cb-l .cb-ty{display:flex;gap:3px;padding:9px 10px}
.cb-ty i{width:5px;height:5px;border-radius:50%;background:var(--muted);animation:cb-b 1s infinite}
.cb-ty i:nth-child(2){animation-delay:.15s}.cb-ty i:nth-child(3){animation-delay:.3s}
@keyframes cb-b{50%{transform:translateY(-3px);opacity:.5}}
.cb-f{display:flex;gap:6px}
.cb-f input{flex:1;min-width:0;border:1px solid var(--line);background:var(--demo-2);color:var(--ink);border-radius:999px;padding:6px 12px;font-size:12px}
.cb-f button{border-radius:50%;width:30px;height:30px;padding:0}
`
});
