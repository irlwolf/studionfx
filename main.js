// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500); // small delay for smoothness
  }
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // fallback
  revealElements.forEach((el) => el.classList.add("in-view"));
}

// PROJECT SLIDER (auto + controls)
document.querySelectorAll("[data-slider]").forEach((slider) => {
  const slides = slider.querySelectorAll(".project-slide");
  const dotsContainer = slider
    .closest(".project-slider-wrapper")
    .querySelector("[data-dots]");
  const prevBtn = slider
    .closest(".project-slider-wrapper")
    .querySelector("[data-prev]");
  const nextBtn = slider
    .closest(".project-slider-wrapper")
    .querySelector("[data-next]");

  if (!slides.length) return;

  let current = 0;
  let intervalId = null;

  // create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".slider-dot");

  function goToSlide(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function prevSlide() {
    goToSlide(current - 1);
  }

  function startAutoSlide() {
    intervalId = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    if (intervalId) clearInterval(intervalId);
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // button events
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoSlide();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoSlide();
    });
  }

  // pause on hover
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // init
  slides[0].classList.add("active");
  startAutoSlide();
});
