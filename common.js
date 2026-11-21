// 通用工具函数 & 数据加载
let _cache = null;
async function loadData(){
  if(_cache) return _cache;
  try{
    const r = await fetch('./data.json?t='+Date.now());
    if(!r.ok) return null;
    _cache = await r.json();
    return _cache;
  }catch(e){ console.error(e); return null; }
}
function fmtNum(v){
  if(v===undefined||v===null) return '0';
  return Number(v).toLocaleString('zh-CN',{maximumFractionDigits:0});
}
function fmtPct(v){ return (v*100).toFixed(1)+'%'; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function num(v){ return Number(v||0); }

// 月份筛选：从 teachers 里取所有出现的月份，降序（11/10/9/8/7）
function getMonths(D){
  const s=new Set((D.teachers||[]).map(t=>t.month).filter(Boolean));
  return [...s].sort((a,b)=>b-a);
}
// 渲染月份筛选条。state.month: 'all' 或月份数字；onChange(month) 回调
function renderMonthBar(elId, D, state, onChange){
  const el=document.getElementById(elId);
  if(!el) return;
  const months=getMonths(D);
  const cur=(state.month==='all'||state.month==null)?'all':state.month;
  el.innerHTML=`<span class="flabel">月份</span>`+
    [`<span class="mchip ${cur==='all'?'active':''}" data-m="all">全部</span>`]
      .concat(months.map(m=>`<span class="mchip ${cur===m?'active':''}" data-m="${m}">${m}月</span>`)).join('')+
    `<span class="finfo" id="${elId}Info"></span>`;
  el.querySelectorAll('.mchip').forEach(chip=>chip.addEventListener('click',()=>{
    const v=chip.dataset.m;
    state.month = v==='all'?'all':Number(v);
    el.querySelectorAll('.mchip').forEach(c=>c.classList.toggle('active',c===chip));
    onChange(state.month);
  }));
}
// 按月份过滤 teachers
function byMonth(D, month){
  const ts=D.teachers||[];
  return (month==='all'||month==null)?ts:ts.filter(t=>t.month===month);
}
