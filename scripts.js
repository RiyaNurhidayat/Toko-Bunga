// Mobile menu functionality
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create menu toggle button
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        menuToggle.appendChild(span);
    }
    
    // Insert menu toggle before nav-links
    navbar.insertBefore(menuToggle, navLinks);
    
    // Toggle menu on click
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Image slider functionality
const totalImages = 47;
const imageFolderPath = 'images/';
let currentIndex = 0;
let autoSlideInterval;

function setupImageSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderControls = document.querySelector('.slider-controls');

    // Clear existing content
    sliderContainer.innerHTML = '';
    sliderControls.innerHTML = '';

    // Add images
    for (let i = 1; i <= totalImages; i++) {
        const imgElement = document.createElement('img');
        imgElement.src = `${imageFolderPath}G${i}.jpg`;
        imgElement.alt = `Flower ${i}`;
        imgElement.loading = 'lazy'; // Lazy load images
        sliderContainer.appendChild(imgElement);
    }

    // Add navigation dots
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
            resetAutoSlide();
        });
        sliderControls.appendChild(dot);
    }
}

function updateSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const offset = -currentIndex * 100;
    sliderContainer.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupImageSlider();
    resetAutoSlide();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
            resetAutoSlide();
        }
    });
});

// Handle visibility change to pause/resume auto-slide
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoSlideInterval);
    } else {
        resetAutoSlide();
    }
});