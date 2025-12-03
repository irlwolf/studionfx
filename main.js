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

// 🔥 CINEMATIC PRELOADER
window.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 2600); // match CSS animation duration
  }
});
// Background video blur on scroll
const bgVideo = document.querySelector('.bg-video');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    bgVideo.classList.add('blur');
  } else {
    bgVideo.classList.remove('blur');
  }
});

// 🔥 SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealElements.length) {
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

// 🔥 CONTACT POPUP + CONFETTI + DING
const form = document.getElementById("contactForm");
const popup = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");
const fullPage = document.getElementById("fullPage");
const ding = document.getElementById("popupDing");

if (form) {
  form.addEventListener("submit", e => {
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
          if (window.confetti) {
            confetti({
              particleCount: 180,
              spread: 140,
              origin: { y: 0.7 }
            });
          }

          setTimeout(() => {
            popup.classList.remove("active");
            fullPage.classList.remove("blur-page");
          }, 2300);
        } else {
          alert("Something went wrong, please try again.");
        }
      })
      .catch(() => alert("Network error — please try again later."));
  });
}

if (popupClose) {
  popupClose.addEventListener("click", () => {
    popup.classList.remove("active");
    fullPage.classList.remove("blur-page");
  });
}

// 🔥 PROJECTS AUTO SLIDER (4:5)
const slider = document.querySelector("[data-slider]");
if (slider) {
  const slides = slider.querySelectorAll(".project-slide");
  const wrapper = slider.closest(".project-slider-wrapper");
  const dotsContainer = wrapper.querySelector("[data-dots]");
  const prevBtn = wrapper.querySelector("[data-prev]");
  const nextBtn = wrapper.querySelector("[data-next]");
  let current = 0;
  let intervalId;

  // create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAuto();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".slider-dot");

  function goToSlide(i) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function next() { goToSlide(current + 1); }
  function prev() { goToSlide(current - 1); }

  function startAuto() {
    intervalId = setInterval(next, 4000);
  }

  function stopAuto() {
    if (intervalId) clearInterval(intervalId);
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restartAuto(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restartAuto(); });

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  slides[0].classList.add("active");
  startAuto();
}
