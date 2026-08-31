/* ==========================================================================
   V7 IMPORTS — comportamento do site inteiro
   Carregado depois de catalogo.js. Não precisa mexer aqui pra atualizar
   produtos: tudo que muda no dia a dia está em assets/catalogo.js
   ========================================================================== */
(function () {
"use strict";

/* ------------------------------------------------------------- atalhos -- */
const $  = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp  = (a, b, t) => a + (b - a) * t;
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mob   = () => matchMedia('(max-width: 900px)').matches;
const brl   = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* nome sem extensão -> usa o .webp otimizado (e a versão -sm nos cards).
   Se escrever o nome COM extensão (ex.: "foto.jpg"), usa o arquivo direto. */
const img = (n, sm) => n.indexOf('.') > -1
  ? 'assets/img/' + n
  : 'assets/img/' + n + (sm ? '-sm' : '') + '.webp';

const CATNOME = { camisetas:'CAMISETAS', conjuntos:'CONJUNTOS', moletons:'MOLETONS', calcas:'CALÇAS', acessorios:'ACESSÓRIOS' };
const CATPAG  = { camisetas:'camisetas.html', conjuntos:'conjuntos.html', moletons:'moletons.html', calcas:'calcas.html', acessorios:'acessorios.html' };
const cap = s => s.charAt(0) + s.slice(1).toLowerCase();

const PAGINA = document.body.dataset.pagina || 'home';
const CAT    = document.body.dataset.cat || null;

/* trava/destrava a rolagem (menu e modal usam isso). Segura o overflow no
   html E no body: mexer na posicao do body dava tela preta em celular. */
function travar(on) {
  document.documentElement.classList.toggle('v7-lock', on);
  document.body.classList.toggle('v7-lock', on);
}

function waLink(msg) {
  return 'https://wa.me/' + String(V7_CONFIG.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(msg);
}
function msgProduto(p, tam) {
  return tam
    ? 'Olá! Tenho interesse no produto ' + p.nome + ', no tamanho ' + tam + '. Gostaria de verificar a disponibilidade.'
    : 'Olá! Vi o produto ' + p.nome + ' no catálogo da V7 Imports e gostaria de saber mais informações.';
}
const ICONE_WA = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.25.69-1.44 1.32-1.98 1.36-.53.05-1.02.24-3.44-.72-2.9-1.15-4.73-4.13-4.87-4.32-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35h.54c.17 0 .41-.7.64.49.25.6.83 2.07.9 2.22.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.16-.3.36-.42.49-.14.14-.29.29-.12.57.16.28.73 1.2 1.56 1.94 1.07.95 1.98 1.25 2.26 1.39.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.63-.14.25.9 1.72.81 2.02.96.29.14.49.21.56.33.07.12.07.69-.18 1.38z"/></svg>';

/* ==========================================================================
   PEÇAS FIXAS (header, menu, rodapé, modal) — iguais em todas as páginas
   ========================================================================== */
(function estrutura() {
  const navLinks = Object.entries(CATNOME)
    .map(([id, n]) => `<a href="${CATPAG[id]}" class="${CAT === id ? 'ativo' : ''}">${cap(n)}</a>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="grain" aria-hidden="true"></div>
    <div class="prog" id="prog" aria-hidden="true"></div>
    <div class="cur" id="cur" aria-hidden="true"></div>
    <div class="cur-d" id="curd" aria-hidden="true"></div>

    <div class="pre" id="pre">
      <div style="text-align:center">
        <img src="assets/img/logo-v7-full.png" alt="V7 Imports">
        <div class="pre__bar"><i id="preBar"></i></div>
      </div>
    </div>

    <header class="head" id="head">
      <a href="index.html" class="brand" aria-label="V7 Imports">
        <img src="assets/img/logo-v7.png" alt="">
        <b>V7 IMPORTS</b>
      </a>
      <nav class="nav">
        <a href="index.html" class="${PAGINA === 'home' ? 'ativo' : ''}">Início</a>
        ${navLinks}
        <a href="index.html#sobre">Sobre</a>
      </nav>
      <a class="btn-wa" data-wa-geral href="#" target="_blank" rel="noopener">${ICONE_WA} Falar no WhatsApp</a>
      <button class="burger" id="burger" aria-label="Abrir menu" aria-expanded="false"><i></i><i></i><i></i></button>
    </header>

    <div class="v7-painel" id="painelNav">
      <a class="v7-ml" href="index.html">Início</a>
      ${Object.entries(CATNOME).map(([id, n]) =>
        `<a class="v7-ml ${CAT === id ? 'ativo' : ''}" href="${CATPAG[id]}">${cap(n)}</a>`).join('')}
      <a class="v7-ml" href="index.html#drop">Lançamentos</a>
      <a class="v7-ml" href="index.html#sobre">Sobre</a>
      <div class="v7-painel__pe">
        <div class="dim" style="font-size:13px;line-height:1.9">
          <div>${V7_CONFIG.cidade}</div>
          <div><a href="${V7_CONFIG.instagram}" target="_blank" rel="noopener">${V7_CONFIG.instagramHandle}</a></div>
        </div>
        <a class="btn" data-wa-geral href="#" target="_blank" rel="noopener"><span>Chamar no WhatsApp</span></a>
      </div>
    </div>`);

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="foot">
      <div class="foot__top">
        <div class="foot__brand">
          <img src="assets/img/logo-v7-full.png" alt="V7 Imports">
          <p>Streetwear importado, selecionado peça por peça.</p>
        </div>
        <div>
          <h4>Categorias</h4>
          <ul>${Object.entries(CATNOME).map(([id, n]) => `<li><a href="${CATPAG[id]}">${cap(n)}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4>Navegar</h4>
          <ul>
            <li><a href="index.html">Início</a></li>
            <li><a href="index.html#drop">Lançamentos</a></li>
            <li><a href="index.html#sobre">Sobre a V7</a></li>
          </ul>
        </div>
        <div>
          <h4>Contato</h4>
          <ul>
            <li><a data-wa-geral href="#" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="${V7_CONFIG.instagram}" target="_blank" rel="noopener">Instagram ${V7_CONFIG.instagramHandle}</a></li>
          </ul>
          <div class="dim" style="margin-top:18px;font-size:13px">${V7_CONFIG.cidade}</div>
        </div>
      </div>
      <div class="foot__end">
        <span>V7 Imports © 2026</span>
        <span>Catálogo digital</span>
      </div>
    </footer>

    <a class="float" id="float" data-wa-geral href="#" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      ${ICONE_WA}<span>Chamar no WhatsApp</span>
    </a>

    <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">
      <div class="modal__bd" data-close></div>
      <div class="modal__win">
        <button class="modal__x" data-close aria-label="Fechar">✕</button>
        <div class="mgal">
          <div class="mgal__main" id="mMain"></div>
          <div class="mgal__thumbs" id="mThumbs"></div>
        </div>
        <div class="minfo">
          <div>
            <span class="lbl neon" id="mCat">Categoria</span>
            <h2 id="mTitle" style="margin-top:12px">Produto</h2>
          </div>
          <p class="desc" id="mDesc"></p>
          <p class="det" id="mDet"></p>
          <div class="blk">
            <span class="lbl">Tamanhos</span>
            <div class="chips" id="mSizes"></div>
            <div class="hint" id="mHint"></div>
          </div>
          <div class="blk">
            <span class="lbl">Cores</span>
            <div class="chips" id="mColors"></div>
          </div>
          <div class="blk">
            <div class="mstock"><span class="dot n"></span><span id="mStock">Disponível</span></div>
          </div>
          <div class="mwa">
            <a class="btn lg" id="mWa" href="#" target="_blank" rel="noopener" style="width:100%">
              <span>Chamar no WhatsApp</span>
            </a>
            <div class="dim" style="margin-top:14px;text-align:center;font-size:12.5px">
              A mensagem já vai preenchida com a peça e o tamanho.
            </div>
          </div>
        </div>
      </div>
    </div>`);

  $$('[data-wa-geral]').forEach(a => a.href = waLink(V7_CONFIG.mensagemGeral));
  $$('[data-ig]').forEach(a => { a.href = V7_CONFIG.instagram; });
})();

/* ============================================================= preloader
   A abertura completa acontece so na primeira pagina da visita. Quando o
   cliente pula pra CAMISETAS, MOLETONS etc. ele ja viu a marca — ali a
   cortina so passa rapido, senao a navegacao fica pesada.                 */
(function () {
  const pre = $('#pre'), bar = $('#preBar');

  let repete = false;
  try {
    repete = sessionStorage.getItem('v7:pre') === '1';
    sessionStorage.setItem('v7:pre', '1');
  } catch (e) { /* aba anonima bloqueia: segue como primeira visita */ }

  if (repete) pre.classList.add('rapido');

  const passo  = repete ?  45 :  60;   /* de quanto em quanto a barra anda */
  const salto  = repete ?  40 :  26;
  const base   = repete ?  22 :  14;
  const espera = repete ?  60 : 120;   /* respiro com a barra cheia        */
  const saida  = repete ? 380 : 700;   /* tem que cobrir o --pre-t do CSS  */

  let v = 0;
  const t = setInterval(() => {
    v += Math.random() * salto + base;
    if (v >= 100) { v = 100; clearInterval(t); setTimeout(fim, espera); }
    bar.style.transform = 'scaleX(' + (v / 100) + ')';
  }, passo);

  function fim() {
    pre.classList.add('out');
    setTimeout(() => pre.style.display = 'none', saida);
    const hv = $('#heroVideo'); if (hv) hv.play().catch(() => {});
  }
})();

/* ================================================================ cursor */
(function () {
  if (matchMedia('(hover: none)').matches) return;
  const c = $('#cur'), d = $('#curd');
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    d.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }, { passive: true });
  (function loop() {
    cx = lerp(cx, x, .2); cy = lerp(cy, y, .2);
    c.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    document.body.classList.toggle('cur-on',
      !!e.target.closest('a,button,.card,.cat,.orb,.faixa__i,.outra,input'));
  });
})();

/* ================================================== revelar ao rolar ==== */
const pendentes = new Set();
const revealObs = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) mostrar(e.target); });
}, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

