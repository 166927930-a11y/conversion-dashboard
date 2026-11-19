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
