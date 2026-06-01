// Smooth scroll functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Demo video modal functions
function playDemoVideo() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'block';
        const video = modal.querySelector('video');
        if (video) video.play();
    }
}

function closeDemoVideo() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'none';
        const video = modal.querySelector('video');
        if (video) video.pause();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('demoModal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 30;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
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
            
            // Trigger counter animation
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
            
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

// Observe stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Parallax scroll effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const distance = scrollPosition - elementPosition;
        
        if (distance > -window.innerHeight && distance < window.innerHeight) {
            element.style.backgroundPosition = `center ${distance * 0.5}px`;
        }
    });
});

// Dropdown menu interactions
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
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

// Button ripple effect
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .btn-primary-lg, .btn-secondary-lg');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.getAttribute('href')) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.borderRadius = '50%';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Smooth hover effects
const hoverElements = document.querySelectorAll('.hover-lift');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDemoVideo();
    }
});

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
                link.style.color = 'inherit';
                const sectionId = section.getAttribute('id');
                const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (matchingLink) {
                    matchingLink.style.color = 'var(--primary-blue)';
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Advanced scroll animations
const scrollElements = document.querySelectorAll('[class*="slide-in"], [class*="fade-in"]');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((element) => {
        if (elementInView(element, 150)) {
            displayScrollElement(element);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    handleScrollAnimation();
    updateActiveNavLink();
}, 100));

// Console message
console.log('%c🚀 Enterprise-Grade Application with Advanced Features', 'font-size: 18px; color: #0078d4; font-weight: bold;');
console.log('%c✨ Video Backgrounds • Advanced Animations • Smooth Interactions', 'font-size: 14px; color: #0078d4;');
console.log('%c⚡ Performance Optimized • Fully Responsive • Enterprise Security', 'font-size: 12px; color: #605e5c;');
