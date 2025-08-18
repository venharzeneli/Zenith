const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = navLinks.querySelectorAll("a");
const nav = document.querySelector("nav");

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// Smooth scrolling with GSAP
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('nav').offsetHeight || 100;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            gsap.to(window, {
                scrollTo: {
                    y: targetPosition,
                    autoKill: false
                },
                duration: 1,
                ease: "power2.out"
            });
        }
    });
});

// SLIDER
const swiper = new Swiper(".swiper", {
    loop: true,
    speed: 800,
    effect: "slide",
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "bullets",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    cssMode: false,
    easing: "ease-in-out",
});

// Animate text on slide change
function animateSlideText(slide) {
    const title = slide.querySelector(".swiper-content h1");
    const desc = slide.querySelector(".swiper-content p");

    if (title && desc) {
        gsap.set([title, desc], { opacity: 0, y: 40 });

        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
        });

        gsap.to(desc, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
        });
    }
}

// Trigger animation on initial load
animateSlideText(document.querySelector(".swiper-slide-active"));

// Trigger animation on slide change
swiper.on("slideChangeTransitionEnd", () => {
    const activeSlide = document.querySelector(".swiper-slide-active");
    animateSlideText(activeSlide);
});

// Animation when we scroll
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > window.innerHeight - 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Active link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinksHighlight = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    const navbarHeight = document.querySelector('nav').offsetHeight || 100;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - navbarHeight;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinksHighlight.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Gallery items
const galleryItems = [
    { id: 1, src: "img/furniture-1.jpg", category: "sallon", alt: "Modern Living Room" },
    { id: 2, src: "img/furniture-2.jpg", category: "kuzhina", alt: "Luxury Kitchen" },
    { id: 3, src: "img/furniture-3.jpg", category: "dhoma", alt: "Elegant Bedroom" },
    { id: 4, src: "img/bathroom-1.jpg", category: "kuzhina", alt: "Modern Office" },
    { id: 5, src: "img/furniture-4.jpg", category: "kauqa", alt: "Comfortable Armchair" },
    { id: 6, src: "img/bedroom1.jpg", category: "sallon", alt: "Stylish Dining Room" },
    { id: 7, src: "img/sofa.jpg", category: "sallon", alt: "Stylish Dining Room" },
    { id: 8, src: "img/livingroom-1.jpg", category: "sallon", alt: "Stylish Dining Room" },
    { id: 9, src: "img/library-2.jpg", category: "sallon", alt: "Stylish Dining Room" },
    { id: 10, src: "img/bathroom-1.jpg", category: "sallon", alt: "Stylish Dining Room" },
];

const galleryContainer = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxCaption = document.getElementById('lightboxCaption');

let filtered = galleryItems;
let currentIndex = 0;

function renderGallery(items) {
    galleryContainer.innerHTML = "";
    items.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.style.setProperty("--delay", index);
        div.innerHTML = `<img src="${item.src.trim()}" alt="${item.alt}" data-index="${index}"/>`;
        div.onclick = () => openLightbox(index);
        galleryContainer.appendChild(div);
    });
}

function renderGalleryWithTransition(items) {
    galleryContainer.classList.add("fade-out");
    setTimeout(() => {
        renderGallery(items);
        galleryContainer.classList.remove("fade-out");
    }, 200);
}

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    updateLightbox();
}

function updateLightbox() {
    const item = filtered[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${filtered.length}`;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function nextImage() {
    currentIndex = (currentIndex + 1) % filtered.length;
    updateLightbox();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    updateLightbox();
}

lightboxClose.onclick = closeLightbox;
lightboxNext.onclick = (e) => {
    e.stopPropagation();
    nextImage();
};
lightboxPrev.onclick = (e) => {
    e.stopPropagation();
    prevImage();
};
lightbox.onclick = (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
};

// Filter functionality
document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");
        filtered = category === "all"
            ? galleryItems
            : galleryItems.filter((item) => item.category === category);

        renderGalleryWithTransition(filtered);
    });
});

// Initial render
renderGallery(filtered);

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.textContent = 'Sending...';
    formMessage.classList.remove('success', 'error');

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessage.textContent = 'Thank you! Your project inquiry has been sent.';
            formMessage.classList.add('success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formMessage.textContent = 'Oops! Something went wrong. Please try again.';
        formMessage.classList.add('error');
    }
});