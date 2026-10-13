/* Production shared shopping list — v3.10.6 */
(() => {
  const css = `
  #shoppingOpenBtn{background:#1f6d55;color:white;font-weight:700}
  #shoppingOpenBtn.shop-has-items{background:#c62828!important;border-color:#a51e1e!important;color:white!important}
  #shoppingPanel .shop-name{cursor:pointer}
  #shoppingOverlay[hidden]{display:none!important}
  #shoppingOverlay{position:fixed;inset:0;background:#0009;z-index:100000;display:flex;justify-content:center;align-items:center;padding:12px}
  #shoppingPanel{background:white;color:#222;border-radius:14px;width:min(620px,100%);height:min(92dvh,820px);overflow:hidden;display:flex;flex-direction:column;padding:14px;box-shadow:0 8px 30px #0005}
  #shoppingPanel button{cursor:pointer;padding:9px 12px;border-radius:8px;border:1px solid #ccc;background:#f5f5f5;color:#222}
  #shoppingPanel .shop-primary{background:#196b51;color:white;border-color:#196b51}
  #shoppingPanel .shop-back{background:#e8edf2;color:#34495e;border-color:#bcc9d6}
  #shoppingPanel .shop-next{background:#196b51;color:white;border-color:#196b51}
  #shoppingPanel .shop-settings{background:#e7f0fa;color:#245a8d;border-color:#b6cfe8}
  #shoppingPanel .shop-ordered{background:#dff3e7;color:#17633c;border-color:#a3d9b7}
  #shoppingPanel .shop-new{background:#fff0d9;color:#86520d;border-color:#ebc68c}
  #shoppingPanel .shop-history{background:#eae7f6;color:#594687;border-color:#c9c0e4}
  #shoppingPanel .shop-row{display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid #eee;min-height:43px}
  #shoppingPanel input[type=text]{min-width:0;padding:8px;border:1px solid #ccc;border-radius:6px}
  #shoppingPanel .shop-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
  #shoppingPanel .shop-note{width:42%;max-width:175px;margin-left:auto}
  #shoppingPanel .shop-name{flex:1;min-width:0;overflow-wrap:anywhere}
  #shopBody{overflow-y:auto;min-height:0;flex:1}#shoppingPanel h2{margin:4px 0}#shoppingPanel h3{margin:10px 0}#shoppingPanel .shop-error{color:#ad2323}
  #shoppingPanel .shop-muted{color:#666;font-size:.85em}
  #shopSummaryBar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:10px 0 8px;color:#666;font-size:.85em}
  #shopSelectedCount{text-align:left}#shopStatus{text-align:right;margin-left:auto}
  `;
  const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
  const overlay=document.createElement('div');overlay.id='shoppingOverlay';overlay.hidden=true;
  overlay.innerHTML=`<section id="shoppingPanel" role="dialog" aria-modal="true" aria-label="Shared shopping list">
  <div style="display:flex;justify-content:space-between;align-items:center"><h2>🛒 Shopping List</h2><button id="shopClose" type="button">✕</button></div>
  <div id="shopSummaryBar"><span id="shopSelectedCount"></span><span id="shopStatus" class="shop-muted" role="status"></span></div><div id="shopBody"></div></section>`;
  document.body.appendChild(overlay);
  const body=overlay.querySelector('#shopBody'), status=overlay.querySelector('#shopStatus'), selectedCount=overlay.querySelector('#shopSelectedCount');
  let current=null,page=0,preview=false,busy=false,settings=false;
  const perPage=8;
  function setButtonColour(list){
    const hasItems=!!(list?.id&&list.state?.categories?.some(cat=>cat.items?.some(item=>item.selected)));
    button.classList.toggle('shop-has-items',hasItems);
  }
  async function refreshButtonColour(){
    if(saving||pendingSave)return;
    try{const list=await rpc('load');setButtonColour(list)}catch(error){console.warn('Shopping button status unavailable:',error)}
  }
  const button=document.createElement('button');button.id='shoppingOpenBtn';button.type='button';button.textContent='🛒 Shopping List';
  const print=document.querySelector('#printBtn'); if(print) print.insertAdjacentElement('afterend',button);
  else document.querySelector('.toolbar')?.appendChild(button);
  function el(tag,text,cls){const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x}
  function action(label,fn,primary=false){const b=el('button',label,primary?'shop-primary':'');b.type='button';b.onclick=fn;return b}
  function say(message,error=false){status.textContent=message;status.className=error?'shop-error':'shop-muted'}
  async function rpc(actionName,state=null,revision=null){
    if(typeof db==='undefined'||!db)throw Error('Shopping list requires an online connection');
    if(typeof managerSessionToken==='undefined'||!managerSessionToken)throw Error('Please sign in to the timesheet first');
    const {data,error}=await db.rpc('shopping_action',{p_token:managerSessionToken,p_action:actionName,p_state:state,p_revision:revision});
    if(error)throw Error(error.message);return data;
  }
  async function load(){generation++;pendingSave=false;say('Loading shared list…');current=await rpc('load');setButtonColour(current);if(!current.id){body.replaceChildren();body.append(el('p','Previous list was ordered. Start a fresh shopping list when ready.'));body.append(action('Start new list',async()=>{try{current=await rpc('new');setButtonColour(current);page=0;preview=false;render();say('New shared list started')}catch(e){say(e.message,true)}} ,true));return;}say('');render()}
  let pendingSave=false, saving=false, generation=0;
  async function save(){
    pendingSave=true;
    if(saving||!current)return;
    saving=true;
    const myGeneration=generation;
    try{
      while(pendingSave&&current&&myGeneration===generation){
        pendingSave=false;
        const snapshot=JSON.parse(JSON.stringify(current.state));
        const id=current.id,revision=current.revision;
        say('Saving…');
        const result=await rpc('save',snapshot,revision);
        if(myGeneration!==generation||current?.id!==id)return;
        current.revision=result.revision;
        setButtonColour(current);
      }
      if(myGeneration===generation)say('✓ Saved');
    }catch(e){
      pendingSave=false;
      say(e.message,true);
      alert('Shopping list could not be saved. Reloading the latest list.\\n'+e.message);
      generation++;
      await load().catch(err=>say(err.message,true));
    }finally{saving=false;if(pendingSave&&current)void save()}
  }
  function change(fn){if(!current)return;fn();setButtonColour(current);render();void save()}
  function allItems(){return current.state.categories.flatMap(c=>c.items.filter(i=>i.selected).map(i=>({category:c.name,...i})))}
  function listText(){const groups=current.state.categories.map(c=>({name:c.name,items:c.items.filter(i=>i.selected)})).filter(g=>g.items.length);
    return '171 CAFÉ — SHOPPING LIST\n\n'+groups.map(g=>g.name.toUpperCase()+'\n'+g.items.map(i=>'• '+i.name+(i.note?' — '+i.note:'')).join('\n')).join('\n\n')}
  function render(){
    body.replaceChildren();if(!current)return;
    const cats=current.state.categories,selected=allItems().length;
    selectedCount.textContent=selected+' item(s) selected';
    if(settings){
      body.append(el('h3','Product & Category Settings'));
      const cats=current.state.categories;
      cats.forEach(cat=>{
        const section=el('div');section.append(el('h3',cat.name));
        const tools=el('div',undefined,'shop-actions');
        tools.append(action('+ Add item',()=>{const name=prompt('New item name');if(name?.trim())change(()=>cat.items.push({name:name.trim(),selected:false,note:''}))}),action('Rename category',()=>{const name=prompt('Category name',cat.name);if(name?.trim())change(()=>cat.name=name.trim())}),action('Remove category',()=>{if(cat.items.length){alert('Remove its products first');return}if(cats.length>1&&confirm('Delete this empty category?'))change(()=>cats.splice(cats.indexOf(cat),1))}));section.append(tools);
        cat.items.forEach(item=>{const row=el('div',undefined,'shop-row');row.append(el('span',item.name,'shop-name'),action('Edit',()=>{const name=prompt('Item name',item.name);if(name?.trim())change(()=>item.name=name.trim())}),action('Remove',()=>{if(confirm('Remove '+item.name+' for all staff?'))change(()=>cat.items.splice(cat.items.indexOf(item),1))}));section.append(row)});body.append(section)
      });
      body.append(action('+ Add category',()=>{const name=prompt('New category name');if(name?.trim())change(()=>cats.push({name:name.trim(),items:[]}))}));
      body.append(action('Done — return to list',()=>{settings=false;render()},true));
    }else if(preview){
      const pre=el('pre',listText());pre.style.cssText='white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px';body.append(pre);
      const a=el('div',undefined,'shop-actions');
      a.append(action('Copy list',async()=>{try{await navigator.clipboard.writeText(listText());say('Copied to clipboard')}catch(e){say('Copy failed: '+e.message,true)}} ,true),
      action('WhatsApp',()=>window.open('https://wa.me/?text='+encodeURIComponent(listText()),'_blank','noopener')),
      action('Back to checklist',()=>{preview=false;render()}));
      body.append(a);
    }else{
      const pages=cats.flatMap((c,ci)=>Array.from({length:Math.max(1,Math.ceil(c.items.length/perPage))},(_,pi)=>({ci,pi})));
      page=Math.max(0,Math.min(page,pages.length-1));
      const {ci,pi}=pages[page],cat=cats[ci];
      const categoryPages=Math.max(1,Math.ceil(cat.items.length/perPage));const heading=el('h3',cat.name+' ('+categoryPages+' '+(categoryPages===1?'page':'pages')+')');heading.style.cssText='background:#e4f3ec;border-left:5px solid #196b51;padding:9px 11px;border-radius:7px;color:#174d3c;font-weight:800';body.append(heading);
      const nav=el('div',undefined,'shop-actions');nav.style.alignItems='center';
      const back=action('◀ Back',()=>{page=Math.max(0,page-1);render()});back.classList.add('shop-back');const next=action('Next ▶',()=>{page=Math.min(pages.length-1,page+1);render()});next.classList.add('shop-next');nav.append(back,next);
      const spacer=el('span');spacer.style.flex='1';const settingsBtn=action('⚙ Settings',()=>{settings=true;render()});settingsBtn.classList.add('shop-settings');nav.append(spacer,settingsBtn);
      body.append(nav);
      cat.items.slice(pi*perPage,(pi+1)*perPage).forEach(item=>{
        const row=el('div',undefined,'shop-row');
        const cb=document.createElement('input');cb.type='checkbox';cb.checked=!!item.selected;cb.onchange=()=>change(()=>item.selected=cb.checked);
        cb.id='shop-item-'+ci+'-'+pi+'-'+cat.items.indexOf(item);
        const label=el('label',item.name,'shop-name');label.htmlFor=cb.id;
        const note=document.createElement('input');note.type='text';note.className='shop-note';note.placeholder='Qty / notes';note.value=item.note||'';
        note.onchange=()=>change(()=>item.note=note.value.trim());
        row.append(cb,label,note);body.append(row);
      });
      body.append(action('Generate shopping list ('+selected+')',()=>{if(!selected){alert('Select at least one product');return}preview=true;render()},true));
    }
    if(settings)return;
    const foot=el('div',undefined,'shop-actions');
    foot.append(action('Mark as ordered',async()=>{if(!confirm('Confirm this shopping list has actually been ordered?'))return;await command('ordered')}),
    action('Start new list',async()=>{if(!confirm('Archive this shared draft and start a new blank checklist for everyone?'))return;await command('new')}),
    action('Order history',history));
    ['shop-ordered','shop-new','shop-history'].forEach((name,i)=>foot.children[i]?.classList.add(name));
    body.append(foot);
    if(!preview){const pages=cats.reduce((n,cat)=>n+Math.max(1,Math.ceil(cat.items.length/perPage)),0);const footer=el('div','Page '+(page+1)+' of '+pages);footer.style.cssText='text-align:center;color:#777;font-size:.9rem;font-weight:700;margin:12px 0 4px';body.append(footer)}
  }
  async function command(name){if(busy||saving||pendingSave){alert('Please wait for your changes to save first.');return}busy=true;try{const result=await rpc(name,null,current.revision);if(name==='ordered'){setButtonColour(null);say('Marked ordered. Start a new list when ready.');current=null;body.replaceChildren();body.append(action('Start next list',async()=>{try{current=await rpc('new',null,result.revision);page=0;preview=false;render();say('New shared list started')}catch(e){say(e.message,true)}}))}else{current=result;setButtonColour(current);preview=false;page=0;say('New shared list started');render()}}catch(e){say(e.message,true)}finally{busy=false}}
  async function history(){try{const items=await rpc('history');body.replaceChildren();body.append(el('h3','Previous shopping lists'));for(const x of items){const b=action(new Date(x.created_at).toLocaleDateString('en-AU')+' — '+x.status,()=>{body.replaceChildren();body.append(el('pre',x.state.categories.map(c=>c.name+'\n'+c.items.filter(i=>i.selected).map(i=>'• '+i.name+(i.note?' — '+i.note:'')).join('\n')).join('\n\n')));body.append(action('Back',render))});body.append(b)}body.append(action('Back to current list',render))}catch(e){say(e.message,true)}}
  button.onclick=async()=>{overlay.hidden=false;preview=false;settings=false;body.replaceChildren();try{await load()}catch(e){say(e.message,true)}};
  overlay.querySelector('#shopClose').onclick=()=>overlay.hidden=true;
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.hidden=true});
  void refreshButtonColour();
  window.setInterval(()=>{if(overlay.hidden)void refreshButtonColour()},30000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&overlay.hidden)void refreshButtonColour()});
})();