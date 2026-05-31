// Smooth scroll navigation
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll tracking for nav
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Demo functionality
let clickCount = 0;

function handleDemo() {
    const input = document.getElementById('demoInput');
    const output = document.getElementById('demoOutput');
    const counter = document.getElementById('counter');
    
    if (input.value.trim()) {
        clickCount++;
        counter.textContent = clickCount;
        
        // Create magic effect
        output.innerHTML = `
            <span style="font-size: 1.5rem; animation: fadeIn 0.5s ease-in-out;">
                ✨ "${input.value}" is AWESOME! ✨
            </span>
        `;
        
        // Clear input
        input.value = '';
        input.focus();
        
        // Add animation
        output.style.animation = 'none';
        setTimeout(() => {
            output.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 10);
    } else {
        output.innerHTML = '<span style="color: #f87171;">Please type something first! 🚀</span>';
    }
}

// Allow Enter key to trigger demo
document.getElementById('demoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleDemo();
    }
});

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Show success message
    alert(`Thanks ${name}! Your message has been sent successfully. We'll get back to you at ${email} soon!`);
    
    // Reset form
    form.reset();
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

console.log('🎉 Welcome to Awesome Project! Built with love and JavaScript.');