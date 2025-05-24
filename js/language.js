// Language switcher functionality
let currentLanguage = "ru"; // Default language

// Initialize language when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const preferredLanguage = getPreferredLanguage();
  loadLanguageData(preferredLanguage);
  
  // Add additional event listener for after all scripts are loaded
  // This ensures translations apply even if DOM is manipulated by other scripts
  window.addEventListener('load', () => {
    // Re-apply translations after a short delay
    setTimeout(() => {
      // Get appropriate language data
      let langData;
      switch (currentLanguage) {
        case "ru": langData = languageRu; break;
        case "ro": langData = languageRo; break;
        case "en": langData = languageEn; break;
        default: langData = languageRu;
      }
      
      // Update all translatable sections again
      if (langData) {
        updateNavigation(langData.nav);
      }
    }, 300);
  });
});

// Function to get preferred language from URL or localStorage
function getPreferredLanguage() {
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");

  if (langParam && ["ru", "ro", "en"].includes(langParam)) {
    localStorage.setItem("preferredLanguage", langParam);
    return langParam;
  }

  // Then check localStorage
  const storedLang = localStorage.getItem("preferredLanguage");
  if (storedLang && ["ru", "ro", "en"].includes(storedLang)) {
    return storedLang;
  }

  // Default to browser language or Russian if not supported
  const browserLang = navigator.language.split("-")[0];
  if (["ru", "ro", "en"].includes(browserLang)) {
    return browserLang;
  }

  return "ru"; // Default fallback
}

// Function to update URL with language parameter
function updateUrlWithLanguage(lang) {
  const url = new URL(window.location);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
}

// Function to load language data
function loadLanguageData(lang) {
  currentLanguage = lang;
  updateUrlWithLanguage(lang);
  localStorage.setItem("preferredLanguage", lang);

  // Set document language
  document.documentElement.lang = lang;

  // Update page title
  let langData;
  switch (lang) {
    case "ru":
      langData = languageRu;
      break;
    case "ro":
      langData = languageRo;
      break;
    case "en":
      langData = languageEn;
      break;
    default:
      langData = languageRu;
  }

  document.title = langData.meta.title;

  // Update navigation
  updateNavigation(langData.nav);

  // Update hero section
  updateHeroSection(langData.hero);

  // Update about section
  updateAboutSection(langData.about);

  // Update why us section
  updateWhyUsSection(langData.whyUs);

  // Update services section
  updateServicesSection(langData.services);

  // Update process section
  updateProcessSection(langData.process);

  // Update goals section
  updateGoalsSection(langData.goals);

  // Update audience section
  updateAudienceSection(langData.audience);

  // Update gallery section
  updateGallerySection(langData.gallery);

  // Update testimonials section
  updateTestimonialsSection(langData.testimonials);

  // Update contact section
  updateContactSection(langData.contact);

  // Update footer
  updateFooterSection(langData.footer);

  // Update language switcher
  updateLanguageSwitcher(langData.langSwitcher);
}

// Function to update navigation
function updateNavigation(navData) {
  // Update all navigation links using data-key attributes
  document.querySelectorAll(".nav-menu a[data-key]").forEach(link => {
    const key = link.getAttribute('data-key');
    if (navData[key]) {
      link.textContent = navData[key];
    }
  });
  
  // Fallback to using href attributes for any links without data-key
  document.querySelectorAll(".nav-menu a:not([data-key])").forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#hero') link.textContent = navData.home;
    if (href === '#about') link.textContent = navData.about;
    if (href === '#value') link.textContent = navData.whyUs;
    if (href === '#services') link.textContent = navData.services;
    if (href === '#process') link.textContent = navData.process;
    if (href === '#audience-goals') link.textContent = navData.goalsAudience;
    if (href === '#gallery') link.textContent = navData.gallery;
    if (href === '#testimonials') link.textContent = navData.testimonials;
    if (href === '#contact') link.textContent = navData.contact;
  });
  
  // Also update footer navigation links that might not have data-key attributes
  document.querySelectorAll(".footer-links a").forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#hero') link.textContent = navData.home;
    if (href === '#about') link.textContent = navData.about;
    if (href === '#value') link.textContent = navData.whyUs;
    if (href === '#services') link.textContent = navData.services;
    if (href === '#process') link.textContent = navData.process;
    if (href === '#audience-goals') link.textContent = navData.goalsAudience;
    if (href === '#gallery') link.textContent = navData.gallery;
    if (href === '#testimonials') link.textContent = navData.testimonials;
    if (href === '#contact') link.textContent = navData.contact;
  });
}