function mostrar(el) { el.classList.add('in'); revealObs.unobserve(el); pendentes.delete(el); }
function watchReveal(root) {
  $$('.rv,.rv-clip,.rv-w,.item', root || document).forEach(el => {
    if (el.classList.contains('in')) return;
    pendentes.add(el); revealObs.observe(el);
  });
}
/* se alguém cair no meio da página (link, âncora, F5), o observer não dispara:
   essa varredura garante que nada fique invisível */
function varrer() {
  if (!pendentes.size) return;
  pendentes.forEach(el => { if (el.getBoundingClientRect().top < innerHeight * .92) mostrar(el); });
}

/* ============================================ header / progresso / float */
(function () {
  const head = $('#head'), burger = $('#burger'), bar = $('#prog'), flut = $('#float');
  let ultimo = 0;
  function aoRolar() {
    const y = scrollY;
    head.classList.toggle('solid', y > 40);
    if (!document.body.classList.contains('v7-aberto')) head.classList.toggle('hide', y > ultimo && y > 420);
    ultimo = y;
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    flut.classList.toggle('on', y > innerHeight * .6);
    varrer();
  }
  addEventListener('scroll', aoRolar, { passive: true });
  addEventListener('resize', aoRolar);
  aoRolar();

  function menu(aberto) {
    document.body.classList.toggle('v7-aberto', aberto);
    travar(aberto);
    burger.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    if (aberto) { head.classList.remove('hide'); head.classList.add('solid'); }
    else if (scrollY <= 40) head.classList.remove('solid');
  }
  burger.addEventListener('click', e => {
    e.preventDefault();
    menu(!document.body.classList.contains('v7-aberto'));
  });
  /* o link fecha o menu antes de navegar (inclusive nas ancoras da propria home) */
  $$('.v7-painel a').forEach(a => a.addEventListener('click', () => menu(false)));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('v7-aberto')) menu(false);
  });
  /* virou o celular e virou desktop: o menu nao pode ficar preso aberto */
  addEventListener('resize', () => {
    if (document.body.classList.contains('v7-aberto') && innerWidth > 1150) menu(false);
  });
})();

