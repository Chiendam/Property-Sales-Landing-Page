// js/animations.js — Scroll-reveal for cards + stats counter animation.
// Scripts loaded with defer — DOM is ready when this runs.
// Uses existing CSS pattern: [data-animate] (hidden) → .is-visible (revealed).

// ── Scroll-reveal (D-10, D-12, D-13) ─────────────────────────────────────────
// Target elements that should fade in when scrolled into view
const revealTargets = document.querySelectorAll('.service-card, .project-card, .process-step');

// Activate CSS hidden state and set stagger delay by sibling position
revealTargets.forEach(function (el) {
  // Mark element for CSS animation: opacity:0 + translateY(20px)
  el.setAttribute('data-animate', '');

  // Determine sibling index among matching siblings for stagger delay (D-13)
  const siblings = Array.from(el.parentElement.children).filter(function (child) {
    return child.matches('.service-card, .project-card, .process-step');
  });
  const siblingIndex = siblings.indexOf(el);

  // data-delay maps to CSS: [data-delay="1"] = 100ms, [data-delay="2"] = 200ms, [data-delay="3"] = 300ms
  if (siblingIndex > 0) {
    el.setAttribute('data-delay', String(siblingIndex));
  }
});

// One IntersectionObserver for all reveal targets (threshold 0.15 per D-12)
if (revealTargets.length > 0) {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after reveal — animations fire once only (D-12)
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });
}

// ── Stats counter (D-11) ─────────────────────────────────────────────────────
// Animates count from 0 to target using easeOut quadratic curve over 1500ms.
// el.textContent gets restored "+" suffix (e.g. "500+") on each frame.
function animateCount(el, target, duration) {
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // Ease-out quadratic: fast start, slow finish
    const eased = 1 - Math.pow(1 - progress, 2);
    el.textContent = Math.floor(eased * target) + '+';

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// Observe the #services section; trigger all stat counters when it enters viewport.
const servicesSection = document.querySelector('#services');
const statElements    = document.querySelectorAll('.stat-item__value[data-count-target]');

if (servicesSection && statElements.length > 0) {
  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Unobserve immediately — fire once only (Pitfall 5)
        statsObserver.unobserve(entry.target);

        // Animate each stat counter
        statElements.forEach(function (el) {
          const target = parseInt(el.dataset.countTarget, 10);
          animateCount(el, target, 1500);
        });
      }
    });
  }, {
    threshold: 0.3
  });

  statsObserver.observe(servicesSection);
}