// Function to update hero section
function updateHeroSection(heroData) {
  const heroHeadline = document.querySelector(".hero-headline");
  const heroSubheadline = document.querySelector(".hero-subheadline");
  const heroDescription = document.querySelector(".hero-text p");
  const heroButton = document.querySelector(".hero-text .btn-primary");
  const scrollIndicator = document.querySelector(".scroll-indicator p");

  if (heroHeadline) heroHeadline.textContent = heroData.headline;
  if (heroSubheadline) heroSubheadline.textContent = heroData.subheadline;
  if (heroDescription) heroDescription.textContent = heroData.description;
  if (heroButton) heroButton.textContent = heroData.ctaButton;
  if (scrollIndicator) scrollIndicator.textContent = heroData.scrollIndicator;
}

// Function to update about section
function updateAboutSection(aboutData) {
  const aboutTitle = document.querySelector("#about .section-header h2");
  const aboutContent = document.querySelector(".about-content");

  if (aboutTitle) aboutTitle.textContent = aboutData.title;

  if (aboutContent) {
    aboutContent.innerHTML = "";
    aboutData.content.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      aboutContent.appendChild(p);
    });
  }
}

// Function to update why us section
function updateWhyUsSection(whyUsData) {
  const whyUsTitle = document.querySelector("#value .section-header h2");
  const whyUsSubtitle = document.querySelector("#value .section-header p");
  const valueCards = document.querySelectorAll(".value-card");

  if (whyUsTitle) whyUsTitle.textContent = whyUsData.title;
  if (whyUsSubtitle) whyUsSubtitle.textContent = whyUsData.subtitle;

  if (valueCards.length === whyUsData.cards.length) {
    valueCards.forEach((card, index) => {
      const icon = card.querySelector(".value-icon");
      const title = card.querySelector("h3");
      const description = card.querySelector("p");

      if (icon) icon.textContent = whyUsData.cards[index].icon;
      if (title) title.textContent = whyUsData.cards[index].title;
      if (description)
        description.textContent = whyUsData.cards[index].description;
    });
  }
}

// Function to update services section
function updateServicesSection(servicesData) {
  const servicesTitle = document.querySelector("#services .section-header h2");
  const servicesSubtitle = document.querySelector(
    "#services .section-header p",
  );
  const serviceCards = document.querySelectorAll(".service-card");

  if (servicesTitle) servicesTitle.textContent = servicesData.title;
  if (servicesSubtitle) servicesSubtitle.textContent = servicesData.subtitle;

  if (serviceCards.length === servicesData.cards.length) {
    serviceCards.forEach((card, index) => {
      const icon = card.querySelector(".service-icon");
      const title = card.querySelector("h3");
      const description = card.querySelector("p");

      if (icon) icon.textContent = servicesData.cards[index].icon;
      if (title) title.textContent = servicesData.cards[index].title;
      if (description)
        description.textContent = servicesData.cards[index].description;
    });
  }
}

// Function to update process section
function updateProcessSection(processData) {
  const processTitle = document.querySelector("#process .section-header h2");
  const processSubtitle = document.querySelector(
    "#process .section-header p:nth-child(2)",
  );
  const processDescription = document.querySelector(
    "#process .section-header p:nth-child(3)",
  );
  const processSteps = document.querySelectorAll(".process-step");

  if (processTitle) processTitle.textContent = processData.title;
  if (processSubtitle) processSubtitle.textContent = processData.subtitle;
  if (processDescription)
    processDescription.textContent = processData.description;

  if (processSteps.length === processData.steps.length) {
    processSteps.forEach((step, index) => {
      const number = step.querySelector(".step-number");
      const title = step.querySelector("h3");
      const description = step.querySelector("p");

      if (number) number.textContent = processData.steps[index].number;
      if (title) title.textContent = processData.steps[index].title;
      if (description)
        description.textContent = processData.steps[index].description;
    });
  }
}

// Function to update goals section
function updateGoalsSection(goalsData) {
  const goalsTitle = document.querySelector(
    "#audience-goals .section-header h2",
  );
  const goalCards = document.querySelectorAll(".goal-card");

  if (goalsTitle) goalsTitle.textContent = goalsData.title;

  if (goalCards.length === goalsData.items.length) {
    goalCards.forEach((card, index) => {
      const description = card.querySelector("p");
      if (description) description.textContent = goalsData.items[index];
    });
  }
}

// Function to update audience section
function updateAudienceSection(audienceData) {
  const audienceTitle = document.querySelector(
    "#audience-goals .section-header:nth-of-type(2) h2",
  );
  const audienceCards = document.querySelectorAll(".audience-card");

  if (audienceTitle) audienceTitle.textContent = audienceData.title;

  if (audienceCards.length === audienceData.items.length) {
    audienceCards.forEach((card, index) => {
      const description = card.querySelector("p");
      if (description) description.textContent = audienceData.items[index];
    });
  }
}