/* ================================================================ cards */
function cardHTML(p) {
  const im = p.imagens[0];
  const tag = p.tag ? '<span class="tg">' + p.tag + '</span>' : '';
  const st = p.status === 'ultimas'
    ? '<span class="tg ult">ÚLTIMAS UNIDADES</span>'
    : '<span class="tg gh">DISPONÍVEL</span>';
  const preco = (typeof p.preco === 'number') ? brl(p.preco) : 'Sob consulta';
  return `
  <article class="card rv-w">
    <button class="card__ph" data-open="${p.id}" aria-label="Ver ${p.nome}">
      <img src="${img(im.src, true)}" srcset="${img(im.src, true)} 780w, ${img(im.src)} 1600w"
           sizes="(max-width:640px) 50vw, (max-width:1100px) 33vw, (max-width:1680px) 25vw, 390px"
           style="object-position:${im.pos}" alt="${p.nome}" loading="lazy" decoding="async">
      <span class="card__tag">${tag}${st}</span>
      <span class="card__hov">Ver peça &rarr;</span>
    </button>
    <div class="card__b">
      <h3>${p.nome}</h3>
      <p class="desc">${p.descricao}</p>
      <div class="card__meta">
        <span class="neon">${preco}</span>
        <span>${p.tamanhos.slice(0, 6).join(' · ')}</span>
      </div>
    </div>
    <a class="card__wa" href="${waLink(msgProduto(p))}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
  </article>`;
}

