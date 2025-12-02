// 🔥 GLOBAL PRELOADER (works on all pages)
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 300); // delay for smooth feel
  }
});

// 🔥 SCROLL REVEAL (keeps animation on all pages if used)
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

// 🔥 CONTACT FORM POPUP + CONFETTI (only runs if the form exists)
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