// Function to update gallery section
function updateGallerySection(galleryData) {
  const galleryTitle = document.querySelector("#gallery .section-header h2");
  const gallerySubtitle = document.querySelector("#gallery .section-header p");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryTitle) galleryTitle.textContent = galleryData.title;
  if (gallerySubtitle) gallerySubtitle.textContent = galleryData.subtitle;

  if (galleryItems.length === galleryData.items.length) {
    galleryItems.forEach((item, index) => {
      const image = item.querySelector("img");
      const title = item.querySelector(".gallery-overlay h4");
      const description = item.querySelector(".gallery-overlay p");

      if (image) image.alt = galleryData.items[index].alt;
      if (title) title.textContent = galleryData.items[index].title;
      if (description)
        description.textContent = galleryData.items[index].description;
    });
  }
}

// Function to update testimonials section
function updateTestimonialsSection(testimonialsData) {
  const testimonialsTitle = document.querySelector(
    "#testimonials .section-header h2",
  );
  const testimonialsSubtitle = document.querySelector(
    "#testimonials .section-header p",
  );
  const testimonialContent = document.querySelector(".testimonial-content p");
  const testimonialAuthor = document.querySelector(".author-info h4");
  const testimonialPosition = document.querySelector(".author-info p");

  if (testimonialsTitle) testimonialsTitle.textContent = testimonialsData.title;
  if (testimonialsSubtitle)
    testimonialsSubtitle.textContent = testimonialsData.subtitle;

  if (testimonialContent && testimonialsData.items.length > 0) {
    testimonialContent.textContent = testimonialsData.items[0].content;
  }

  if (testimonialAuthor && testimonialsData.items.length > 0) {
    testimonialAuthor.textContent = testimonialsData.items[0].author;
  }

  if (testimonialPosition && testimonialsData.items.length > 0) {
    testimonialPosition.textContent = testimonialsData.items[0].position;
  }
}

// Function to update contact section
function updateContactSection(contactData) {
  const contactTitle = document.querySelector("#contact h2");
  const contactSubtitle = document.querySelector(
    "#contact > .container > .cta-content > p",
  );
  const nameInput = document.querySelector('.contact-form input[type="text"]');
  const emailInput = document.querySelector(
    '.contact-form input[type="email"]',
  );
  const phoneInput = document.querySelector('.contact-form input[type="tel"]');
  const messageTextarea = document.querySelector(".contact-form textarea");
  const submitButton = document.querySelector(".contact-form button");
  const socialTitle = document.querySelector(".social-cta p");
  const telegramLink = document.querySelector(".social-btn.telegram");
  const whatsappLink = document.querySelector(".social-btn.whatsapp");

  if (contactTitle) contactTitle.textContent = contactData.title;
  if (contactSubtitle) contactSubtitle.textContent = contactData.subtitle;

  if (nameInput) nameInput.placeholder = contactData.form.name;
  if (emailInput) emailInput.placeholder = contactData.form.email;
  if (phoneInput) phoneInput.placeholder = contactData.form.phone;
  if (messageTextarea) messageTextarea.placeholder = contactData.form.message;
  if (submitButton) submitButton.textContent = contactData.form.submit;

  if (socialTitle) socialTitle.textContent = contactData.social.title;

  if (telegramLink) {
    const telegramIcon = telegramLink.querySelector("i");
    if (telegramIcon) {
      telegramLink.innerHTML = "";
      telegramLink.appendChild(telegramIcon);
      telegramLink.innerHTML += ` ${contactData.social.telegram}`;
    }
  }

  if (whatsappLink) {
    const whatsappIcon = whatsappLink.querySelector("i");
    if (whatsappIcon) {
      whatsappLink.innerHTML = "";
      whatsappLink.appendChild(whatsappIcon);
      whatsappLink.innerHTML += ` ${contactData.social.whatsapp}`;
    }
  }
}