function pintarGrid(grid, lista) {
  grid.innerHTML = lista.length
    ? lista.map(cardHTML).join('')
    : '<div class="empty"><div class="dsp mid">Nada por aqui.</div>'
      + '<p class="dim" style="margin:12px 0 22px">Tenta outra categoria — ou chama no WhatsApp que a gente procura pra você.</p>'
      + '<a class="btn ghost" href="' + waLink(V7_CONFIG.mensagemGeral) + '" target="_blank" rel="noopener"><span>Pedir pelo WhatsApp</span></a></div>';
  $$('.rv-w', grid).forEach((el, i) => el.style.transitionDelay = Math.min(i * .04, .34) + 's');
  watchReveal(grid); varrer();
}

/* ================================================================= modal */
const modal = (function () {
  const el = $('#modal'), main = $('#mMain'), thumbs = $('#mThumbs');
  let atual = null, tam = null, foco = null;

  function abrir(id) {
    const p = V7_PRODUTOS.find(x => x.id === id); if (!p) return;
    atual = p; tam = null; foco = document.activeElement;

    $('#mCat').textContent   = CATNOME[p.categoria];
    $('#mTitle').textContent = p.nome;
    $('#mDesc').textContent  = p.descricao;
    $('#mDet').textContent   = p.detalhe || '';
    $('#mStock').textContent = p.status === 'ultimas' ? 'Últimas unidades' : 'Disponível';

    main.innerHTML = p.imagens.map((im, i) =>
      `<img src="${img(im.src)}" style="object-position:${im.pos}" class="${i === 0 ? 'on' : ''}" alt="${p.nome}">`).join('');
    thumbs.innerHTML = p.imagens.map((im, i) =>
      `<button data-i="${i}" class="${i === 0 ? 'on' : ''}" aria-label="Foto ${i + 1}"><img src="${img(im.src, true)}" style="object-position:${im.pos}" alt=""></button>`).join('');
    $$('button', thumbs).forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i;
      $$('img', main).forEach((im, k) => im.classList.toggle('on', k === i));
      $$('button', thumbs).forEach((t, k) => t.classList.toggle('on', k === i));
    }));

    $('#mSizes').innerHTML = p.tamanhos.map(t => `<button class="chip" data-t="${t}">${t}</button>`).join('');
    $$('#mSizes .chip').forEach(b => b.addEventListener('click', () => {
      tam = b.dataset.t;
      $$('#mSizes .chip').forEach(x => x.classList.toggle('on', x === b));
      atualizarWa();
    }));
    $('#mColors').innerHTML = p.cores.map(c => `<span class="chip static">${c}</span>`).join('');

    atualizarWa();
    el.classList.add('on');
    void el.offsetWidth;
    el.classList.add('show');
    travar(true);
    $('.modal__win').scrollTop = 0;
    $('.modal__x').focus();
    history.replaceState(null, '', '#produto-' + p.id);
  }

  function atualizarWa() {
    $('#mWa').href = waLink(msgProduto(atual, tam));
    const h = $('#mHint');
    h.classList.toggle('warn', !tam);
    h.innerHTML = tam
      ? 'Tamanho <b class="neon">' + tam + '</b> selecionado.'
      : 'Selecione o tamanho antes de chamar no WhatsApp.';
  }

  function fechar() {
    el.classList.remove('show');
    travar(false);
    setTimeout(() => el.classList.remove('on'), 420);
    if (location.hash.indexOf('#produto-') === 0) history.replaceState(null, '', location.pathname + location.search);
    if (foco && foco.focus) foco.focus();
  }

  $$('[data-close]', el).forEach(b => b.addEventListener('click', fechar));
  addEventListener('keydown', e => { if (e.key === 'Escape' && el.classList.contains('on')) fechar(); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-open]');
    if (b) abrir(b.dataset.open);
  });
  return { abrir, fechar };
})();

if (location.hash.indexOf('#produto-') === 0) {
  addEventListener('load', () => setTimeout(() => modal.abrir(location.hash.replace('#produto-', '')), 700));
}

