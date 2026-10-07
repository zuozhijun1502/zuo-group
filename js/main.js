const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-visible");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

if (window.lucide) {
  window.lucide.createIcons();
}

const siteFooter = document.querySelector(".site-footer");

if (siteFooter && !document.querySelector(".site-visits")) {
  const visits = document.createElement("section");
  visits.className = "site-visits";
  visits.setAttribute("aria-labelledby", "site-visits-title");
  visits.innerHTML = `
    <h2 id="site-visits-title">Site Visits</h2>
    <dl class="site-visits-metrics">
      <div><dt>Total Views</dt><dd id="busuanzi_value_site_pv" aria-live="polite">--</dd></div>
      <div><dt>Visitors</dt><dd id="busuanzi_value_site_uv" aria-live="polite">--</dd></div>
    </dl>
    <a class="site-visits-source" href="https://busuanzi.ibruce.info/" target="_blank" rel="noreferrer">Busuanzi</a>
  `;
  // Keep statistics outside the footer, which the CMS replaces asynchronously.
  siteFooter.insertAdjacentElement("afterend", visits);

  const values = visits.querySelectorAll("dd");
  const showUnavailable = () => {
    values.forEach((value) => {
      if (value.textContent.trim() === "--") value.textContent = "Unavailable";
    });
  };

  // Local previews must not register visits against a shared localhost counter.
  const hostname = window.location.hostname;
  if (window.location.protocol === "https:" && hostname !== "localhost" && hostname !== "127.0.0.1" && hostname !== "[::1]") {
    const counterScript = document.createElement("script");
    counterScript.async = true;
    counterScript.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
    counterScript.addEventListener("error", showUnavailable);
    document.head.append(counterScript);
    window.setTimeout(showUnavailable, 12000);
  }
}
