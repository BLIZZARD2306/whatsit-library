Whatsit.addPattern({id:'badge',name:'Notification badge',aka:['Badge','Counter','Dot'],cat:'Feedback',
  say:'A small red number on an icon showing how many new things there are.',
  keys:'red dot number count bell notification icon unread new messages cart corner circle',
  use:'Unread messages, items in a cart, new notifications.',
  avoid:'Counts nobody acts on. Constant red dots train people to ignore them.',
  confuse:[['toast','A toast is a message that leaves by itself. A badge stays until handled.'],['chips','Chips are removable labels. A badge is a count or status.']],
  parts:[['Badge','The small circle'],['Count','The number inside, often capped at 99+'],['Dot variant','A plain dot with no number']],
  opts:[['Cap at 99+','counts over 99 shown as “99+”',1],['Hide at zero','the badge hidden when the count is zero',1],['Pop on change','a small pop animation when the count changes',0]],
  a11y:'a visually hidden label such as “3 unread notifications”',
  html:()=>`<div style="display:flex;gap:14px;align-items:center"><button class="iconbtn bell" aria-label="Notifications"><svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg><span class="bdg">3</span></button><button class="dbtn ghost a">+1 message</button></div>`,
  init(r){const b=r.querySelector('.bdg');let n=3;const s=()=>{b.textContent=n>99?'99+':n;b.hidden=!n;};r.querySelector('.bell').onclick=()=>{n=0;s();};r.querySelector('.a').onclick=()=>{n++;s();};},
  css:`
.bell{position:relative}
.bdg{position:absolute;top:-6px;right:-6px;min-width:20px;height:20px;border-radius:999px;background:var(--danger);color:#fff;font:700 11px/20px var(--body);padding:0 5px;text-align:center}
`
});
