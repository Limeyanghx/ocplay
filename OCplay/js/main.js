// OCplay 共享脚本

// ===== 轮播 Banner =====
function initBanner(){
  const slides=document.querySelectorAll('.banner-slide');
  const dots=document.querySelectorAll('.banner-dots span');
  if(!slides.length) return;
  let idx=0;
  function go(n){
    slides[idx].classList.remove('active');
    dots[idx]?.classList.remove('active');
    idx=(n+slides.length)%slides.length;
    slides[idx].classList.add('active');
    dots[idx]?.classList.add('active');
  }
  dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));
  setInterval(()=>go(idx+1),5000);
}

// ===== 筛选 chip 切换 =====
function initChips(){
  document.querySelectorAll('.filter-chips').forEach(group=>{
    group.querySelectorAll('.chip').forEach(chip=>{
      chip.addEventListener('click',()=>{
        group.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });
}

// ===== Tab 切换 =====
function initTabs(){
  document.querySelectorAll('[data-tabs]').forEach(tabs=>{
    const buttons=tabs.querySelectorAll('[data-tab]');
    buttons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        buttons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const target=tabs.getAttribute('data-target');
        if(target){
          document.querySelectorAll(target+' [data-panel]').forEach(p=>p.style.display='none');
          const panel=document.querySelector(target+' [data-panel="'+btn.getAttribute('data-tab')+'"]');
          if(panel) panel.style.display='';
        }
      });
    });
  });
}

// ===== 文件上传预览 =====
function initUpload(zoneId,previewId){
  const zone=document.getElementById(zoneId);
  const preview=document.getElementById(previewId);
  if(!zone) return;
  zone.addEventListener('click',()=>zone.querySelector('input[type=file]')?.click());
  const input=zone.querySelector('input[type=file]');
  if(input){
    input.addEventListener('change',e=>{
      Array.from(e.target.files).forEach(file=>{
        const reader=new FileReader();
        reader.onload=ev=>{
          const thumb=document.createElement('div');
          thumb.className='thumb';
          thumb.innerHTML=`<img src="${ev.target.result}"><div class="rm">×</div>`;
          thumb.querySelector('.rm').addEventListener('click',()=>thumb.remove());
          preview.appendChild(thumb);
        };
        reader.readAsDataURL(file);
      });
    });
  }
}

// ===== 验证码倒计时 =====
function initCodeBtn(){
  document.querySelectorAll('.code-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.disabled) return;
      let sec=60;
      btn.disabled=true;
      const orig=btn.textContent;
      btn.textContent=sec+'s后重发';
      const timer=setInterval(()=>{
        sec--;
        if(sec<=0){clearInterval(timer);btn.disabled=false;btn.textContent=orig;}
        else btn.textContent=sec+'s后重发';
      },1000);
    });
  });
}

// ===== 摊位类型选择 =====
function initBoothSelect(){
  document.querySelectorAll('.booth-type').forEach(item=>{
    item.addEventListener('click',()=>{
      document.querySelectorAll('.booth-type').forEach(t=>t.classList.remove('selected'));
      item.classList.add('selected');
    });
  });
}

// ===== Modal 弹窗 =====
function openModal(id){
  const m=document.getElementById(id);
  if(!m) return;
  m.classList.add('show');
  document.body.style.overflow='hidden';
  m.addEventListener('click',e=>{if(e.target===m) closeModal(id)});
  m.querySelectorAll('.modal-close').forEach(b=>b.onclick=()=>closeModal(id));
}
function closeModal(id){
  const m=document.getElementById(id);
  if(!m) return;
  m.classList.remove('show');
  document.body.style.overflow='';
}

// ===== 点赞切换 =====
function initLike(){
  document.querySelectorAll('[data-like]').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      btn.classList.toggle('liked');
      const num=btn.querySelector('.num');
      if(num){
        let v=parseInt(num.textContent)||0;
        num.textContent=btn.classList.contains('liked')?v+1:v-1;
      }
    });
  });
}

// ===== 地图格子点击跳转 =====
function initMapCells(){
  document.querySelectorAll('.map-cell').forEach(cell=>{
    if(cell.classList.contains('empty')) return;
    cell.addEventListener('click',()=>{
      location.href='booth-detail.html';
    });
  });
}

// ===== URL Hash 自动打开弹窗 =====
function initHashModal(){
  if(location.hash){
    const id=location.hash.slice(1);
    if(document.getElementById(id)&&id.includes('Modal')){
      setTimeout(()=>openModal(id),200);
      history.replaceState(null,'',location.pathname);
    }
  }
}

// 初始化
document.addEventListener('DOMContentLoaded',()=>{
  initBanner();
  initChips();
  initTabs();
  initCodeBtn();
  initBoothSelect();
  initLike();
  initMapCells();
  initHashModal();
});
