document.addEventListener("DOMContentLoaded", () => {

  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader?.classList.add("hide"), 2600);

  const bgVideo = document.querySelector(".bg-video");
  window.addEventListener("scroll", () => {
    if (bgVideo) {
      if (window.scrollY > 80) bgVideo.classList.add("blur");
      else bgVideo.classList.remove("blur");
    }
  });

  /* ===== PRELOADER ===== */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => preloader.classList.add("hide"), 2600);
  }

  /* ===== BACKGROUND VIDEO BLUR ON SCROLL ===== */
  const bgVideo = document.querySelector(".bg-video");
  window.addEventListener("scroll", () => {
    if (bgVideo) {
      if (window.scrollY > 80) bgVideo.classList.add("blur");
      else bgVideo.classList.remove("blur");
    }
  });
/* ----- Exclusive slider auto ----- */
let slides = document.querySelectorAll(".exclusive-slide");
let current = 0;

function nextSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}
setInterval(nextSlide, 3500);

/* ----- YouTube popup ----- */
const ytPopup = document.getElementById("ytPopup");
const playYT = document.getElementById("playYT");
const ytVideo = document.getElementById("ytVideo");

playYT.addEventListener("click", () => {
  ytPopup.classList.add("active");
  ytVideo.src += "&autoplay=1";
});

ytPopup.addEventListener("click", () => {
  ytPopup.classList.remove("active");
  ytVideo.src = ytVideo.src.replace("&autoplay=1", "");
});

  /* ===== SCROLL REVEAL ===== */
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight * 0.88) el.classList.add("in-view");
    window.addEventListener("scroll", () => {
      const pos = el.getBoundingClientRect().top;
      if (pos < window.innerHeight * 0.88) el.classList.add("in-view");
    });
  });

  /* ===== EXCLUSIVE AUTO SLIDER (HOME ONLY) ===== */
  const exSlides = document.querySelectorAll(".exclusive-slide");
  if (exSlides.length > 0) {
    let exIndex = 0;
    setInterval(() => {
      exSlides[exIndex].classList.remove("active");
      exIndex = (exIndex + 1) % exSlides.length;
      exSlides[exIndex].classList.add("active");
    }, 3500);
  }

  /* ===== CONTACT POPUP ===== */
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popupOverlay");
  const popupClose = document.getElementById("popupClose");
  const fullPage = document.getElementById("fullPage");
  const ding = document.getElementById("popupDing");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      popup.classList.add("active");
      fullPage.classList.add("blur-page");
      ding?.play();

      setTimeout(() => {
        popup.classList.remove("active");
        fullPage.classList.remove("blur-page");
      }, 2200);
    });
  }

  if (popupClose) {
    popupClose.addEventListener("click", () => {
      popup.classList.remove("active");
      fullPage.classList.remove("blur-page");
    });
  }

  /* ===== PROJECTS SLIDER (4:5) ===== */
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const slides = slider.querySelectorAll(".project-slide");
    const wrapper = slider.closest(".project-slider-wrapper");
    const dotsC = wrapper.querySelector("[data-dots]");
    const prevBtn = wrapper.querySelector("[data-prev]");
    const nextBtn = wrapper.querySelector("[data-next]");
    let current = 0;
    let auto;

    slides.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (idx === 0) dot.classList.add("active");
      dot.addEventListener("click", () => { go(idx); reset(); });
      dotsC.appendChild(dot);
    });

    const dots = dotsC.querySelectorAll(".slider-dot");

    function go(i) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }

    function next() { go(current + 1); }
    function prev() { go(current - 1); }

    function start() { auto = setInterval(next, 4000); }
    function stop() { clearInterval(auto); }
    function reset() { stop(); start(); }

    prevBtn?.addEventListener("click", () => { prev(); reset(); });
    nextBtn?.addEventListener("click", () => { next(); reset(); });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);

    slides[0].classList.add("active");
    start();
  }

});
