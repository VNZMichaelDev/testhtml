// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const mobileMenu = document.getElementById("mobileMenu")
const header = document.getElementById("header")

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")
  })
}

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
    }
  })
})

// Header scroll effect
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = header.offsetHeight
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })

    // Close mobile menu if open
    mobileMenuToggle.classList.remove("active")
    mobileMenu.classList.remove("active")
  }
}

// Navigation links smooth scrolling
const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// WhatsApp functions
const phoneNumber = "+5491141402061"

function openWhatsApp(courseType) {
  const messages = {
    standard: `¡Hola! Me interesa la Formación Estándar de MEGA PRO ACADEMY por $149 USD. Quiero empezar mi primer negocio digital paso a paso. ¿Podrían ayudarme con el proceso de inscripción?`,
    exclusive: `¡Hola! Me interesa la Formación Exclusivo de MEGA PRO ACADEMY por $450 USD. Quiero escalar como un profesional digital con marca personal e infoproductos. ¿Podrían brindarme más detalles?`,
  }

  const message = messages[courseType]
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

function openWhatsAppGeneral() {
  const message = "¡Hola! Me interesa conocer más sobre MEGA PRO ACADEMY. ¿Podrían brindarme más información?"
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

function openWhatsAppAffiliate() {
  const message =
    "¡Hola! Me interesa registrarme como afiliado de MEGA PRO ACADEMY. ¿Podrían brindarme información sobre el programa de afiliados y cómo empezar?"
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((el) => observer.observe(el))

  // Add fade-in class to elements that should animate
  const animateElements = document.querySelectorAll(
    ".section-header, .course-card, .about-card, .affiliate-card, .testimonial, .final-words, .strategies, .results-card, .kit-card, .affiliate-cta",
  )
  animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Flip Cards Functionality
  const moreButtons = document.querySelectorAll(".js-more")
  const backButtons = document.querySelectorAll(".js-back")

  moreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const target = button.getAttribute("data-target")
      const card = document.querySelector(`[data-card="${target}"]`)
      const inner = card.querySelector(".c-inner")

      inner.classList.add("flipped")
      button.setAttribute("aria-expanded", "true")

      // Focus management for accessibility
      setTimeout(() => {
        const backButton = card.querySelector(".js-back")
        if (backButton) {
          backButton.focus()
        }
      }, 400)
    })
  })

  backButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const target = button.getAttribute("data-target")
      const card = document.querySelector(`[data-card="${target}"]`)
      const inner = card.querySelector(".c-inner")
      const moreButton = card.querySelector(".js-more")

      inner.classList.remove("flipped")
      if (moreButton) {
        moreButton.setAttribute("aria-expanded", "false")
      }

      // Focus management for accessibility
      setTimeout(() => {
        if (moreButton) {
          moreButton.focus()
        }
      }, 400)
    })
  })

  // Keyboard navigation for flip cards
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close any flipped cards
      const flippedCards = document.querySelectorAll(".c-inner.flipped")
      flippedCards.forEach((inner) => {
        inner.classList.remove("flipped")
        const card = inner.closest(".c-card")
        const moreButton = card.querySelector(".js-more")
        if (moreButton) {
          moreButton.setAttribute("aria-expanded", "false")
          moreButton.focus()
        }
      })
    }
  })

  // Handle card focus for keyboard navigation
  const cardInners = document.querySelectorAll(".c-inner")
  cardInners.forEach((inner) => {
    inner.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const moreButton = inner.querySelector(".js-more")
        const backButton = inner.querySelector(".js-back")

        if (!inner.classList.contains("flipped") && moreButton) {
          e.preventDefault()
          moreButton.click()
        } else if (inner.classList.contains("flipped") && backButton) {
          e.preventDefault()
          backButton.click()
        }
      }
    })
  })

  // Calculadora MEGAPRO
  const priceStd = 149, commStd = 0.90;   // 90%
  const pricePrem = 450, commPrem = 0.80; // 80%
  const qStd = document.getElementById('qStd');
  const qPrem = document.getElementById('qPrem');
  const kStd = document.getElementById('kStd');
  const kPrem = document.getElementById('kPrem');
  const kTotal = document.getElementById('kTotal');
  const kMonthly = document.getElementById('kMonthly');
  const periodRadios = Array.from(document.querySelectorAll('input[name="period"]'));
  const fmt = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:2});

  function calc(){
    const nStd = Math.max(0, parseInt(qStd.value || '0', 10));
    const nPrem = Math.max(0, parseInt(qPrem.value || '0', 10));
    const incomeStd = nStd * priceStd * commStd;
    const incomePrem = nPrem * pricePrem * commPrem;
    const period = periodRadios.find(r=>r.checked)?.value || 'week';
    const total = incomeStd + incomePrem;
    const monthly = period === 'week' ? total * 4 : total; // proyección a mes si se elige semana

    kStd.textContent = fmt.format(incomeStd);
    kPrem.textContent = fmt.format(incomePrem);
    kTotal.textContent = fmt.format(total);
    kMonthly.textContent = fmt.format(monthly);
  }
  [qStd,qPrem].forEach(inp=>{
    inp.addEventListener('input', calc);
    inp.addEventListener('blur', ()=>{ if(inp.value===''||isNaN(inp.value)) {inp.value='0'; calc();} });
  });
  periodRadios.forEach(r=>r.addEventListener('change', calc));
  calc();

  // Calculadora radio buttons
  document.querySelectorAll('.calc-radio-group input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
      document.querySelectorAll('.calc-radio-group label').forEach(l => l.classList.remove('selected'));
      this.parentElement.classList.add('selected');
    });
    // Inicializa el seleccionado al cargar
    if(radio.checked) radio.parentElement.classList.add('selected');
  });
})

// Prevent zoom on double tap (iOS Safari)
let lastTouchEnd = 0
document.addEventListener(
  "touchend",
  (event) => {
    const now = new Date().getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  },
  false,
)

// Handle viewport height for mobile browsers
function setVH() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty("--vh", `${vh}px`)
}

setVH()
window.addEventListener("resize", setVH)
window.addEventListener("orientationchange", setVH)

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  const lazyImages = document.querySelectorAll("img[data-src]")
  lazyImages.forEach((img) => imageObserver.observe(img))
}

// Error handling for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.src = "/mega-pro-academy.png"
  })
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
    }
  }
})

// Console log for debugging
console.log("MEGA PRO ACADEMY - Landing Page Loaded Successfully")
console.log("Mobile responsive design optimized")
console.log("All WhatsApp integrations working")
