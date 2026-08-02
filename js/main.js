// Header scroll state
const header = document.getElementById("siteHeader");
const applyScrollState = () => {
  if (window.scrollY > 40) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
};
let scrollTicking = false;
const onScroll = () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      applyScrollState();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
};
window.addEventListener("scroll", onScroll, { passive: true });

// Hero slideshow
const heroSlideshow = document.getElementById("heroSlideshow");
if (heroSlideshow) {
  const slides = Array.from(heroSlideshow.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dot"));
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  let current = 0;
  let autoTimer = null;

  const goTo = (index) => {
    slides[current].classList.remove("is-active");
    dots[current] && dots[current].classList.remove("is-active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current] && dots[current].classList.add("is-active");
  };

  const startAuto = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  };

  prevBtn && prevBtn.addEventListener("click", () => { goTo(current - 1); startAuto(); });
  nextBtn && nextBtn.addEventListener("click", () => { goTo(current + 1); startAuto(); });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { goTo(i); startAuto(); });
  });

  startAuto();
}
applyScrollState();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Testimonials - edit this list to add, remove or swap out reviews.
const testimonials = [
  {
    quote: "Farzana is more than just an amazing, inspirational trainer - she's been my nutritionist, life coach, therapist and cheerleader. The best investment ever.",
    name: "Liz Burchett",
    slug: "liz-burchett",
  },
  {
    quote: "Her ability to make you feel super welcome is second to none, as is her knowledge and insight with both exercise and nutrition. She genuinely cares about her clients and it shows.",
    name: "Stephanie Downes",
    slug: "stephanie-downes",
  },
  {
    quote: "Farzana's workshop exceeded all of my expectations - the wealth of knowledge and the beautiful, intentional group setting made it such an enjoyable experience.",
    name: "Nicola",
    slug: "nicola",
  },
  {
    quote: "Farzana is gentle and encouraging whilst understanding you as an individual. Her extensive knowledge of nutrition has resulted in my diabetes levels reducing significantly.",
    name: "Joy Godbold",
    slug: "joy-godbold",
  },
  {
    quote: "Farzana is not just a fitness instructor - she's a true physical, mental and spiritual coach. Meeting and working with her was one of the best decisions I've ever made.",
    name: "Maryam Mohseini",
    slug: "maryam-mohseini",
  },
  {
    quote: "A passionate, compassionate trainer who understands the real life struggles you face, plus a community of supportive females. Laughter, friendship and warmth - a stellar combination.",
    name: "Sajida Jaffer",
    slug: "sajida-jaffer",
  },
  {
    quote: "Farzana is a superb coach who offers so much support. She really pushes you in training to get the best out of you, and her sessions are always fun!",
    name: "Abi Needham",
    slug: "abi-needham",
  },
  {
    quote: "A constant font of knowledge on all things health, wellbeing and nutrition - the kindest, most nurturing and genuine person one could ever wish to meet.",
    name: "Rebecca Payne-Shelley",
    slug: "rebecca-payne-shelley",
  },
  {
    quote: "Simply delightful in every way. The food was delicious, the energy was warm and welcoming, and I've left with an abundance of knowledge for my diet and lifestyle.",
    name: "Lisa Maniatis",
    slug: "lisa-maniatis",
  },
  {
    quote: "If you're looking for a trainer who truly cares about your well-being and provides comprehensive, compassionate guidance, and a programme that truly works, this is the one. Thank you Farzana for everything you've done so far and continue to do for me, you're a star",
    name: "Farhana Manekia",
    slug: "farhana-manekia",
  },
  {
    quote: "Amazing personal and thoughtful coaching by our excellent Farzana, who does this with great passion. We are so lucky to have you.",
    name: "Fatim Jaffer",
    slug: "fatim-jaffer",
  },
  {
    quote: "I contacted Farzana - she has changed everything. Every aspect of my health has been addressed through nutrition, exercise and mental wellbeing. I am healthier, leaner and stronger than I have been in years.",
    name: "Catherine Wimble",
    slug: "catherine-wimble",
  },
];

const grid = document.getElementById("testimonialGrid");
if (grid) {
  grid.innerHTML = testimonials
    .map(
      (t) => `
      <div class="testimonial-card">
        <span class="quote-mark">&ldquo;</span>
        <p>${t.quote}&hellip;</p>
        <span class="name">${t.name}</span>
        <a href="success-stories.html#${t.slug}" class="testimonial-link">Find Out More</a>
      </div>`
    )
    .join("");
}

// Correct anchor-link scrolling into multi-column layouts (e.g. success-stories.html),
// where the browser's native fragment scroll can land on the wrong element.
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    const fixScroll = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "instant", block: "start" });
        });
      });
    };
    if (document.readyState === "complete") {
      fixScroll();
    } else {
      window.addEventListener("load", fixScroll);
    }
  }
}
