// Buy Me Maybe — tiny vanilla interactions. No deps, no bundler.

(function () {

  // Active nav link: highlight based on scroll position only.
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionIds = ['hero', 'demo', 'behind', 'about'];

  function setActiveFromScroll() {
    const scrollY = window.scrollY + 80;
    let current = sectionIds[0];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActiveFromScroll, { passive: true });
  setActiveFromScroll();

  // Hamburger menu toggle.
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer    = document.querySelector('.nav-drawer');
  const drawerLinks = document.querySelectorAll('.nav-drawer-link');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
    });
    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      });
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Doodle parallax — skip on touch-only devices.
  const isTouchOnly = window.matchMedia('(hover: none)').matches;
  if (!isTouchOnly) {
    const doodles = document.querySelectorAll('.doodle');
    const baseTransforms = new Map();
    doodles.forEach((d) => {
      const t = getComputedStyle(d).transform;
      baseTransforms.set(d, t === 'none' ? '' : t);
    });
    let raf = 0;
    window.addEventListener('mousemove', (e) => {
      const targetX = (e.clientX / window.innerWidth  - 0.5) * 18;
      const targetY = (e.clientY / window.innerHeight - 0.5) * 18;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          doodles.forEach((d, i) => {
            const depth = 0.4 + (i % 3) * 0.25;
            d.style.transform = `${baseTransforms.get(d) || ''} translate(${targetX * depth}px, ${targetY * depth}px)`;
          });
          raf = 0;
        });
      }
    }, { passive: true });
  }

  // Easter egg: click the title to jiggle it.
  const title = document.querySelector('.title');
  if (title) {
    title.addEventListener('click', () => {
      title.animate(
        [{ transform: 'rotate(-2deg)' }, { transform: 'rotate(3deg)' },
         { transform: 'rotate(-2deg)' }, { transform: 'rotate(0deg)' }],
        { duration: 420, easing: 'ease-in-out' }
      );
    });
  }

})();
