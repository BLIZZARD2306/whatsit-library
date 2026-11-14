Whatsit.addPattern({id:'testimonial',name:'Testimonial',aka:['Customer quote','Review card','Social proof','Quote card'],cat:'Layout',
  say:'A short quote from a happy customer with their photo, name and job.',
  keys:'quote customer said review photo name job company stars what people say love social proof trust wall of love',
  use:'Landing and pricing pages, right where someone is deciding whether to trust you.',
  avoid:'Made-up quotes or stock photos. People can tell, and it costs more trust than it earns.',
  confuse:[['rating','A star rating collects a score. A testimonial shows what someone said.'],['card','A testimonial is a card built around a quote and the person who said it.'],['marquee','A logo marquee shows who uses you. A testimonial shows what they say.']],
  parts:[['Quote','One or two sentences in their words'],['Avatar','Their photo or initials'],['Name and role','Who they are and where they work'],['Stars','An optional rating'],['Company logo','An optional logo for recognition']],
  opts:[['Avatar, name and role','an avatar, full name, job title and company under the quote',1],['Star rating','a row of five stars above the quote',1],['Rotate through several','dots or arrows to move between several testimonials',0],['Wall of quotes','a grid of many short quotes in cards of different heights',0]],
  a11y:'the quote in a blockquote with the person in a caption, and stars described in text (“5 out of 5”)',
  html:()=>`<figure class="tm"><div class="tm-s" role="img" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“We opened our shop in a weekend.”</blockquote><figcaption><span class="tm-a">MR</span><span><b>Maya Reyes</b><small>Founder, Kiln &amp; Co</small></span></figcaption><div class="tm-d">${[1,2,3].map(n=>`<button aria-label="Testimonial ${n}"${n===1?' class="on"':''}></button>`).join('')}</div></figure>`,
  init(r){const q=r.querySelector('blockquote'),a=r.querySelector('.tm-a'),n=r.querySelector('figcaption b'),j=r.querySelector('figcaption small'),d=[...r.querySelectorAll('.tm-d button')];const data=[['We opened our shop in a weekend.','MR','Maya Reyes','Founder, Kiln & Co'],['Support answered in four minutes.','JD','Jonas Dahl','Ops lead, Northwind'],['It replaced three tools for us.','AK','Aiko Kato','Designer, Paper Crane']];d.forEach((b,i)=>b.onclick=()=>{d.forEach(x=>x.classList.toggle('on',x===b));q.textContent=`“${data[i][0]}”`;a.textContent=data[i][1];n.textContent=data[i][2];j.textContent=data[i][3];});},
  css:`
.tm{margin:0;width:230px;background:var(--demo-2);border:1px solid var(--line);border-radius:14px;padding:12px 14px;display:grid;gap:7px}
.tm-s{color:#E0A526;font-size:13px;letter-spacing:2px}
.tm blockquote{margin:0;font-size:13px;line-height:1.35;min-height:36px}
.tm figcaption{display:flex;gap:8px;align-items:center}
.tm-a{width:28px;height:28px;border-radius:50%;background:var(--accent);color:var(--accent-ink);display:grid;place-items:center;font:700 11px var(--body)}
.tm figcaption b{display:block;font-size:12px}
.tm figcaption small{font-size:10px;color:var(--muted)}
.tm-d{display:flex;gap:6px;justify-content:center}
.tm-d button{width:8px;height:8px;border-radius:50%;border:0;padding:0;background:color-mix(in srgb,var(--ink) 22%,transparent);cursor:pointer}
.tm-d button.on{background:var(--accent)}
`
});
