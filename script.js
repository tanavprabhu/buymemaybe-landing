// Buy Me Maybe — tiny vanilla interactions. No deps, no bundler.

(function () {

  // Reveal sections as they scroll into view.
  const sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sections.forEach((s) => io.observe(s));
  } else {
    sections.forEach((s) => s.classList.add('in-view'));
  }

  // Active nav link: highlight whichever section is most in view.
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
    let targetX = 0, targetY = 0;
    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 18;
      targetY = (e.clientY / window.innerHeight - 0.5) * 18;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          doodles.forEach((d, i) => {
            const depth = 0.4 + (i % 3) * 0.25;
            const base  = baseTransforms.get(d) || '';
            d.style.transform = `${base} translate(${targetX * depth}px, ${targetY * depth}px)`;
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
        [
          { transform: 'rotate(-2deg)' },
          { transform: 'rotate(3deg)' },
          { transform: 'rotate(-2deg)' },
          { transform: 'rotate(0deg)' }
        ],
        { duration: 420, easing: 'ease-in-out' }
      );
    });
  }

})();
