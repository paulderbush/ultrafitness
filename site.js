/* ============================================================
   ULTRA FITNESS — Shared site chrome
   Injects nav, mobile menu, footer, booking modal.
   Wires phone-mask, scroll-reveal, smooth anchor scroll.
   ============================================================ */
(function () {
  const PHONE = '+7 499 226 09 32';
  const PHONE_HREF = 'tel:+74992260932';

  // ---------- helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const onIndex = /(^|\/)index\.html$/.test(location.pathname) || location.pathname.endsWith('/') || location.pathname === '/';

  function buildAnchor(target) {
    // If we're on index, smooth scroll; otherwise jump back to index with hash
    if (onIndex) return `#${target}`;
    return `index.html#${target}`;
  }

  // ---------- NAV
  const navHTML = `
    <nav class="uf-nav glass" id="ufNav">
      <a href="index.html" class="uf-nav__logo" aria-label="Ultra Fitness">
        <img src="assets/logo.webp" alt="UF" />
      </a>
      <div class="uf-nav__links">
        <a class="uf-nav__link" href="rental.html">Аренда зала</a>
        <a class="uf-nav__link" href="schedule.html">Расписание</a>
        <a class="uf-nav__link" href="${buildAnchor('about')}">О клубе</a>
        <a class="uf-nav__link" href="${buildAnchor('gallery')}">Галерея</a>
        <a class="uf-nav__link" href="${buildAnchor('news')}">Новости</a>
        <a class="uf-nav__link" href="https://ultra-fitness.ru/account" target="_blank" rel="noopener">Личный кабинет</a>
        <a class="uf-nav__link" href="reforma.html">REформа</a>
      </div>
      <div class="uf-nav__right">
        <a class="uf-nav__phone" href="${PHONE_HREF}">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${PHONE}
        </a>
        <button class="uf-nav__cta" data-open-booking>Забронировать карту</button>
        <a class="uf-nav__mobile-phone" href="${PHONE_HREF}" aria-label="Позвонить">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
        <button class="uf-nav__burger" id="ufBurger" aria-label="Меню">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </nav>

    <div class="uf-menu" id="ufMenu" aria-hidden="true">
      <div class="uf-menu__top">
        <img src="assets/logo.webp" alt="UF" />
        <button class="uf-menu__close" id="ufMenuClose" aria-label="Закрыть">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="uf-menu__list">
        <a class="uf-menu__item" href="rental.html">Аренда зала</a>
        <a class="uf-menu__item" href="schedule.html">Расписание</a>
        <a class="uf-menu__item" href="${buildAnchor('about')}">О клубе</a>
        <a class="uf-menu__item" href="${buildAnchor('gallery')}">Галерея</a>
        <a class="uf-menu__item" href="${buildAnchor('news')}">Новости</a>
        <a class="uf-menu__item" href="https://ultra-fitness.ru/account" target="_blank" rel="noopener">Личный кабинет</a>
        <a class="uf-menu__item" href="reforma.html">REформа</a>
      </div>
      <div class="uf-menu__bottom">
        <a class="uf-menu__phone" href="${PHONE_HREF}">${PHONE}</a>
        <button class="btn btn--primary" data-open-booking>Забронировать карту</button>
      </div>
    </div>
  `;

  // ---------- FOOTER
  const footerHTML = `
    <footer class="uf-footer">
      <div class="uf-footer__grid">
        <div class="uf-footer__brand">
          <img src="assets/logo.webp" alt="UF" />
          <a href="https://yandex.ru/maps/?text=г.Люберцы+ул.+Побратимов+7" target="_blank" rel="noopener">г. Люберцы, ул. Побратимов 7</a>
          <a class="phone" href="${PHONE_HREF}">${PHONE}</a>
          <a href="mailto:info@ultra-fitness.ru">info@ultra-fitness.ru</a>
          <a href="app.html">Мобильное приложение →</a>
        </div>
        <div class="uf-footer__col">
          <h4>Клуб</h4>
          <ul>
            <li><a href="${buildAnchor('about')}">О клубе</a></li>
            <li><a href="${buildAnchor('gallery')}">Пространства</a></li>
            <li><a href="schedule.html">Расписание</a></li>
            <li><a href="${buildAnchor('news')}">Новости</a></li>
            <li><a href="https://ultra-fitness.ru/account" target="_blank" rel="noopener">Личный кабинет</a></li>
            <li><a href="freeze.html">Заморозка карты</a></li>
            <li><a href="#">Вакансии</a></li>
          </ul>
        </div>
        <div class="uf-footer__col">
          <h4>Документы</h4>
          <ul>
            <li><a href="oferta.html">Договор оферты</a></li>
            <li><a href="policy.html" class="policy">Политика конфиденциальности</a></li>
            <li><a href="personal.html" class="policy">Политика обработки персональных данных</a></li>
            <li><a href="https://drive.google.com/file/d/1C5T8c_Ud1zoTBxYXEl83Mucf7gDqw_MA/view" target="_blank" rel="noopener">Правила техники безопасности</a></li>
            <li><a href="ndfl.html">Справка НДФЛ</a></li>
          </ul>
        </div>
        <div class="uf-footer__col uf-footer__social-col">
          <h4>Соцсети</h4>
          <div class="uf-footer__social">
            <a href="https://vk.com/ultra_fitness" target="_blank" rel="noopener" aria-label="ВКонтакте">
              <svg viewBox="0 0 24 24"><path d="M12.785 17.273c-5.595 0-8.787-3.836-8.92-10.215h2.802c.092 4.682 2.156 6.66 3.79 7.068V7.058h2.638v4.043c1.614-.174 3.31-2.013 3.882-4.043h2.638a7.945 7.945 0 0 1-3.658 5.193 8.236 8.236 0 0 1 4.28 5.022h-2.904c-.49-1.521-2.034-3.45-4.238-3.658v3.658h-.317z"/></svg>
            </a>
            <a href="https://t.me/ultra_fitness" target="_blank" rel="noopener" aria-label="Telegram">
              <svg viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
            </a>
          </div>
          <h4 style="margin-top:32px;">Приложение</h4>
          <ul>
            <li><a href="app.html">Скачать →</a></li>
          </ul>
        </div>
      </div>
      <div class="uf-footer__bottom">
        <div>© ${new Date().getFullYear()} Ultra Fitness — фитнес-клуб премиум-класса в Люберцах</div>
        <div>ИНН 5027292099 · ОГРН 1235000089752</div>
      </div>
    </footer>
  `;

  // ---------- BOOKING MODAL
  const modalHTML = `
    <div class="uf-modal" id="ufModal" aria-hidden="true">
      <div class="uf-modal__backdrop" data-close-booking></div>
      <div class="uf-modal__panel glass-strong">
        <button class="uf-modal__close" data-close-booking aria-label="Закрыть">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="uf-modal__body">
          <div class="uf-modal__eyebrow" id="ufModalEyebrow">
            <span style="width:6px;height:6px;background:var(--brand-bright);border-radius:999px;box-shadow:0 0 12px var(--brand-bright)"></span>
            <span data-modal-eyebrow>Заявка на карту</span>
          </div>
          <h3 class="uf-modal__title" data-modal-title>Забронируйте<br/>клубную карту</h3>
          <p class="uf-modal__sub" data-modal-sub>Менеджер позвонит в течение 15 минут, расскажет про действующие акции и подберёт карту под ваши задачи.</p>
          <form class="uf-form" id="ufForm" novalidate>
            <div class="uf-field">
              <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name" />
            </div>
            <div class="uf-field">
              <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required autocomplete="tel" data-phone-mask />
            </div>
            <label class="uf-consent">
              <input type="checkbox" name="consent" checked required />
              <span class="check"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span>Я даю согласие на обработку моих персональных данных в соответствии с <a href="#">Политикой</a></span>
            </label>
            <button type="submit" class="btn btn--primary">
              <span data-modal-button>Забронировать</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </form>
        </div>
        <div class="uf-thanks" id="ufThanks" style="display:none;">
          <div class="uf-thanks__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 class="uf-modal__title">Заявка принята</h3>
          <p class="uf-modal__sub">Свяжемся с вами в ближайшее время. Спасибо, что выбрали Ultra Fitness!</p>
        </div>
      </div>
    </div>
  `;

  // ---------- VIDEO MODAL
  const videoHTML = `
    <div class="uf-modal" id="ufVideo" aria-hidden="true">
      <div class="uf-modal__backdrop" data-close-video></div>
      <div class="uf-video__panel">
        <button class="uf-modal__close uf-video__close" data-close-video aria-label="Закрыть">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="uf-video__frame">
          <iframe id="ufVideoIframe" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `;

  // ---------- INJECT
  function inject() {
    const navMount = document.createElement('div');
    navMount.innerHTML = navHTML;
    document.body.insertBefore(navMount, document.body.firstChild);

    const footerMount = document.createElement('div');
    footerMount.innerHTML = footerHTML;
    document.body.appendChild(footerMount);

    const modalMount = document.createElement('div');
    modalMount.innerHTML = modalHTML + videoHTML;
    document.body.appendChild(modalMount);
  }

  // ---------- BEHAVIORS
  function wireMenu() {
    const burger = $('#ufBurger');
    const menu = $('#ufMenu');
    const close = $('#ufMenuClose');
    if (burger && menu) {
      burger.addEventListener('click', () => {
        menu.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }
    if (close && menu) {
      close.addEventListener('click', () => {
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }
    if (menu) {
      $$('.uf-menu__item', menu).forEach((a) => {
        a.addEventListener('click', () => {
          menu.classList.remove('is-open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  function wireModal() {
    const modal = $('#ufModal');
    if (!modal) return;
    const DEFAULTS = {
      eyebrow: 'Заявка на карту',
      title: 'Забронируйте<br/>клубную карту',
      sub: 'Менеджер позвонит в течение 15 минут, расскажет про действующие акции и подберёт карту под ваши задачи.',
      button: 'Забронировать',
    };
    function applyConfig(cfg) {
      modal.querySelector('[data-modal-eyebrow]').textContent = cfg.eyebrow || DEFAULTS.eyebrow;
      modal.querySelector('[data-modal-title]').innerHTML = cfg.title || DEFAULTS.title;
      modal.querySelector('[data-modal-sub]').textContent = cfg.sub || DEFAULTS.sub;
      modal.querySelector('[data-modal-button]').textContent = cfg.button || DEFAULTS.button;
    }
    const open = (cfg) => {
      applyConfig(cfg || {});
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      // reset after fade
      setTimeout(() => {
        const form = $('#ufForm', modal);
        const thanks = $('#ufThanks', modal);
        const body = $('.uf-modal__body', modal);
        if (form && thanks && body) {
          form.reset();
          // re-check consent
          const consent = form.querySelector('input[name="consent"]');
          if (consent) consent.checked = true;
          thanks.style.display = 'none';
          body.style.display = '';
        }
      }, 400);
    };
    window.UF_openBooking = open;
    window.UF_closeBooking = close;

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-open-booking]');
      if (t) {
        e.preventDefault();
        open({
          eyebrow: t.dataset.modalEyebrow,
          title: t.dataset.modalTitle,
          sub: t.dataset.modalSub,
          button: t.dataset.modalButton,
        });
      }
      const c = e.target.closest('[data-close-booking]');
      if (c) {
        e.preventDefault();
        close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    const form = $('#ufForm', modal);
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const consent = form.consent.checked;
        if (!name || phone.replace(/\D/g, '').length < 11 || !consent) {
          if (!consent) form.querySelector('.uf-consent').animate(
            [{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],
            {duration:300}
          );
          return;
        }
        const body = $('.uf-modal__body', modal);
        const thanks = $('#ufThanks', modal);
        body.style.display = 'none';
        thanks.style.display = 'block';
      });
    }
  }

  function wireVideoModal() {
    const modal = $('#ufVideo');
    if (!modal) return;
    const iframe = $('#ufVideoIframe', modal);
    const VK_EMBED = 'https://vk.com/video_ext.php?oid=-19822697&id=456239900&hd=2&autoplay=1';

    const open = () => {
      iframe.src = VK_EMBED;
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      // stop playback by clearing src after fade
      setTimeout(() => { iframe.src = 'about:blank'; }, 400);
    };
    window.UF_openVideo = open;
    window.UF_closeVideo = close;

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-open-video]');
      if (t) { e.preventDefault(); open(); }
      const c = e.target.closest('[data-close-video]');
      if (c) { e.preventDefault(); close(); }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  function wirePhoneMask() {
    document.addEventListener('input', (e) => {
      const el = e.target.closest('[data-phone-mask]');
      if (!el) return;
      let v = el.value.replace(/\D/g, '');
      if (v.startsWith('8')) v = '7' + v.slice(1);
      if (!v.startsWith('7')) v = '7' + v;
      v = v.slice(0, 11);
      let out = '+7';
      if (v.length > 1) out += ' (' + v.slice(1, 4);
      if (v.length >= 4) out += ') ' + v.slice(4, 7);
      if (v.length >= 7) out += '-' + v.slice(7, 9);
      if (v.length >= 9) out += '-' + v.slice(9, 11);
      el.value = out;
    });
    document.addEventListener('focus', (e) => {
      const el = e.target.closest && e.target.closest('[data-phone-mask]');
      if (!el) return;
      if (!el.value) el.value = '+7 ';
    }, true);
  }

  function wireReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    $$('.reveal').forEach((el) => io.observe(el));
  }

  function wireScrollNavCondense() {
    const nav = $('#ufNav');
    if (!nav) return;
    let last = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 60) {
        nav.style.background = 'linear-gradient(180deg, rgba(10,12,14,0.72), rgba(10,12,14,0.52))';
      } else {
        nav.style.background = '';
      }
      last = y;
    }, { passive: true });
  }

  function wireActiveLinks() {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.uf-nav__link').forEach((a) => {
      const href = a.getAttribute('href').toLowerCase();
      if (href === file || (file === '' && href === 'index.html')) {
        a.classList.add('is-active');
      }
    });
  }

  // ---------- INIT
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  function init() {
    inject();
    wireMenu();
    wireModal();
    wireVideoModal();
    wirePhoneMask();
    wireReveal();
    wireScrollNavCondense();
    wireActiveLinks();
  }
})();
