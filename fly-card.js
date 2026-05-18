/* ============================================================
   FLY-CARD — Apple-style scroll-driven membership card
   The card travels through the page on scroll, lerping between
   waypoints anchored to sections.
   ============================================================ */
(function () {
  const card = document.getElementById('flyCard');
  if (!card) return;

  const sections = {
    hero: document.getElementById('hero'),
    stats: document.getElementById('stats'),
    about: document.getElementById('about'),
    offer: document.getElementById('offer999'),
    sales: document.getElementById('sales'),
    gallery: document.getElementById('gallery'),
    news: document.getElementById('news'),
    map: document.getElementById('map'),
  };

  // Waypoints describe the card position when a section's *top* aligns
  // somewhere in the viewport. We compute a continuous progress value
  // along [0, N-1] based on scrollY relative to section tops, then lerp.
  // Each waypoint: x/y in viewport units (vw / vh), rotation (deg), scale, opacity.
  const waypoints = [
    // 0: Hero — top-right corner, off the title, slight tilt
    { section: 'hero',    xv: 82, yv: 18, rot: -12, scale: 0.95, opacity: 1 },
    // 1: Stats — center, larger, slight tilt other way
    { section: 'stats',   xv: 50, yv: 50, rot: 6,   scale: 1.15, opacity: 1 },
    // 2: About — left side
    { section: 'about',   xv: 22, yv: 55, rot: -14, scale: 0.95, opacity: 1 },
    // 3: 999 offer — right top
    { section: 'offer',   xv: 75, yv: 25, rot: 10,  scale: 0.85, opacity: 1 },
    // 4: Sales — bottom-right small (out of the way of cards)
    { section: 'sales',   xv: 88, yv: 78, rot: -8,  scale: 0.65, opacity: 0.9 },
    // 5: Gallery — top-right small
    { section: 'gallery', xv: 90, yv: 18, rot: 12,  scale: 0.55, opacity: 0.8 },
    // 6: News — corner dock
    { section: 'news',    xv: 88, yv: 82, rot: -6,  scale: 0.55, opacity: 0.9 },
    // 7: Map — fade to corner
    { section: 'map',     xv: 90, yv: 88, rot: 0,   scale: 0.5,  opacity: 0.7 },
  ];

  const cardW = () => card.offsetWidth;
  const cardH = () => card.offsetHeight;

  function getSectionTops() {
    return waypoints.map((wp) => {
      const s = sections[wp.section];
      if (!s) return 0;
      const rect = s.getBoundingClientRect();
      return rect.top + window.scrollY;
    });
  }

  const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  function compute() {
    const tops = getSectionTops();
    const vh = window.innerHeight;
    const trigger = window.scrollY + vh * 0.45; // anchor point in viewport

    // find segment
    let i = 0;
    for (let k = 0; k < tops.length - 1; k++) {
      if (trigger >= tops[k] && trigger < tops[k + 1]) { i = k; break; }
      if (trigger >= tops[k + 1]) i = k + 1;
    }
    if (i >= waypoints.length - 1) i = waypoints.length - 2;

    const a = waypoints[i];
    const b = waypoints[i + 1] || waypoints[i];
    const span = (tops[i + 1] - tops[i]) || 1;
    const tRaw = (trigger - tops[i]) / span;
    const t = Math.max(0, Math.min(1, easeInOut(Math.max(0, Math.min(1, tRaw)))));

    const xv = a.xv + (b.xv - a.xv) * t;
    const yv = a.yv + (b.yv - a.yv) * t;
    const rot = a.rot + (b.rot - a.rot) * t;
    const scale = a.scale + (b.scale - a.scale) * t;
    const opacity = a.opacity + (b.opacity - a.opacity) * t;

    const vw = window.innerWidth;
    const cw = cardW();
    const ch = cardH();
    // position uses center reference; convert vw/vh to px
    const px = (xv / 100) * vw - cw / 2;
    const py = (yv / 100) * window.innerHeight - ch / 2;

    // gentle float layered on top of the position (sin of scrollY)
    const floatY = Math.sin(window.scrollY * 0.004) * 8;
    const floatR = Math.sin(window.scrollY * 0.003) * 2;

    card.style.left = '0px';
    card.style.top = '0px';
    card.style.transform =
      `translate3d(${px}px, ${py + floatY}px, 0) ` +
      `rotateZ(${rot + floatR}deg) ` +
      `rotateY(${Math.sin(window.scrollY * 0.002) * 6}deg) ` +
      `scale(${scale})`;
    card.style.opacity = opacity;
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', compute);
  // recompute after layout settles
  setTimeout(compute, 50);
  setTimeout(compute, 400);
  window.addEventListener('load', compute);
})();
