// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    mobileMenuBtn.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Contact form functionality - PEMBARUAN TERBARU
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading
    document.getElementById('loadingOverlay').classList.remove('hidden');

    const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission with loading
    setTimeout(() => {
        // Hide loading
        document.getElementById('loadingOverlay').classList.add('hidden');

        // BAGIAN YANG DIPERBAIKI - Update modal dengan data form
        document.getElementById('modalName').textContent = formData.name;
        document.getElementById('modalEmail').textContent = formData.email;
        document.getElementById('modalSubject').textContent = formData.subject;
        document.getElementById('modalMessage').textContent = formData.message;

        // Show modal with animation
        document.getElementById('successModal').classList.remove('hidden');
        this.reset();
    }, 2000);
});

function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

// Close modal when clicking outside
document.getElementById('successModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Update username if provided
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name');
if (userName) {
    document.getElementById('userName').textContent = userName;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('bg-opacity-95');
    } else {
        header.classList.remove('bg-opacity-95');
    }
});

// Typing animation for hero text
const typingText = document.querySelector('.typing-animation');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);
}

// Add some interactive elements
document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    const speed = scrolled * 0.5;

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});


// Menghandle tombol kirim ke WhatsApp
document.getElementById('sendWhatsAppBtn').addEventListener('click', function () {
    const message = 'Halo, saya ingin menghubungi Anda melalui WhatsApp.';
    const phoneNumber = '+6285257752793'; // Ganti dengan nomor WhatsApp yang benar (termasuk kode negara)

    // Membuka WhatsApp dengan pesan otomatis
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Tutup modal setelah 3 detik
    setTimeout(closeModal, 3000);
});



document.addEventListener('DOMContentLoaded', function () {
    // Memastikan animasi dimulai saat halaman dimuat
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.classList.add('visible');
    });
});

// memanggil halaman roadmap

document.getElementById('startBtn').addEventListener('click', function () {
    window.location.href = 'roadmap.html'; // Mengarahkan ke roadmap.html saat tombol diklik
});

// JavaScript untuk mengatur ulang animasi saat halaman dimuat ulang
window.addEventListener('load', () => {
    const typingElement = document.getElementById('typing-text');
    typingElement.style.animation = 'none'; // Hapus animasi yang ada
    typingElement.offsetHeight; // Trigger reflow
    typingElement.style.animation = ''; // Menambahkan kembali animasi untuk mengulang
});




// SLIDE BACKROUND

// JavaScript for controlling the carousel
let currentIndex = 0;
const slides = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const dots = document.querySelectorAll('.carousel-dots span');

// Update the position of the carousel to show the current image
function updateCarousel() {
    const slideWidth = images[0].clientWidth;
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Event listeners for navigation buttons
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Initialize the carousel
updateCarousel();



