setTimeout(() => {
  document.getElementById("preloader")?.classList.add("hide");
}, 3000);


/* ================= EXCLUSIVE AUTO SLIDER ================= */
const slides = document.querySelectorAll(".exclusive-slide");
if (slides.length > 0) {
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 3500);
}

/* ================= PLAY VIDEO ON SAME PAGE ================= */
const playYT = document.getElementById("playYT");
const mainVideo = document.getElementById("exclusiveVideoMain");
if (playYT && mainVideo) {
  playYT.addEventListener("click", () => {
    mainVideo.style.display = "block";
    mainVideo.play();
    mainVideo.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* ================= PRELOADER ================= */
window.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 2000);
  }
});

/* PRELOADER FAIL-SAFE */
window.addEventListener("error", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.classList.add("hide");
});

/* Hero shine once on load */
document.getElementById("hero-img")?.classList.add("shine-once");
setTimeout(() => {
  document.getElementById("hero-img")?.classList.remove("shine-once");
}, 2000);

/* ================= BACKGROUND VIDEO BLUR ON SCROLL ================= */
const bgVideo = document.querySelector(".bg-video");
if (bgVideo) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) bgVideo.classList.add("blur");
    else bgVideo.classList.remove("blur");
  });
}

/* ================= SCROLL REVEAL ================= */
const revealElements = document.querySelectorAll(".reveal");
if (revealElements.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("in-view"));
}

/* ================= CONTACT POPUP CONFIRMATION ================= */
const form = document.getElementById("contactForm");
const popup = document.getElementById("popupOverlay");
const fullPage = document.getElementById("fullPage");
const ding = document.getElementById("popupDing");

if (form && popup) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    popup.classList.add("active");
    fullPage?.classList.add("blur-page");
    form.reset();
    if (ding) ding.play();
    setTimeout(() => {
      popup.classList.remove("active");
      fullPage?.classList.remove("blur-page");
    }, 2200);
  });
}

/* ================= PROJECTS AUTO SLIDER ================= */
const slider = document.querySelector("[data-slider]");
if (slider) {
  const slidesP = slider.querySelectorAll(".project-slide");
  const wrapper = slider.closest(".project-slider-wrapper");
  const dotsContainer = wrapper.querySelector("[data-dots]");
  const prevBtn = wrapper.querySelector("[data-prev]");
  const nextBtn = wrapper.querySelector("[data-next]");
  let currentP = 0;
  let intervalId;

  slidesP.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i);
      restartAuto();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".slider-dot");

  function goToSlide(i) {
    slidesP[currentP].classList.remove("active");
    dots[currentP].classList.remove("active");
    currentP = (i + slidesP.length) % slidesP.length;
    slidesP[currentP].classList.add("active");
    dots[currentP].classList.add("active");
  }

  function next() { goToSlide(currentP + 1); }
  function prev() { goToSlide(currentP - 1); }

  function startAuto() { intervalId = setInterval(next, 4000); }
  function stopAuto() { clearInterval(intervalId); }
  function restartAuto() { stopAuto(); startAuto(); }

  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restartAuto(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restartAuto(); });

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  slidesP[0].classList.add("active");
  startAuto();
}
