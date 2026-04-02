// js/nav.js — Hamburger toggle, scroll-spy.
// Scripts loaded with defer — DOM is ready when this runs.

// ── Element references ────────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const siteNav   = document.querySelector('.site-nav');
const navLinks  = document.querySelectorAll('.site-nav__link');

// ── State ─────────────────────────────────────────────────────────────────────
let isOpen = false;

// ── Helper: close mobile nav ──────────────────────────────────────────────────
function closeNav() {
  isOpen = false;
  navToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('site-nav--open');
}

// ── Hamburger toggle (D-01) ───────────────────────────────────────────────────
if (navToggle && siteNav) {
  navToggle.addEventListener('click', function () {
    isOpen = !isOpen;
    // aria-expanded must be a string, not a boolean (D-01)
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    siteNav.classList.toggle('site-nav--open', isOpen);
  });

  // Close nav when any nav link is clicked (D-02)
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
    });
  });

  // Close nav on outside click (D-02)
  // Listener on document — fires after button click because of event bubbling order.
  // Guard: skip if click target is inside nav or on the toggle button itself.
  document.addEventListener('click', function (e) {
    if (!isOpen) return;
    if (siteNav.contains(e.target)) return;
    if (navToggle.contains(e.target)) return;
    closeNav();
  });
}

// ── Scroll-spy (D-03, D-04) ──────────────────────────────────────────────────
// IntersectionObserver with rootMargin that subtracts sticky header height (~64px,
// rounded to 80px) so that a section is considered "active" when it clears the header.
const sections = document.querySelectorAll('section[id]');

if (sections.length > 0) {
  const scrollSpyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const activeLink = document.querySelector('.site-nav__link[href="#' + id + '"]');

        // Remove active class from all links, then add to matching link
        navLinks.forEach(function (link) {
          link.classList.remove('site-nav__link--active');
        });

        if (activeLink) {
          activeLink.classList.add('site-nav__link--active');
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px 0px 0px'
  });

  sections.forEach(function (section) {
    scrollSpyObserver.observe(section);
  });
}
// nav.js does NOT add scroll behavior — CSS scroll-behavior: smooth handles that (D-04).