/* ==========================================================================
   ORBIT CAROUSEL — as peças do drop girando em volta do título
   ========================================================================== */
function orbitCarousel(raiz) {
  const itens = V7_PRODUTOS.filter(p => p.drop).slice(0, 9);
  const N = itens.length;
  if (!N) return;
  const passo = 360 / N;

  raiz.innerHTML = `
    <div class="orbita">
      <div class="orbita__palco" id="orbPalco">
        <div class="orbita__centro"><span>Drop</span><em>V7 — 2026</em></div>
        ${itens.map((p, i) => `
          <article class="orb" data-i="${i}">
            <button class="orb__ph" data-orb="${i}" aria-label="${p.nome}">
              <img src="${img(p.imagens[0].src, true)}" style="object-position:${p.imagens[0].pos}"
                   alt="${p.nome}" loading="lazy" decoding="async" draggable="false">
              <span class="orb__tag">${p.tag ? '<span class="tg">' + p.tag + '</span>' : ''}</span>
            </button>
            <div class="orb__b">
              <h3>${p.nome}</h3>
              <p>${CATNOME[p.categoria]}</p>
              <a class="orb__wa" href="${waLink(msgProduto(p))}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
            </div>
          </article>`).join('')}
      </div>
    </div>
    <div class="orbita__hud">
      <span class="orbita__dica">Arraste para girar</span>
      <div class="orbita__rail"><i id="orbRail"></i></div>
      <div class="orbita__setas">
        <button id="orbPrev" aria-label="Anterior">&larr;</button>
        <button id="orbNext" aria-label="Próxima">&rarr;</button>
      </div>
    </div>`;

  const palco = $('#orbPalco', raiz);
  const orbs  = $$('.orb', raiz);
  const rail  = $('#orbRail', raiz);
  const centro = $('.orbita__centro', raiz);

  let R = 600, ang = 0, alvo = 0, rodando = false, tocado = 0;

  function medir() {
    /* offsetWidth e a largura de layout. getBoundingClientRect() aqui volta
       JA deformada pela perspectiva 3D — usar ela fazia o raio crescer a
       cada resize e explodia o carrossel no celular. */
    const w = orbs[0].offsetWidth || 300;
    R = Math.round((w / 2) / Math.tan(Math.PI / N) * 1.18);
    orbs.forEach((o, i) => {
      o.style.transform = `rotateY(${i * passo}deg) translateZ(${R}px)`;
      o.style.marginTop = Math.round(-o.offsetHeight / 2) + 'px';   /* centraliza de verdade */
    });
    centro.style.transform = `translate3d(-50%,-50%,${-Math.round(R * 0.75)}px)`;
  }

  function desenhar() {
    palco.style.transform = `translateZ(${-R}px) rotateY(${ang}deg)`;
    const frente = Math.round(-ang / passo);
    orbs.forEach((o, i) => {
      const a = ((i * passo + ang) % 360 + 540) % 360 - 180;   /* -180..180, 0 = na frente */
      const c = Math.cos(a * Math.PI / 180);
      o.style.opacity = (0.18 + 0.82 * Math.pow(clamp((c + 1) / 2, 0, 1), 1.7)).toFixed(3);
      o.classList.toggle('frente', Math.abs(a) < passo / 2);
    });
    const idx = ((frente % N) + N) % N;
    rail.style.transform = `translateX(${(idx / (N - 1)) * (100 / 0.14 - 100)}%)`;
  }

  function loop() {
    ang = lerp(ang, alvo, .12);
    if (Math.abs(ang - alvo) < .01) { ang = alvo; rodando = false; }
    desenhar();
    if (rodando) requestAnimationFrame(loop);
  }
  function anima() { if (!rodando) { rodando = true; requestAnimationFrame(loop); } }
  function irPara(i) { alvo = -i * passo; anima(); }
  function girar(d) { alvo = Math.round(alvo / passo) * passo - d * passo; anima(); }

  $('#orbNext', raiz).addEventListener('click', () => { tocado = Date.now(); girar(1); });
  $('#orbPrev', raiz).addEventListener('click', () => { tocado = Date.now(); girar(-1); });

  /* arrastar (mouse e dedo) */
  let ativo = false, x0 = 0, ang0 = 0, moveu = 0;
  palco.addEventListener('pointerdown', e => {
    ativo = true; moveu = 0; x0 = e.clientX; ang0 = alvo; tocado = Date.now();
    palco.classList.add('arrasta');
    palco.setPointerCapture(e.pointerId);
  });
  palco.addEventListener('pointermove', e => {
    if (!ativo) return;
    const dx = e.clientX - x0;
    moveu = Math.max(moveu, Math.abs(dx));
    alvo = ang0 + dx * 0.22;
    anima();
  });
  function soltar() {
    if (!ativo) return;
    ativo = false;
    palco.classList.remove('arrasta');
    alvo = Math.round(alvo / passo) * passo;
    anima();
  }
  palco.addEventListener('pointerup', soltar);
  palco.addEventListener('pointercancel', soltar);

  /* clique: peça da frente abre o modal, as outras giram até a frente */
  orbs.forEach((o, i) => {
    $('.orb__ph', o).addEventListener('click', e => {
      if (moveu > 6) { e.preventDefault(); return; }
      if (o.classList.contains('frente')) modal.abrir(itens[i].id);
      else { tocado = Date.now(); irPara(i); }
    });
  });

  /* gira sozinho devagar quando a seção está à vista e ninguém mexeu */
  let visivel = false;
  new IntersectionObserver(es => { visivel = es[0].isIntersecting; }, { threshold: .35 }).observe(raiz);
  if (!reduz) setInterval(() => {
    if (visivel && !ativo && Date.now() - tocado > 6000 && !document.hidden) girar(1);
  }, 4200);

  /* no celular a barra do navegador dispara resize a cada rolagem: so
     remedimos quando a largura muda mesmo */
  let larguraOrb = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth === larguraOrb) return;
    larguraOrb = innerWidth;
    medir(); desenhar();
  });
  addEventListener('load', () => { medir(); desenhar(); });
  medir(); desenhar();
  /* uma volta curta de apresentação */
  if (!reduz) { alvo = -passo; anima(); }
}

