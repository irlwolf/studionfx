document.addEventListener("DOMContentLoaded", () => {

  /* PRELOADER */
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader?.classList.add("hide"), 2600);

  /* VIDEO BLUR ON SCROLL */
  const bgVideo = document.querySelector(".bg-video");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) bgVideo?.classList.add("blur");
    else bgVideo?.classList.remove("blur");
  });

  /* EXCLUSIVE SLIDER */
  const exSlides = document.querySelectorAll(".exclusive-slide");
  let exIndex = 0;
  setInterval(() => {
    exSlides[exIndex].classList.remove("active");
    exIndex = (exIndex + 1) % exSlides.length;
    exSlides[exIndex].classList.add("active");
  }, 3500);

  /* PLAY VIDEO ON SAME PAGE */
  const playBtn = document.getElementById("playYT");
  const mainVideo = document.getElementById("exclusiveVideoMain");
  playBtn.addEventListener("click", () => {
    mainVideo.style.display = "block";
    mainVideo.play();
  });

  /* SCROLL REVEAL */
  const revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(el => {
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88)
        el.classList.add("in-view");
    };
    check();
    window.addEventListener("scroll", check);
  });

});
