document.addEventListener("DOMContentLoaded", () => {
  /* ===== CINEMATIC PRELOADER ===== */
  const preloader = document.getElementById("preloader");
  setTimeout(() => { preloader?.classList.add("hide"); }, 2600);

  /* ===== BACKGROUND VIDEO BLUR ON SCROLL ===== */
  const bgVideo = document.querySelector(".bg-video");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) bgVideo?.classList.add("blur");
    else bgVideo?.classList.remove("blur");
  });

  /* ===== SCROLL REVEAL ===== */
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    revealElements.forEach(el => obs.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("in-view"));
  }

  /* ===== EXCLUSIVE AUTO SLIDER (16:9) ===== */
  const exSlides = document.querySelectorAll(".exclusive-slide");
  if (exSlides.length > 0) {
    let exIndex = 0;
    setInterval(() => {
      exSlides[exIndex].classList.remove("active");
      exIndex = (exIndex + 1) % exSlides.length;
      exSlides[exIndex].classList.add("active");
    }, 3500);
  }

  /* ===== CONTACT POPUP + CONFETTI ===== */
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

            ding?.play();
            window.confetti?.({
              particleCount: 180,
              spread: 140,
              origin: { y: 0.7 },
            });

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

  popupClose?.addEventListener("click", () => {
    popup.classList.remove("active");
    fullPage.classList.remove("blur-page");
  });

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
