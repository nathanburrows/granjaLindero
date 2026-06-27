/* =============================================================
   Granja Lindero — Main JS
   ============================================================= */

(function () {
  'use strict';

  /* ── Utilities ─────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function show(el) { if (el) el.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function hide(el) { if (el) el.classList.add('hidden'); document.body.style.overflow = ''; }

  /* ── Navbar ─────────────────────────────────────────────── */
  var nav = document.getElementById('gl-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Hamburger
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  // More dropdown
  var moreBtn = document.getElementById('nav-more-btn');
  var dropdown = document.getElementById('nav-dropdown');
  if (moreBtn && dropdown) {
    moreBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dropdown.classList.toggle('open');
      moreBtn.classList.toggle('open', open);
      moreBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
      moreBtn.classList.remove('open');
      moreBtn.setAttribute('aria-expanded', 'false');
    });
    dropdown.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  /* ── Hero video crossfade ────────────────────────────────── */
  var vidA = document.getElementById('hero-vid-a');
  var vidB = document.getElementById('hero-vid-b');
  if (vidA && vidB) {
    var busy = false;
    function crossfade(from, to) {
      if (busy) return;
      busy = true;
      to.currentTime = 0;
      to.play().catch(function () {});
      from.classList.remove('on-top'); from.classList.add('off-top');
      to.classList.remove('off-top'); to.classList.add('on-top');
      setTimeout(function () { from.pause(); busy = false; }, 7200);
    }
    vidA.addEventListener('ended', function () { crossfade(vidA, vidB); });
    vidB.addEventListener('ended', function () { crossfade(vidB, vidA); });
    vidA.play().catch(function () {});
  }

  /* ── About / Mission modal ───────────────────────────────── */
  var aboutModal  = document.getElementById('about-modal');
  var aboutTrigger= document.getElementById('about-modal-trigger');
  var aboutClose  = document.getElementById('about-modal-close');
  if (aboutModal && aboutTrigger && aboutClose) {
    aboutTrigger.addEventListener('click', function () { show(aboutModal); });
    aboutClose.addEventListener('click', function () { hide(aboutModal); });
    aboutModal.addEventListener('click', function (e) { if (e.target === aboutModal) hide(aboutModal); });
  }

  /* ── Testimonials carousel ───────────────────────────────── */
  var track = document.getElementById('testi-track');
  var dotsContainer = document.getElementById('testi-dots');
  if (track && dotsContainer) {
    var slides = $$('.testimonial-slide', track);
    var dots   = $$('.testimonial-dot', dotsContainer);
    var current = 0;
    var timer;

    function goTo(i) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function next() { goTo((current + 1) % slides.length); }

    function startTimer() { timer = setInterval(next, 5000); }
    function resetTimer() { clearInterval(timer); startTimer(); }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); resetTimer(); });
    });

    startTimer();
  }

  /* ── Accommodation modal ─────────────────────────────────── */
  var accModal     = document.getElementById('acc-modal');
  var accModalClose= document.getElementById('acc-modal-close');
  var accModalTitle= document.getElementById('acc-modal-title');
  var accPanels    = $$('.acc-panel');
  var accBuildBtns = $$('.acc-building-btn');
  var accOpenBtns  = $$('.acc-open-modal');
  var accSelectedBadges = $$('.acc-selected-badge');

  // Switch visible panel
  function switchPanel(targetId) {
    accPanels.forEach(function (p) {
      p.style.display = (p.dataset.panel === targetId) ? '' : 'none';
    });
    accBuildBtns.forEach(function (b) {
      var isActive = b.dataset.target === targetId;
      b.classList.toggle('active', isActive);
      var badge = b.querySelector('.acc-selected-badge');
      if (badge) badge.style.display = isActive ? '' : 'none';
    });
  }

  accBuildBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { switchPanel(this.dataset.target); });
  });

  // Open modal
  function openAccModal(buildingId, buildingName) {
    if (accModalTitle) accModalTitle.textContent = buildingName || '';
    // Show correct room set
    $$('.acc-modal-rooms').forEach(function (el) {
      el.style.display = (el.dataset.buildingRooms === buildingId) ? '' : 'none';
    });
    show(accModal);
  }

  accOpenBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var buildingId = this.dataset.building;
      // Find panel building name
      var panel = document.querySelector('.acc-panel[data-panel="' + buildingId + '"]');
      var name = panel ? (panel.querySelector('.section-title') || {}).textContent || buildingId : buildingId;
      openAccModal(buildingId, name);
    });
  });

  if (accModalClose && accModal) {
    accModalClose.addEventListener('click', function () { hide(accModal); });
    accModal.addEventListener('click', function (e) { if (e.target === accModal) hide(accModal); });
  }

  // Booking form — mode toggle
  var modeBtns  = $$('.mode-btn');
  var modeDates = document.getElementById('mode-dates');
  var modeNights= document.getElementById('mode-nights');
  modeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      modeBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      var mode = this.dataset.mode;
      if (modeDates)  modeDates.style.display  = mode === 'dates'  ? '' : 'none';
      if (modeNights) modeNights.style.display = mode === 'nights' ? '' : 'none';
    });
  });

  // Steppers
  function makeStepperPair(decId, incId, valId, min, max) {
    var dec = document.getElementById(decId);
    var inc = document.getElementById(incId);
    var val = document.getElementById(valId);
    if (!dec || !inc || !val) return;
    var v = parseInt(val.textContent) || 0;
    function update() {
      val.textContent = v;
      dec.disabled = v <= min;
      inc.disabled = v >= max;
    }
    dec.addEventListener('click', function () { if (v > min) { v--; update(); } });
    inc.addEventListener('click', function () { if (v < max) { v++; update(); } });
    update();
  }
  makeStepperPair('nights-dec',   'nights-inc',   'nights-val',   1, 30);
  makeStepperPair('adults-dec',   'adults-inc',   'adults-val',   1, 20);
  makeStepperPair('children-dec', 'children-inc', 'children-val', 0, 10);

  // Effective checkout display
  var checkinNEl = document.getElementById('acc-checkin-n');
  var nightsValEl= document.getElementById('nights-val');
  var effCoEl    = document.getElementById('effective-checkout');
  function updateEffectiveCheckout() {
    if (!checkinNEl || !nightsValEl || !effCoEl) return;
    var d = checkinNEl.value;
    var n = parseInt(nightsValEl.textContent) || 0;
    if (!d) { effCoEl.textContent = ''; return; }
    var dt = new Date(d + 'T12:00:00');
    dt.setDate(dt.getDate() + n);
    var label = GL && GL.lang === 'es' ? 'Salida: ' : 'Check-out: ';
    effCoEl.textContent = label + dt.toISOString().split('T')[0];
  }
  if (checkinNEl) checkinNEl.addEventListener('change', updateEffectiveCheckout);
  if (document.getElementById('nights-dec')) {
    document.getElementById('nights-dec').addEventListener('click', updateEffectiveCheckout);
    document.getElementById('nights-inc').addEventListener('click', updateEffectiveCheckout);
  }

  // Breakfast toggle
  var bfSwitch = document.getElementById('breakfast-switch');
  var bfToggle = document.getElementById('breakfast-toggle');
  if (bfSwitch && bfToggle) {
    bfToggle.addEventListener('click', function () {
      bfSwitch.classList.toggle('on');
    });
  }

  // Room WA links
  $$('.acc-room-wa').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var building = this.dataset.building || '';
      var room     = this.dataset.room || '';
      var checkin  = ($('#acc-checkin') || {}).value || ($('#acc-checkin-n') || {}).value || '';
      var checkout = ($('#acc-checkout') || {}).value || '';
      var nights   = (nightsValEl || {}).textContent || '';
      var adults   = ($('#adults-val') || {}).textContent || '2';
      var children = ($('#children-val') || {}).textContent || '0';
      var isEs     = GL && GL.lang === 'es';
      var lines = isEs ? [
        'Me gustaría consultar disponibilidad para:',
        'Edificio: ' + building,
        'Habitación: ' + room,
        checkin   ? 'Llegada: '   + checkin   : '',
        checkout  ? 'Salida: '    + checkout  : '',
        nights    ? 'Noches: '    + nights    : '',
        'Huéspedes: ' + adults + ' adultos' + (parseInt(children) > 0 ? ', ' + children + ' niños' : ''),
      ] : [
        'I would like to check availability for:',
        'Building: ' + building,
        'Room: '     + room,
        checkin   ? 'Check-in: '  + checkin   : '',
        checkout  ? 'Check-out: ' + checkout  : '',
        nights    ? 'Nights: '    + nights    : '',
        'Guests: ' + adults + ' adults' + (parseInt(children) > 0 ? ', ' + children + ' children' : ''),
      ];
      var msg = lines.filter(Boolean).join('\n');
      var waNum = (GL && GL.wa_number) || '51966721057';
      window.open('https://wa.me/' + waNum + '?text=' + encodeURIComponent(msg), '_blank');
    });
  });

  /* ── Groups modal ─────────────────────────────────────────── */
  var grpModal = document.getElementById('grp-modal');
  var grpOpen  = document.getElementById('grp-modal-open');
  var grpClose = document.getElementById('grp-modal-close');
  if (grpModal && grpOpen && grpClose) {
    grpOpen.addEventListener('click', function () { show(grpModal); });
    grpClose.addEventListener('click', function () { hide(grpModal); });
    grpModal.addEventListener('click', function (e) { if (e.target === grpModal) hide(grpModal); });
  }

  /* ── FAQ accordion ────────────────────────────────────────── */
  window.glToggleFaq = function (btn, answerId) {
    var answer = document.getElementById(answerId);
    var item   = btn.closest('.faq-item');
    if (!answer || !item) return;
    var isOpen = item.classList.contains('open');
    // Close all others
    $$('.faq-item.open').forEach(function (fi) {
      fi.classList.remove('open');
      fi.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  /* ── Smooth scroll for same-page hash links ─────────────── */
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    // Match links like /#section or #section
    var match = href.match(/(?:^\/)?#(.+)$/);
    if (!match) return;
    a.addEventListener('click', function (e) {
      var target = document.getElementById(match[1]);
      if (!target) return;
      e.preventDefault();
      // Close mobile menu if open
      if (mobileMenu) { mobileMenu.classList.remove('open'); }
      if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── Scroll spy — highlight active nav link ──────────────── */
  var navAnchors = $$('#gl-nav .nav-links a[href]').filter(function (a) {
    return a.getAttribute('href').indexOf('#') !== -1;
  });
  var sections = navAnchors.map(function (a) {
    var id = a.getAttribute('href').split('#')[1];
    return document.getElementById(id);
  }).filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navAnchors.forEach(function (a) {
          var matches = a.getAttribute('href').split('#')[1] === id;
          a.classList.toggle('active', matches);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ── Escape key closes all modals ────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    [aboutModal, accModal, grpModal].forEach(function (m) {
      if (m && !m.classList.contains('hidden')) hide(m);
    });
  });

})();