/* ==========================================================================
   PÁGINA INICIAL
   ========================================================================== */
if (PAGINA === 'home') {

  /* ---------------------------------------------------------- categorias */
  (function () {
    const track = $('#catsTrack'); if (!track) return;
    track.innerHTML = V7_CATEGORIAS.map(c => `
      <a class="cat" href="${CATPAG[c.id]}">
        <img src="${img(c.img, true)}" srcset="${img(c.img, true)} 780w, ${img(c.img)} 1600w"
             sizes="(max-width:900px) 78vw, 40vw" alt="${c.nome}" loading="lazy">
        <span class="cat__b">
          <h3>${c.nome}</h3>
          <p>${c.legenda}</p>
          <span class="cat__go">Ver peças <span aria-hidden="true">&rarr;</span></span>
        </span>
      </a>`).join('');
    $$('.cat img', track).forEach((im, i) => im.style.objectPosition = V7_CATEGORIAS[i].pos);

    const sec = $('.cats'), rail = $('#catsRail');
    let raf = null, atual = 0, max = 0, larguraAnterior = 0;
    function medir() {
      if (mob()) { sec.style.height = ''; track.style.transform = 'translate3d(0,0,0)'; max = 0; return; }
      /* scrollWidth ignora o padding da direita: somamos ele na mao */
      const padDir = parseFloat(getComputedStyle(track).paddingRight) || 0;
      max = Math.max(0, track.scrollWidth + padDir - innerWidth);
      sec.style.height = max > 0 ? (innerHeight + max * 1.15) + 'px' : '';
    }
    function passo() {
      raf = null;
      if (mob() || max <= 0) return;
      const r = sec.getBoundingClientRect();
      const meta = clamp(-r.top / ((sec.offsetHeight - innerHeight) || 1), 0, 1);
      atual = lerp(atual, meta, .16);
      if (Math.abs(atual - meta) < .0005) atual = meta;
      track.style.transform = 'translate3d(' + (-atual * max) + 'px,0,0)';
      rail.style.transform = 'translateX(' + (atual * 354) + '%)';
      if (atual !== meta) raf = requestAnimationFrame(passo);
    }
    function chuta() { if (!raf) raf = requestAnimationFrame(passo); }
    function remedir() { medir(); atual = 0; chuta(); }
    addEventListener('scroll', chuta, { passive: true });
    /* no celular a barra do navegador muda a ALTURA a cada rolagem e dispara
       resize sem parar — so remedimos quando a LARGURA muda de verdade */
    larguraAnterior = innerWidth;
    addEventListener('resize', () => {
      if (innerWidth === larguraAnterior) { chuta(); return; }
      larguraAnterior = innerWidth;
      remedir();
    });
    /* as fotos e a fonte Anton chegam depois e mudam a largura da trilha */
    $$('img', track).forEach(im => im.complete || im.addEventListener('load', remedir, { once: true }));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remedir);
    addEventListener('load', remedir);
    medir(); passo();
  })();

  /* -------------------------------------------------------------- vitrine
     A home nao repete o catalogo inteiro: mostra uma amostra das pecas, com
     as fotos surgindo uma atras da outra. O catalogo completo mora nas
     paginas de categoria (camisetas.html, conjuntos.html, ...).            */
  (function () {
    const vit = $('#vitrine'); if (!vit) return;

    /* atalhos pras paginas de cada categoria */
    const nav = $('#vitNav');
    if (nav) nav.innerHTML = Object.entries(CATNOME)
      .map(([id, n]) => `<a href="${CATPAG[id]}">${cap(n)} <i aria-hidden="true">&rarr;</i></a>`).join('');

    /* escolhe ate 8 pecas alternando as categorias, pra vitrine nao ficar
       so de camiseta. Prioriza quem esta no drop. */
    function selecionar(n) {
      const porCat = {};
      V7_PRODUTOS.forEach(p => (porCat[p.categoria] = porCat[p.categoria] || []).push(p));
      Object.values(porCat).forEach(l => l.sort((a, b) => (b.drop ? 1 : 0) - (a.drop ? 1 : 0)));
      const ordem = Object.keys(CATNOME).filter(k => porCat[k]);
      const fora = [];
      for (let volta = 0; fora.length < n && volta < 12; volta++)
        for (const k of ordem) if (porCat[k][volta] && fora.length < n) fora.push(porCat[k][volta]);
      return fora;
    }

    vit.innerHTML = selecionar(8).map((p, i) => {
      const im = p.imagens[0];
      const tag = p.status === 'ultimas'
        ? '<span class="tg ult">ÚLTIMAS</span>'
        : (p.tag ? '<span class="tg">' + p.tag + '</span>' : '');
      return `
      <button class="shot" data-open="${p.id}" style="--d:${(i % 4) * 0.09 + 0.04}s" aria-label="Ver ${p.nome}">
        <span class="shot__ph">
          <img src="${img(im.src, true)}" srcset="${img(im.src, true)} 780w, ${img(im.src)} 1600w"
               sizes="(max-width:760px) 50vw, (max-width:1200px) 33vw, (max-width:1680px) 25vw, 390px"
               style="object-position:${im.pos}" alt="${p.nome}" loading="lazy" decoding="async">
          <span class="shot__tag">${tag}</span>
        </span>
        <span class="shot__b"><b>${p.nome}</b><i>${CATNOME[p.categoria]}</i></span>
      </button>`;
    }).join('');

    /* as fotos surgem conforme entram na tela */
    $$('.shot', vit).forEach(el => { pendentes.add(el); revealObs.observe(el); });
    varrer();
  })();

  /* ------------------------------------------------------- orbit + faixa */
  if ($('#orbita')) orbitCarousel($('#orbita'));

  (function () {
    const f = $('#faixa'); if (!f) return;
    f.innerHTML = V7_FAIXA.map((x, i) => `
      <div class="faixa__i" style="flex-grow:${i === 0 ? 1.6 : 1}">
        <img src="${img(x.src, true)}" srcset="${img(x.src, true)} 780w, ${img(x.src)} 1600w" sizes="30vw"
             style="object-position:${x.pos}" alt="" loading="lazy">
        <b>${x.legenda}</b>
      </div>`).join('');
  })();

  /* ----------------------------------- motor de scroll (hero, drop, faixa)
     Um loop só, com suavização. Só transform e opacity.                    */
  (function () {
    if (reduz) return;
    const hero = $('.hero'), heroMedia = $('#heroMedia'), heroIn = $('.hero__in');
    const drop = $('.drop'), dropMedia = $('#dropMedia'), dropVeu = $('#dropVeu'),
          dropBar = $('#dropBar'), linhas = $$('[data-drop-line]');
    const linhasImp = $$('.impact__row');
    if (!hero || !drop) return;

    function alturaDrop() { drop.style.height = mob() ? '180vh' : '240vh'; }
    alturaDrop();

    let sHero = 0, sDrop = 0, ativo = false;

    function quadro() {
      const hr = hero.getBoundingClientRect();
      const mHero = clamp(-hr.top / innerHeight, 0, 1.3);
      const dr = drop.getBoundingClientRect();
      const mDrop = clamp(-dr.top / ((drop.offsetHeight - innerHeight) || 1), 0, 1);

      sHero = lerp(sHero, mHero, .13);
      sDrop = lerp(sDrop, mDrop, .11);

      if (sHero < 1.25) {
        heroMedia.style.transform = 'translate3d(0,' + (sHero * innerHeight * .22) + 'px,0) scale(' + (1 + sHero * .1) + ')';
        heroIn.style.transform = 'translate3d(0,' + (-sHero * innerHeight * .09) + 'px,0)';
        heroIn.style.opacity = String(clamp(1 - sHero * 1.25, 0, 1));
      }

      const p = sDrop;
      const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      dropMedia.style.transform = 'translate3d(0,' + ((p - .5) * -64) + 'px,0) scale(' + (1.26 - e * .26) + ')';
      dropVeu.style.opacity = String(clamp(1 - e * .5, .5, 1));
      dropBar.style.transform = 'scaleX(' + p + ')';
      linhas.forEach((l, i) => {
        const dir = i === 1 ? 1 : -1;
        const o = clamp((e - i * .08) * 2.4, 0, 1);
        l.style.transform = 'translate3d(' + (dir * (1 - o) * 24) + '%,0,0)';
        l.style.opacity = String(clamp(o * 1.15, .05, 1));
      });

      linhasImp.forEach(r => {
        const rect = r.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > innerHeight + 200) return;
        const q = (innerHeight - rect.top) / (innerHeight + rect.height);
        r.style.transform = 'translate3d(' + (+r.dataset.imp * (q - .5) * 28) + '%,0,0)';
      });

      if (Math.abs(sHero - mHero) < .0006 && Math.abs(sDrop - mDrop) < .0006) { ativo = false; return; }
      requestAnimationFrame(quadro);
    }
    function chuta() { if (!ativo) { ativo = true; requestAnimationFrame(quadro); } }

    addEventListener('scroll', chuta, { passive: true });
    addEventListener('resize', () => { alturaDrop(); chuta(); });
    chuta();

    /* o vídeo do drop roda solto, sem seek por scroll — é o que garante fluidez */
    const dv = $('#dropVideo');
    if (dv) new IntersectionObserver(es => {
      es.forEach(e => e.isIntersecting ? dv.play().catch(() => {}) : dv.pause());
    }, { threshold: .05 }).observe(drop);
  })();
}

