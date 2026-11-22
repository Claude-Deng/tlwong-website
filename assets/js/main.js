/* TL Wong & Co. — interaction layer */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* current year */
  $$("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* sticky header shadow */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* mobile navigation */
  const toggle = $(".menu-toggle");
  const mobileNav = $("#mobile-nav");
  const closeMenu = () => {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  };

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.classList.toggle("is-open", !open);
    });
    $$("a", mobileNav).forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  /* active nav state */
  const page = document.body.dataset.page;
  if (page) {
    $$("[data-nav]").forEach((link) => {
      if (link.dataset.nav === page) link.setAttribute("aria-current", "page");
    });
  }

  /* scroll reveal */
  const revealEls = $$(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* testimonial carousel */
  const quotes = $$("[data-quote]");
  if (quotes.length > 1) {
    let index = 0;
    const counter = $("[data-quote-index]");
    const total = $("[data-quote-total]");
    if (total) total.textContent = String(quotes.length).padStart(2, "0");

    const show = (next) => {
      index = (next + quotes.length) % quotes.length;
      quotes.forEach((quote, i) => {
        quote.hidden = i !== index;
        quote.classList.remove("is-entering");
      });
      const active = quotes[index];
      void active.offsetWidth;
      active.classList.add("is-entering");
      if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    };

    $$("[data-quote-prev]").forEach((btn) =>
      btn.addEventListener("click", () => show(index - 1))
    );
    $$("[data-quote-next]").forEach((btn) =>
      btn.addEventListener("click", () => show(index + 1))
    );

    const voices = $(".voices");
    if (voices) {
      voices.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
      });
    }
  }

  /* contact form → opens the visitor's email app */
  const form = $("#enquiry-form");
  if (form) {
    const status = $("#form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const get = (key) => String(data.get(key) || "").trim();
      const subject = `Website enquiry — ${get("service") || "General enquiry"}`;
      const body = [
        `Name: ${get("name")}`,
        `Company: ${get("company") || "—"}`,
        `Email: ${get("email")}`,
        `Phone: ${get("phone") || "—"}`,
        `Service: ${get("service") || "—"}`,
        "",
        get("message"),
      ].join("\n");

      if (status) status.textContent = "Opening your email app…";
      window.location.href = `mailto:dr.tlwong@outlook.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    });
  }
})();
