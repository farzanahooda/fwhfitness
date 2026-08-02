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
    quote: "A great experience. Farzana is incredibly motivating and empowering. I felt like I had a great workout as well as emotional support.",
    name: "Zoe Hameer",
  },
  {
    quote: "If you're feeling stuck at a plateau with your weight loss, or just need accountability and encouragement, I'd really recommend giving this a go.",
    name: "Madiha",
  },
  {
    quote: "Every aspect of my health has been addressed. I am healthier, leaner and stronger than I have been in years. My peri-menopausal symptoms have reduced so much.",
    name: "Catherine Wimble",
  },
  {
    quote: "I've learned an immense amount about gut health from her. I've learned to love exercise again and not stress about what my body looks like but how strong it feels.",
    name: "Sabira Patel",
  },
  {
    quote: "My pain levels reduced dramatically, my IBS symptoms improved quickly, and I started losing weight. I dropped a dress size in my 6 week plan.",
    name: "Sidika Hudda",
  },
  {
    quote: "Through my 1-2-1 plan, I have lost weight, gained mobility and strength in both mind and body.",
    name: "Jane Cooney",
  },
  {
    quote: "She tailored a holistic program that went beyond just physical exercise. I am now conscious of everything I eat and wanting to nourish my body from the inside out. No deprivation!",
    name: "Farhana Manekia",
  },
  {
    quote: "She prepares a veritable feast of homemade foods. It made me feel empowered to start making changes at home.",
    name: "Stefanie Read",
  },
  {
    quote: "I loved her holistic approach - it wasn't just about lifting weights, but about understanding nutrition and building a healthy mindset one small habit at a time.",
    name: "Arwa",
  },
  {
    quote: "I've become stronger, fitter and much more nutritionally savvy! With online support outside of the session, it helps so much with keeping me on track.",
    name: "Maria Clarke",
  },
];

const grid = document.getElementById("testimonialGrid");
if (grid) {
  grid.innerHTML = testimonials
    .map(
      (t) => `
      <div class="testimonial-card">
        <span class="quote-mark">&ldquo;</span>
        <p>${t.quote}</p>
        <span class="name">${t.name}</span>
      </div>`
    )
    .join("");
}
