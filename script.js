/* ═══════════════════════════════════════════════
   GS-Growth Steps | script.js
═══════════════════════════════════════════════ */

/* ── LOADING SCREEN ── */
(function () {
  const loader = document.getElementById('gs-loader');
  if (!loader) return;

  // Minimum display time so the animation always plays fully (ms)
  const MIN_DISPLAY = 1800;
  const start = Date.now();

  function hideLoader() {
    const elapsed = Date.now() - start;
    const delay   = Math.max(0, MIN_DISPLAY - elapsed);
    setTimeout(function () {
      loader.classList.add('gs-loader--hidden');
      // Remove from DOM after transition ends so it never blocks interaction
      loader.addEventListener('transitionend', function () {
        loader.remove();
      }, { once: true });
    }, delay);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
})();

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
/* ── EMAILJS CONTACT FORM ── */

// Make sure emailjs CDN is loaded in HTML
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

/* ── EMAILJS CONTACT FORM ── */

(function () {

  emailjs.init("mCuzsR0T2pAiUHHyP");

  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    emailjs.send(
      "service_kegm0bo",
      "template_4j439oo",
      templateParams
    )
    .then(function () {

      alert("Message sent successfully!");

      contactForm.reset();

      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";

    })
    .catch(function (error) {

      console.error(error);

      alert("Failed to send message.");

      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";

    });

  });

})();
