const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", open);
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

const filters = document.querySelectorAll(".filter");
const groups = document.querySelectorAll(".project-group");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach((f) => {
      f.classList.toggle("is-active", f === button);
      f.setAttribute("aria-pressed", f === button);
    });
    groups.forEach((group) => {
      group.hidden = selected !== "all" && group.dataset.group !== selected;
    });
  });
});

if (matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const light = document.createElement("div");
  light.className = "spotlight";
  document.body.append(light);

  let targetX = 0, targetY = 0, x = 0, y = 0;
  let animating = false;
  let started = false;

  function follow() {
    x += (targetX - x) * 0.14;
    y += (targetY - y) * 0.14;
    light.style.setProperty("--sx", `${x}px`);
    light.style.setProperty("--sy", `${y}px`);
    animating = Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5;
    if (animating) requestAnimationFrame(follow);
  }

  document.addEventListener("pointermove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!started) {
      x = targetX;
      y = targetY;
      started = true;
    }
    light.classList.add("is-on");
    if (!animating) {
      animating = true;
      requestAnimationFrame(follow);
    }

    const card = e.target.closest(".card");
    if (card) {
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - box.left}px`);
      card.style.setProperty("--my", `${e.clientY - box.top}px`);
    }
  });

  document.documentElement.addEventListener("mouseleave", () => light.classList.remove("is-on"));
}
