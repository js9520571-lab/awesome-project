// Smooth scroll functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navigation active state on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const scroll = window.pageYOffset;
        
        if (scroll >= top - 200 && scroll <= bottom - 200) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const sectionId = section.getAttribute('id');
                const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (matchingLink) {
                    matchingLink.classList.add('active');
                }
            });
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.6s ease forwards`;
            entry.target.style.animationDelay = `${index * 0.1}s`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.product-card, .solution-card, .testimonial-card, .resource-card, .feature-item, .stat-item');
animateElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Dropdown menu interactions
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.style.opacity = '1';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.style.opacity = '0';
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '64px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.backgroundColor = 'white';
        navMenu.style.padding = '20px';
    });
}

// Form handling (if needed)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Button interactions
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.getAttribute('href')) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Console message
console.log('%c🚀 Enterprise-Grade Application', 'font-size: 18px; color: #0078d4; font-weight: bold;');
console.log('%cBuilt with Microsoft-level engineering standards', 'font-size: 14px; color: #0078d4;');
console.log('%cPerformance optimized • Enterprise Security • Global Scale', 'font-size: 12px; color: #605e5c;');