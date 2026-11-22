(function () {
  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Projects page: filter groups
  var filters = document.querySelectorAll(".filter");
  var groups = document.querySelectorAll(".project-group");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      groups.forEach(function (g) {
        g.hidden = !(f === "all" || g.getAttribute("data-group") === f);
      });
    });
  });
})();

// Gentle flashlight effect: only for a real mouse and when motion is welcome
(function () {
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || calm) return;

  var light = document.createElement("div");
  light.className = "spotlight";
  light.setAttribute("aria-hidden", "true");
  document.body.appendChild(light);

  var root = document.documentElement;
  var tx = 0, ty = 0, cx = 0, cy = 0, running = false, seen = false;

  function tick() {
    // ease toward the pointer so the light trails it softly
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    root.style.setProperty("--sx", cx.toFixed(1) + "px");
    root.style.setProperty("--sy", cy.toFixed(1) + "px");
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
      requestAnimationFrame(tick);
    } else {
      running = false;
    }
  }

  document.addEventListener("pointermove", function (e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    tx = e.clientX; ty = e.clientY;
    if (!seen) { cx = tx; cy = ty; seen = true; }
    light.classList.add("is-on");
    if (!running) { running = true; requestAnimationFrame(tick); }

    var card = e.target.closest && e.target.closest(".card");
    if (card) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }
  }, { passive: true });

  document.addEventListener("pointerleave", function () { light.classList.remove("is-on"); });
  document.documentElement.addEventListener("mouseleave", function () { light.classList.remove("is-on"); });
})();
