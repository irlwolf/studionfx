// 🔥 CINEMATIC PRELOADER
window.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 2600); // matches the 2.6s cinematic animation
  }
});

// 🔥 Scroll Reveal (optional)
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  revealElements.forEach((el) => observer.observe(el));
}

// 🔥 Contact Page — Popup + Sound + Confetti
const form = document.getElementById("contactForm");
const popup = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");
const fullPage = document.getElementById("fullPage");
const ding = document.getElementById("popupDing");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    fetch(form.action, { method: "POST", body: data })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          popup.classList.add("active");
          fullPage.classList.add("blur-page");
          form.reset();

          if (ding) ding.play();
          if (window.confetti) confetti({ particleCount: 180, spread: 140, origin: { y: 0.7 } });

          setTimeout(() => {
            popup.classList.remove("active");
            fullPage.classList.remove("blur-page");
          }, 2300);
        }
      });
  });
}

if (popupClose) {
  popupClose.addEventListener("click", () => {
    popup.classList.remove("active");
    fullPage.classList.remove("blur-page");
  });
}