/* ==========================================================================
   PÁGINA DE CATEGORIA
   ========================================================================== */
if (PAGINA === 'categoria' && CAT) {
  const lista = V7_PRODUTOS.filter(p => p.categoria === CAT);
  const info = V7_CATEGORIAS.find(c => c.id === CAT) || {};

  const capa = $('#cheroImg');
  if (capa && info.img) {
    capa.src = img(info.img);
    capa.style.objectPosition = info.pos || '50% 45%';
  }
  const tit = $('#cheroTitulo'); if (tit) tit.textContent = CATNOME[CAT];
  const leg = $('#cheroLegenda'); if (leg) leg.textContent = info.legenda || '';
  const qtd = $('#cheroQtd');
  if (qtd) qtd.innerHTML = String(lista.length).padStart(2, '0') + '<span>peças no catálogo</span>';

  const grid = $('#gridCat'); if (grid) pintarGrid(grid, lista);

  const outras = $('#outras');
  if (outras) {
    outras.innerHTML = V7_CATEGORIAS.filter(c => c.id !== CAT).map(c => `
      <a class="outra rv-w" href="${CATPAG[c.id]}">
        <img src="${img(c.img, true)}" style="object-position:${c.pos}" alt="${c.nome}" loading="lazy">
        <b>${c.nome}</b>
      </a>`).join('');
    watchReveal(outras);
  }

  /* parallax da capa */
  if (!reduz) {
    const bg = $('#cheroBg');
    let raf = null;
    function quadro() {
      raf = null;
      const y = clamp(scrollY, 0, innerHeight);
      bg.style.transform = 'translate3d(0,' + (y * .22) + 'px,0) scale(' + (1 + y / innerHeight * .08) + ')';
    }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(quadro); }, { passive: true });
    quadro();
  }
}

/* ============================================================== âncoras */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2 || id.indexOf('#produto-') === 0) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    const off = (id === '#catalogo' || id === '#lancamentos') ? 80 : 0;
    scrollTo({ top: t.getBoundingClientRect().top + scrollY - off, behavior: reduz ? 'auto' : 'smooth' });
  });
});

watchReveal();
varrer();
})();
