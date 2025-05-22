// DOM elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const parallaxElement = document.querySelector('#hero .parallax-bg');
const navLinks = document.querySelectorAll('.nav-menu a');
const testimonialDots = document.querySelectorAll('.nav-dot');
const form = document.querySelector('.contact-form');
const sections = document.querySelectorAll('section');
const animatedElements = document.querySelectorAll('.value-card, .service-card, .process-step, .gallery-item');

// Sticky header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Highlight active nav item based on scroll position
function highlightActiveNavItem() {
    const scrollPosition = window.scrollY;
    
    // Find the current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current nav link
            const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Testimonial slider functionality
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from all dots
        testimonialDots.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked dot
        dot.classList.add('active');
        
        // Here you would normally slide to the corresponding testimonial
        // Since we only have one testimonial in our mock-up, this is just for show
        console.log(`Switched to testimonial ${index + 1}`);
    });
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    
    // Here you would normally send the form data to a server
    // For demo purposes, we'll just log it and show a success message
    console.log('Form submitted:', formValues);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you for your request! We'll contact you within 1 hour.</p>
    `;
    
    form.innerHTML = '';
    form.appendChild(successMessage);
});

// Animate elements when they come into view
const animateOnScroll = () => {
    animatedElements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            // Add a staggered delay for a more natural animation
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * (index % 4)); // Stagger by groups of 4
        }
    });
    
    // Add a subtle parallax to section backgrounds
    sections.forEach(section => {
        if (section.id !== 'hero') { // Skip hero as it already has parallax
            const sectionTop = section.getBoundingClientRect().top;
            const scrollSpeed = 0.1; // Subtle movement
            
            // Only apply effect when section is in viewport
            if (sectionTop < window.innerHeight && sectionTop > -section.offsetHeight) {
                section.style.backgroundPosition = `center ${sectionTop * scrollSpeed}px`;
            }
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initial styles already set in CSS
    
    // Trigger animations on load
    animateOnScroll();
    
    // Set active nav item on page load
    highlightActiveNavItem();
    
    // Add CSS active class to nav menu items
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Make first card appear immediately for better first impression
    if (document.querySelector('.value-card')) {
        document.querySelector('.value-card').style.opacity = '1';
        document.querySelector('.value-card').style.transform = 'translateY(0)';
    }
});