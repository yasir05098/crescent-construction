// Cresent Construction - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    initializeSwipers();
    setupFormValidation();
    setupSmoothScroll();
    setupScrollAnimations();
});

// ========== SWIPER INITIALIZATION ==========

function initializeSwipers() {
    // Service Slider
    const serviceSlider = new Swiper('.service-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });

    // Projects Slider
    const projectsSlider = new Swiper('.projects-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });

    // Videos Slider
    const videosSlider = new Swiper('.videos-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
}

// ========== FORM VALIDATION ==========

function setupFormValidation() {
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateAndSubmitForm();
        });
    }
}

function validateForm(fullName, phone, email, projectType, message) {
    // Full Name validation
    if (!fullName || fullName.trim().length < 2) {
        showAlert('Please enter a valid full name.', 'warning');
        document.getElementById('fullName').focus();
        return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\D/g, ''))) {
        showAlert('Please enter a valid 10-digit phone number.', 'warning');
        document.getElementById('phone').focus();
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'warning');
        document.getElementById('email').focus();
        return false;
    }

    // Project Type validation
    if (!projectType) {
        showAlert('Please select a project type.', 'warning');
        document.getElementById('projectType').focus();
        return false;
    }

    // Message validation
    if (!message || message.trim().length < 10) {
        showAlert('Please enter a message with at least 10 characters.', 'warning');
        document.getElementById('message').focus();
        return false;
    }

    return true;
}

// Submit quote to backend server
async function submitQuote() {
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value;

    if (!validateForm(fullName, phone, email, projectType, message)) {
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('button[onclick="submitQuote()"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

    try {
        // Send data to backend API
        const response = await fetch('/api/submit-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: fullName.trim(),
                phone: phone.trim(),
                email: email.trim(),
                projectType: projectType.trim(),
                message: message.trim()
            })
        });

        const data = await response.json();

        if (data.success) {
            // Show success message
            showAlert('✅ Quote submitted successfully! Check your email for confirmation. WhatsApp message sent!', 'success');

            // Reset form
            document.getElementById('quoteForm').reset();

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('quoteModal'));
            if (modal) {
                modal.hide();
            }

            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        } else {
            // Show error message
            showAlert('❌ Error: ' + (data.error || 'Failed to submit quote'), 'danger');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error submitting quote:', error);
        showAlert('❌ Network error: Unable to submit quote. Please check your connection.', 'danger');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

function validateAndSubmitForm() {
    submitQuote();
}

// ========== SMOOTH SCROLL ==========

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== SCROLL ANIMATIONS ==========

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                // Add animation class based on element type
                if (entry.target.querySelector('.service-card') || entry.target.querySelector('.project-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .project-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// ========== UTILITY FUNCTIONS ==========

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert at top of page
    document.body.insertBefore(alertDiv, document.body.firstChild);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ========== NAVIGATION ACTIVE STATE ==========

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== FORM INPUT VALIDATION ==========

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove non-digits
            this.value = this.value.replace(/\D/g, '');
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    }

    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    }
});

// ========== SCROLL TO TOP BUTTON ==========

const scrollToTopBtn = document.getElementById('scrollTopBtn');

if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== LAZY LOADING IMAGES ==========

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== CONSOLE MESSAGE ==========

console.log('%cCresent Construction', 'color: #339bf2; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to our official website!', 'color: #666; font-size: 14px;');