// Function to update footer
function updateFooterSection(footerData) {
  const footerDescription = document.querySelector(".footer-logo p");
  const footerSections = document.querySelectorAll(".footer-column");
  const copyright = document.querySelector(".copyright p");

  if (footerDescription) footerDescription.textContent = footerData.description;

  // Update Services section
  const servicesSection = footerSections[0];
  if (servicesSection) {
    const servicesTitle = servicesSection.querySelector("h3");
    const servicesLinks = servicesSection.querySelectorAll("ul li a");

    if (servicesTitle) servicesTitle.textContent = footerData.sections[0].title;

    if (servicesLinks.length === footerData.sections[0].links.length) {
      servicesLinks.forEach((link, index) => {
        link.textContent = footerData.sections[0].links[index].text;
      });
    }
  }

  // Update About Us section
  const aboutSection = footerSections[1];
  if (aboutSection) {
    const aboutTitle = aboutSection.querySelector("h3");
    const aboutLinks = aboutSection.querySelectorAll("ul li a");

    if (aboutTitle) aboutTitle.textContent = footerData.sections[1].title;

    if (aboutLinks.length === footerData.sections[1].links.length) {
      aboutLinks.forEach((link, index) => {
        link.textContent = footerData.sections[1].links[index].text;
      });
    }
  }

  if (copyright) copyright.textContent = footerData.copyright;
}

// Function to update language switcher
function updateLanguageSwitcher(langSwitcherData) {
  // Create language switcher if it doesn't exist
  let langSwitcher = document.querySelector(".language-switcher");

  if (!langSwitcher) {
    langSwitcher = document.createElement("div");
    langSwitcher.className = "language-switcher";

    // Create buttons for each language
    const ruButton = document.createElement("button");
    ruButton.className = "lang-btn";
    ruButton.dataset.lang = "ru";
    ruButton.textContent = langSwitcherData.ru;
    ruButton.setAttribute('aria-label', 'Русский язык');
    ruButton.addEventListener("click", () => switchLanguage("ru"));

    const roButton = document.createElement("button");
    roButton.className = "lang-btn";
    roButton.dataset.lang = "ro";
    roButton.textContent = langSwitcherData.ro;
    roButton.setAttribute('aria-label', 'Limba română');
    roButton.addEventListener("click", () => switchLanguage("ro"));

    const enButton = document.createElement("button");
    enButton.className = "lang-btn";
    enButton.dataset.lang = "en";
    enButton.textContent = langSwitcherData.en;
    enButton.setAttribute('aria-label', 'English language');
    enButton.addEventListener("click", () => switchLanguage("en"));

    langSwitcher.appendChild(ruButton);
    langSwitcher.appendChild(roButton);
    langSwitcher.appendChild(enButton);

    // Add CSS for language switcher if not already added
    if (!document.getElementById('language-switcher-styles')) {
      const style = document.createElement("style");
      style.id = 'language-switcher-styles';
      style.textContent = `
                .language-switcher {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                }

                .lang-btn {
                    background: none;
                    border: none;
                    color: var(--light-text);
                    font-size: 1.4rem;
                    cursor: pointer;
                    padding: 5px 8px;
                    margin: 0 5px;
                    border-radius: 3px;
                    transition: var(--transition);
                }

                .lang-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .lang-btn.active {
                    background: var(--primary-color);
                    font-weight: bold;
                }

                @media (max-width: 768px) {
                    .language-switcher {
                        margin: 20px 0 10px;
                        padding-top: 15px;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .lang-btn {
                        padding: 8px 15px;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }
  
  // Position the language switcher based on screen size
  const isMobile = window.innerWidth <= 768;
  const navMenu = document.querySelector(".nav-menu");
  const navContainer = document.querySelector("nav .container");
  
  // Remove from current parent if it exists
  if (langSwitcher.parentNode) {
    langSwitcher.parentNode.removeChild(langSwitcher);
  }
  
  // Add to appropriate container based on screen size
  if (isMobile && navMenu) {
    navMenu.appendChild(langSwitcher);
  } else if (navContainer) {
    navContainer.appendChild(langSwitcher);
  }

  // Update active state
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((button) => {
    if (button.dataset.lang === currentLanguage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Function to switch language
function switchLanguage(lang) {
  if (["ru", "ro", "en"].includes(lang) && lang !== currentLanguage) {
    loadLanguageData(lang);
    
    // Always force a re-translation for all menus regardless of device
    // Get appropriate language data
    let langData;
    switch (lang) {
      case "ru": langData = languageRu; break;
      case "ro": langData = languageRo; break;
      case "en": langData = languageEn; break;
      default: langData = languageRu;
    }
    
    // Update navigation again to ensure all menus are translated
    updateNavigation(langData.nav);
  }
}

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
  const preferredLanguage = getPreferredLanguage();
  loadLanguageData(preferredLanguage);

  // Add the language switcher to navigation menu on mobile
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      const langSwitcher = document.querySelector(".language-switcher");
      const navMenu = document.querySelector(".nav-menu");

      if (langSwitcher && navMenu && !navMenu.contains(langSwitcher)) {
        navMenu.appendChild(langSwitcher);
      }
    }
  });
});
