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
      <a href="legacy-talks.html" class="nav__link">Legacy Talks</a>
      <a href="ambassadors.html" class="nav__link">Global Ambassadors</a>
      <a href="team.html" class="nav__link">Team</a>
      <a href="blog.html" class="nav__link">Blog</a>
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
  <a href="legacy-talks.html" class="nav__link">Legacy Talks</a>
  <a href="ambassadors.html" class="nav__link">Global Ambassadors</a>
  <a href="team.html" class="nav__link">Team</a>
  <a href="blog.html" class="nav__link">Blog</a>
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
          <a href="legacy-talks.html" class="footer__link">Legacy Talks</a>
          <a href="ambassadors.html" class="footer__link">Global Ambassadors</a>
          <a href="blog.html" class="footer__link">Blog</a>
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

  /* ─── AUTO-COLORIZE "TEDxAfrica" WHEREVER IT APPEARS ────────
     Splits any occurrence of TEDxAfrica (in any casing) so the
     "TEDx" part renders in brand red and "Africa" stays the
     surrounding text color — matching the logo styling — without
     needing to manually wrap every heading/title across the site. */
  function colorizeBrandName() {
    const regex = /(TEDx|Tedx)(Africa|africa)/g;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !regex.test(node.nodeValue)) return NodeFilter.FILTER_SKIP;
        regex.lastIndex = 0;
        const parent = node.parentNode;
        if (!parent) return NodeFilter.FILTER_SKIP;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TITLE') return NodeFilter.FILTER_SKIP;
        if (parent.closest && parent.closest('.tedx-brand')) return NodeFilter.FILTER_SKIP;
        // Skip red-background contexts (buttons, CTAs, featured pricing header) —
        // red text on red background would be unreadable.
        if (parent.closest && parent.closest('.btn--primary, .nav__cta, .tier-card--featured .tier-header')) {
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(node => {
      const text = node.nodeValue;
      const frag = document.createDocumentFragment();
      let lastIndex = 0;
      let match;
      regex.lastIndex = 0;
      while ((match = regex.exec(text))) {
        if (match.index > lastIndex) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        const wrap = document.createElement('span');
        wrap.className = 'tedx-brand';
        const redPart = document.createElement('span');
        redPart.style.color = 'var(--red)';
        redPart.textContent = match[1];
        wrap.appendChild(redPart);
        wrap.appendChild(document.createTextNode(match[2]));
        frag.appendChild(wrap);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      node.parentNode.replaceChild(frag, node);
    });
  }
  colorizeBrandName();

  /* ─── WHATSAPP FLOATING BUTTON ──────────────────────────── */
  const whatsappHTML = `
<a href="https://chat.whatsapp.com/JROyfnqgL8RB6wfFu1B1yo?mode=gi_t"
   target="_blank" rel="noopener"
   class="whatsapp-float">
  <svg viewBox="0 0 32 32" class="whatsapp-float__icon" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.699 4.61 1.902 6.482L4 29l7.72-1.868A11.93 11.93 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.818a9.77 9.77 0 0 1-4.98-1.362l-.357-.213-4.583 1.109 1.127-4.47-.233-.367A9.78 9.78 0 0 1 6.182 15c0-5.412 4.407-9.818 9.819-9.818S25.818 9.588 25.818 15 21.413 24.818 16.001 24.818zm5.383-7.34c-.294-.148-1.741-.859-2.011-.957-.27-.098-.467-.148-.663.148-.196.294-.762.957-.934 1.153-.172.196-.343.221-.637.074-.294-.148-1.241-.457-2.364-1.459-.874-.78-1.464-1.744-1.636-2.038-.172-.294-.018-.453.13-.6.134-.133.294-.343.441-.515.147-.172.196-.294.294-.49.098-.196.049-.368-.025-.515-.074-.148-.663-1.598-.908-2.188-.239-.574-.483-.497-.663-.506l-.564-.01c-.196 0-.515.074-.784.368-.27.294-1.03 1.007-1.03 2.456s1.054 2.848 1.201 3.044c.147.196 2.075 3.168 5.028 4.442.703.303 1.251.484 1.679.62.706.225 1.348.193 1.856.117.566-.084 1.741-.712 1.987-1.4.245-.688.245-1.278.172-1.4-.074-.123-.27-.196-.564-.344z"/>
  </svg>
  <span class="whatsapp-float__text">Join the Official WhatsApp Community</span>
</a>
`;
  document.body.insertAdjacentHTML('beforeend', whatsappHTML);

})();