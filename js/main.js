// DOM elements
const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const parallaxElement = document.querySelector("#hero .parallax-bg");
const navLinks = document.querySelectorAll(".nav-menu a");
const testimonialDots = document.querySelectorAll(".nav-dot");
const form = document.querySelector(".contact-form");
const sections = document.querySelectorAll("section");
const animatedElements = document.querySelectorAll(
  ".about-content, .value-card, .service-card, .process-step, .gallery-item, .goal-card, .audience-card",
);
const heroSection = document.querySelector("#hero");

// Track language switcher state
let languageSwitcherMounted = false;

// Detect Telegram WebApp or other in-app browsers
const isTelegramWebview =
  navigator.userAgent.includes("Telegram") ||
  window.Telegram ||
  window.TelegramWebviewProxy;

// Sticky header on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Parallax effect only for hero section
  if (parallaxElement) {
    const speed = 0.5;
    parallaxElement.style.transform = `translateY(${window.scrollY * speed}px)`;
  }

  // Highlight active nav item based on scroll position
  highlightActiveNavItem();

  // Check for elements to animate on scroll
  animateOnScroll();
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");

  // Animate hamburger to X
  const spans = menuToggle.querySelectorAll("span");
  if (menuToggle.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";

    // Re-apply translations when menu is opened
    if (
      typeof updateNavigation === "function" &&
      typeof currentLanguage === "string"
    ) {
      // Get current language data
      let langData;
      switch (currentLanguage) {
        case "ru":
          langData = languageRu?.nav;
          break;
        case "ro":
          langData = languageRo?.nav;
          break;
        case "en":
          langData = languageEn?.nav;
          break;
        default:
          langData = languageRu?.nav;
      }

      // Update navigation if language data is available
      if (langData) {
        setTimeout(() => updateNavigation(langData), 50);
      }

      // Move language switcher into mobile menu if needed
      setTimeout(positionLanguageSwitcher, 100);
    }
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");

    const spans = menuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Position language switcher based on screen size
function positionLanguageSwitcher() {
  const isMobile = window.innerWidth <= 768;
  const langSwitcher = document.querySelector(".language-switcher");
  const navMenu = document.querySelector(".nav-menu");
  const navContainer = document.querySelector("nav .container");

  if (langSwitcher) {
    languageSwitcherMounted = true;

    // Remove from current parent if needed
    if (langSwitcher.parentNode) {
      langSwitcher.parentNode.removeChild(langSwitcher);
    }

    // Add to appropriate container based on screen size and menu state
    if (isMobile) {
      navMenu.appendChild(langSwitcher);
    } else {
      navContainer.appendChild(langSwitcher);
    }

    // Re-apply active state to current language button
    if (typeof currentLanguage === "string") {
      const langButtons = langSwitcher.querySelectorAll(".lang-btn");
      langButtons.forEach((button) => {
        if (button.dataset.lang === currentLanguage) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }
}

// Handle window resize - update language switcher position and retranslate
window.addEventListener("resize", () => {
  positionLanguageSwitcher();

  // Re-apply translations when screen size changes
  if (
    typeof updateNavigation === "function" &&
    typeof currentLanguage === "string"
  ) {
    // Get current language data
    let langData;
    switch (currentLanguage) {
      case "ru":
        langData = languageRu?.nav;
        break;
      case "ro":
        langData = languageRo?.nav;
        break;
      case "en":
        langData = languageEn?.nav;
        break;
      default:
        langData = languageRu?.nav;
    }

    // Update navigation if language data is available
    if (langData) {
      setTimeout(() => updateNavigation(langData), 100); // Small delay to ensure DOM is updated
    }
  }
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Adjust scroll offset based on viewport and browser type
    let offsetAdjustment = 80;

    // Special handling for Telegram WebView
    if (isTelegramWebview) {
      offsetAdjustment = 100; // Increased offset for Telegram
    }

    // Adjust for mobile devices
    if (window.innerWidth <= 768) {
      offsetAdjustment = isTelegramWebview ? 80 : 70;
    }

    window.scrollTo({
      top: targetSection.offsetTop - offsetAdjustment,
      behavior: "smooth",
    });

    // Close mobile menu after clicking
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");

    const spans = menuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Highlight active nav item based on scroll position
function highlightActiveNavItem() {
  const scrollPosition = window.scrollY;

  // Adjust offset for different browsers
  let offsetAdjustment = isTelegramWebview ? 120 : 100;

  // Find the current section
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - offsetAdjustment;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove active class from all nav links
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Add active class to current nav link
      const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

// Testimonial slider functionality
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    // Remove active class from all dots
    testimonialDots.forEach((d) => d.classList.remove("active"));

    // Add active class to clicked dot
    dot.classList.add("active");

    // Here you would normally slide to the corresponding testimonial
    // Since we only have one testimonial in our mock-up, this is just for show
    console.log(`Switched to testimonial ${index + 1}`);
  });
});

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());

  try {
    emailjs.send("service_l49heve", "template_rxwpu2c", {
      ...formValues,
    });
  } catch (error) {
    console.error("Ошибка отправки формы:", error);
  }

  // Show success message
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
        <div style="width: 100%;"><i class="fas fa-check-circle"></i>
        <p>Thank you for your request! We'll contact you within 1 hour.</p></div>
    `;

  form.innerHTML = "";
  form.appendChild(successMessage);
});

// Animate elements when they come into view
const animateOnScroll = () => {
  animatedElements.forEach((element, index) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      // Add a staggered delay for a more natural animation
      setTimeout(
        () => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        },
        100 * (index % 4),
      ); // Stagger by groups of 4
    }
  });

  // Add a subtle parallax to section backgrounds
  sections.forEach((section) => {
    if (section.id !== "hero") {
      // Skip hero as it already has parallax
      const sectionTop = section.getBoundingClientRect().top;
      const scrollSpeed = 0.1; // Subtle movement

      // Only apply effect when section is in viewport
      if (
        sectionTop < window.innerHeight &&
        sectionTop > -section.offsetHeight
      ) {
        section.style.backgroundPosition = `center ${sectionTop * scrollSpeed}px`;
      }
    }
  });
};

// Set initial styles for animation
document.addEventListener("DOMContentLoaded", () => {
  // Initial styles already set in CSS

  // Apply special styling for Telegram WebView
  if (isTelegramWebview) {
    document.body.classList.add("telegram-webview");

    // Ensure proper initial positioning for Telegram WebView
    if (heroSection) {
      heroSection.style.paddingTop = "100px";
    }
  }

  // Trigger animations on load
  animateOnScroll();

  // Set active nav item on page load
  highlightActiveNavItem();

  // Add CSS active class to nav menu items
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.classList.add("hover");
    });

    link.addEventListener("mouseleave", function () {
      this.classList.remove("hover");
    });
  });

  // Make first card appear immediately for better first impression
  if (document.querySelector(".value-card")) {
    document.querySelector(".value-card").style.opacity = "1";
    document.querySelector(".value-card").style.transform = "translateY(0)";
  }

  // Position language switcher properly
  setTimeout(positionLanguageSwitcher, 200);

  // Monitor for language switcher changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && !languageSwitcherMounted) {
        const langSwitcher = document.querySelector(".language-switcher");
        if (langSwitcher) {
          positionLanguageSwitcher();
        }
      }
    });
  });

  // Start observing the document body for language switcher changes
  observer.observe(document.body, { childList: true, subtree: true });

  // Ensure translations are applied after all DOM manipulations
  if (
    typeof updateNavigation === "function" &&
    typeof currentLanguage === "string"
  ) {
    // Get current language data
    let langData;
    switch (currentLanguage) {
      case "ru":
        langData = languageRu?.nav;
        break;
      case "ro":
        langData = languageRo?.nav;
        break;
      case "en":
        langData = languageEn?.nav;
        break;
      default:
        langData = languageRu?.nav;
    }

    // Update navigation if language data is available
    if (langData) {
      setTimeout(() => updateNavigation(langData), 300); // Delay to ensure DOM is ready
    }
  }

  // For Telegram WebView, scroll slightly down to ensure header visibility
  if (isTelegramWebview) {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 500);
  }
});

// Additional event to handle after full page load
window.addEventListener("load", () => {
  // Final positioning of language switcher after everything is loaded
  setTimeout(positionLanguageSwitcher, 500);

  // Final translation update
  if (
    typeof updateNavigation === "function" &&
    typeof currentLanguage === "string"
  ) {
    let langData;
    switch (currentLanguage) {
      case "ru":
        langData = languageRu?.nav;
        break;
      case "ro":
        langData = languageRo?.nav;
        break;
      case "en":
        langData = languageEn?.nav;
        break;
      default:
        langData = languageRu?.nav;
    }

    if (langData) {
      updateNavigation(langData);
    }
  }

  // Handle hash navigation (for direct links to sections)
  if (window.location.hash) {
    const targetId = window.location.hash;
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Adjust offset for Telegram WebView
      let offsetAdjustment = isTelegramWebview ? 100 : 80;
      if (window.innerWidth <= 768) {
        offsetAdjustment = isTelegramWebview ? 80 : 70;
      }

      // Delay the scroll to ensure everything is fully loaded
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop - offsetAdjustment,
          behavior: "smooth",
        });
      }, 800);
    }
  }
});
