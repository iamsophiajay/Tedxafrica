/* =========================================================
   SHARED COMPONENTS — NAV & FOOTER
   ========================================================= */

(function () {

  /* ─── NAVIGATION ─────────────────────────────────────────── */
  const navHTML = `
<nav id="nav">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo">
      <img src="img/logo/logo-nav-wordmark.png" alt="Project TEDxAfrica" class="nav__logo-img">
    </a>
    <div class="nav__links">
      <a href="about.html" class="nav__link">About</a>
      <a href="speakers.html" class="nav__link">Speakers</a>
      <a href="experience.html" class="nav__link">Experience</a>
      <a href="coaches.html" class="nav__link">Faculty of Coaches</a>
      <a href="team.html" class="nav__link">Team</a>
      <span class="nav__link nav__link--disabled" aria-disabled="true">Media</span>
      <a href="contact.html" class="nav__link">Contact</a>
    </div>
    <a href="contact.html#apply" class="nav__cta">Apply to Speak</a>
    <button class="nav__hamburger" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav__mobile">
  <a href="index.html" class="nav__link">Home</a>
  <a href="about.html" class="nav__link">About</a>
  <a href="speakers.html" class="nav__link">Speakers</a>
  <a href="experience.html" class="nav__link">Experience</a>
  <a href="coaches.html" class="nav__link">Faculty of Coaches</a>
  <span class="nav__link nav__link--disabled" aria-disabled="true">Ambassadors</span>
  <span class="nav__link nav__link--disabled" aria-disabled="true">Media</span>
  <a href="contact.html" class="nav__link">Contact</a>
  <a href="contact.html#apply" class="btn btn--primary" style="margin-top:8px;">Apply to Speak</a>
</div>
`;

  /* ─── FOOTER ─────────────────────────────────────────────── */
  const footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div>
        <img src="img/logo/logo-nav-wordmark.png" alt="Project TEDxAfrica logo" class="footer__logo-img">
        <div class="footer__brand-mark">Project TEDxAfrica</div>
        <div class="footer__brand-sub">Project TEDxAfrica</div>
        <p class="footer__tagline">Positioning global voices for continental impact.</p>
      </div>
      <div>
        <div class="footer__col-title">Platform</div>
        <nav class="footer__links">
          <a href="about.html" class="footer__link">About the Platform</a>
          <a href="speakers.html" class="footer__link">Speaker Experience</a>
          <a href="experience.html" class="footer__link">The Journey</a>
          <a href="coaches.html" class="footer__link">Faculty of Coaches</a>
        </nav>
      </div>
      <div>
        <div class="footer__col-title">Get Involved</div>
        <nav class="footer__links">
          <a href="contact.html#apply" class="footer__link">Apply to Speak</a>
          <a href="contact.html#partner" class="footer__link">Partner With Us</a>
          <a href="contact.html#attend" class="footer__link">Attend the Event</a>
          <a href="contact.html#volunteer" class="footer__link">Volunteer</a>
        </nav>
      </div>
      <div>
        <div class="footer__col-title">Contact</div>
        <div class="footer__contact-item">
          <strong>General</strong>
          info@projecttedxafrica.com
        </div>
        <div class="footer__contact-item">
          <strong>Speakers</strong>
          speakers@projecttedxafrica.com
        </div>
        <div class="footer__contact-item">
          <strong>Partnerships</strong>
          partnerships@projecttedxafrica.com
        </div>
        <div class="footer__contact-item">
          <strong>Media</strong>
          media@projecttedxafrica.com
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span class="footer__copy">&copy; 2026 Project TEDxAfrica. All rights reserved. TEDx is an independently organized event.</span>
      <div class="footer__legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
`;

  /* ─── INJECT ──────────────────────────────────────────────── */
  const navTarget = document.getElementById('nav-placeholder');
  const footerTarget = document.getElementById('footer-placeholder');

  if (navTarget) navTarget.outerHTML = navHTML;
  if (footerTarget) footerTarget.outerHTML = footerHTML;

})();
