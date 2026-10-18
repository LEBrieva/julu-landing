/* JULU · Página de producto — galería
   Lo carga el bloque Código del producto (src/nuvemshop/bloques/producto-codigo.html).
   1. Flechas sobre la foto grande; se deshabilitan en la primera / última foto.
   2. Al mover la foto grande (flecha o swipe), las miniaturas acompañan
      para que la seleccionada siempre quede a la vista. */
(function(){
  function ready(fn){ if(document.readyState!='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }
  ready(function init(tries){
    tries = typeof tries=='number' ? tries : 0;
    var s=document.querySelector('.js-product-slider');
    if(!s || !s.swiper){ if(tries<40) setTimeout(function(){ init(tries+1); },300); return; }
    var m=s.swiper;
    if(s.dataset.juluGallery) return;
    s.dataset.juluGallery='1';

    /* 1. Flechas */
    var w=s.closest('.product-images-slider');
    var arrows={};
    if(w){
      ['prev','next'].forEach(function(d){
        var b=w.querySelector('.julu-arrow-'+d);
        if(!b){
          b=document.createElement('button'); b.type='button';
          b.className='julu-arrow julu-arrow-'+d;
          b.setAttribute('aria-label', d=='prev'?'Foto anterior':'Próxima foto');
          w.appendChild(b);
        }
        b.onclick=function(){ d=='prev'?m.slidePrev():m.slideNext(); };
        arrows[d]=b;
      });
    }

    /* 2. Miniaturas siguen a la foto grande */
    var thEl=document.querySelector('.js-product-slider-thumbs');
    function sync(){
      if(arrows.prev) arrows.prev.disabled=m.isBeginning;
      if(arrows.next) arrows.next.disabled=m.isEnd;
      var th=thEl && thEl.swiper;
      if(!th) return;
      var i=m.activeIndex, spv=th.params.slidesPerView;
      var per=typeof spv=='number' ? spv : th.slidesPerViewDynamic ? th.slidesPerViewDynamic() : 4;
      var first=th.activeIndex, last=first+Math.floor(per)-1;
      if(i<first || i>last) th.slideTo(Math.max(0, i-Math.floor(per)+2));
    }
    m.on('slideChange', sync);
    m.on('resize', sync);
    sync();
  });
})();
