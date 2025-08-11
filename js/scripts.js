// Toggle Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Stat Counter Logic
const stats = document.querySelectorAll('.stat h3');
let statsStarted = false;

function startCounting() {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        let count = 0;
        const increment = target / 100;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                stat.innerText = target;
            }
        };

        updateCount();
    });
}

// Start stat counter when section comes into view
const statsSection = document.querySelector('.stats');

if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsStarted) {
                statsStarted = true;
                startCounting();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(statsSection);
}

// Hero Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    setInterval(() => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 2000);
});

// Testimonials Slider
const slides = document.querySelectorAll('.testimonial-slide');
const prevArrow = document.querySelector('.testimonial-nav.prev');
const nextArrow = document.querySelector('.testimonial-nav.next');
let currentSlide = 0;

function initializeSlider() {
    slides.forEach((slide, index) => {
        slide.style.opacity = '0';
        if (index === 0) {
            slide.style.opacity = '1';
        }
    });
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = '0';
        if (i === index) {
            slide.style.opacity = '1';
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

prevArrow.addEventListener('click', prevSlide);
nextArrow.addEventListener('click', nextSlide);

initializeSlider();
setInterval(nextSlide, 5000);
