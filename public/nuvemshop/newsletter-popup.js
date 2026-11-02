/* JULU · Popup "Clube JULU" (home). Lo carga el bloque Código de la home:
   src/nuvemshop/bloques/home-newsletter-popup.html. Estilo: 22-newsletter-popup.css */
(function(){
  var KEY='julu_news', WEEK=7*24*60*60*1000;
  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function set(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }
  function subscribed(){ set('subscribed'); }

  /* Token de reCAPTCHA v3 de la tienda (la misma clave que usa el newsletter del pie) */
  function v3Token(){
    return new Promise(function(res){
      var k=window.recaptchaV3 && window.recaptchaV3.siteKey;
      if(!k) return res('');
      function go(){ grecaptcha.ready(function(){ grecaptcha.execute(k,{action:'createContact'}).then(res,function(){ res(''); }); }); }
      if(window.grecaptcha && grecaptcha.execute) return go();
      var sc=document.createElement('script'); sc.src='https://www.google.com/recaptcha/api.js?render='+k;
      sc.onload=go; sc.onerror=function(){ res(''); }; document.head.appendChild(sc);
    });
  }

  function ready(fn){ if(document.readyState!='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }
  ready(function(){
    var dlg=document.getElementById('julu-news');
    if(!dlg || dlg.dataset.ready) return;
    dlg.dataset.ready='1';
    document.body.appendChild(dlg);              /* sale de la sección oculta */

    /* Si se suscribe desde el bloque naranja de la home, tampoco mostramos el popup */
    var native=document.querySelector('form.newsletter-form');
    if(native) native.addEventListener('submit',subscribed);

    /* ¿Corresponde mostrarlo? */
    var st=get();
    if(st==='subscribed') return;
    if(st && /^\d+$/.test(st) && Date.now()-Number(st) < WEEK) return;

    function open(){
      window.removeEventListener('scroll',onScroll);
      if(document.querySelector('dialog[open]')) return;   /* no pisar otro popup */
      if(dlg.showModal) dlg.showModal(); else dlg.setAttribute('open','');
    }
    function onScroll(){
      var max=document.documentElement.scrollHeight-window.innerHeight;
      if(max>0 && window.scrollY/max >= 0.5) open();
    }
    window.addEventListener('scroll',onScroll,{passive:true});

    function close(){
      if(dlg.dataset.done!=='1') set(String(Date.now()));   /* cerró sin suscribirse: 7 días */
      if(dlg.close) dlg.close(); else dlg.removeAttribute('open');
    }
    dlg.addEventListener('click',function(e){
      if(e.target===dlg || (e.target.closest && e.target.closest('[data-news-close]'))) close();
    });
    dlg.addEventListener('cancel',function(e){ e.preventDefault(); close(); });   /* tecla Esc */

    /* Envío: formulario "Newsletter site" de Nuvem Marketing (Perfit).
       Campos del form: fields[3] = Email, fields[1] = Nome. Responde 201 + JSON.
       Además avisamos al newsletter nativo de Nuvemshop (best effort, no bloquea). */
    var PERFIT='https://pubapi.myperfit.com/v2/optin/julubrasil/8jMsTnfm';
    var form=dlg.querySelector('.julu-news-form'), err=dlg.querySelector('.julu-news-error');
    function fail(msg,input){ err.textContent=msg; err.hidden=false; if(input) input.focus(); }
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var nome=form.nome.value.trim().replace(/\s+/g,' '), email=form.email.value.trim();
      if(nome.length<2) return fail('Como a gente te chama? Coloca seu nome 😺',form.nome);
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Hmm, esse e-mail não parece certo. Confere aí?',form.email);
      err.hidden=true;
      var btn=form.querySelector('button'); btn.disabled=true; btn.textContent='Enviando…';

      var p=new URLSearchParams(); p.append('fields[3]',email); p.append('fields[1]',nome);
      fetch(PERFIT,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:p.toString()})
      .then(function(r){
        if(!r.ok) throw new Error(r.status);
        dlg.dataset.done='1'; subscribed();
        dlg.querySelector('[data-step="form"]').hidden=true;
        dlg.querySelector('[data-step="ok"]').hidden=false;
        /* Aviso a Nuvemshop: reCAPTCHA v3 + mismos campos que el form nativo */
        v3Token().then(function(tok){
          var d=new URLSearchParams();
          d.append('email',email); d.append('winnie-pooh','');
          d.append('name',nome); d.append('message','Pedido de inscrição na newsletter'); d.append('type','newsletter');
          d.append('g-recaptcha-response',tok); d.append('action','createContact'); d.append('contact','Enviar');
          return fetch('/',{method:'POST',body:d,credentials:'same-origin'});
        }).catch(function(){});
      }).catch(function(){
        btn.disabled=false; btn.textContent='Quero entrar';
        fail('Ops, não deu certo. Tenta de novo em um minutinho?');
      });
    });
  });
})();
