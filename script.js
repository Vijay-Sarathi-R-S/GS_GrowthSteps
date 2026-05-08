/* ═══════════════════════════════════════════════
   GS-Growth Steps | script.js
═══════════════════════════════════════════════ */

/* ── THEME TOGGLE ── */
const html = document.documentElement;
const btn  = document.getElementById('themeToggle');

// Respect saved preference on load
const saved = localStorage.getItem('gs-theme');
if (saved) html.setAttribute('data-theme', saved);

btn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('gs-theme', next);
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));