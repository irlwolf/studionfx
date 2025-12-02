// 🔥 GLOBAL PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) setTimeout(() => preloader.classList.add("hide"), 300);
});

// 🔥 SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach((el) => observer.observe(el));
}

// 🔥 CONTACT POPUP + CONFETTI + SOUND
const form = document.getElementById("contactForm");
const popup = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");
const fullPage = document.getElementById("fullPage");
const ding = document.getElementById("popupDing");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
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
      })
      .catch(() => alert("Network error — try later"));
  });
}

if (popupClose) {
  popupClose.addEventListener("click", () => {
    popup.classList.remove("active");
    fullPage.classList.remove("blur-page");
  });
}

// 🔥 PROJECT PAGE AUTO SLIDER
const slider = document.querySelector("[data-slider]");
if (slider) {
  const slides = slider.querySelectorAll(".project-slide");
  const dotsContainer = slider.closest(".project-slider-wrapper").querySelector("[data-dots]");
  const prevBtn = slider.closest(".project-slider-wrapper").querySelector("[data-prev]");
  const nextBtn = slider.closest(".project-slider-wrapper").querySelector("[data-next]");
  let current = 0;
  let interval;

  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".slider-dot");

  const goToSlide = (i) => {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  };

  const next = () => goToSlide(current + 1);
  const prev = () => goToSlide(current - 1);

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  const startAuto = () => (interval = setInterval(next, 4000));
  const stopAuto = () => clearInterval(interval);

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  slides[0].classList.add("active");
  startAuto();
}
