// Crecent Construction - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    initializeSwipers();
    setupFormValidation();
    setupSmoothScroll();
    setupScrollAnimations();
});

// ========== WHATSAPP INTEGRATION ==========

function toggleWhatsAppMenu() {
    const menu = document.getElementById('whatsappMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
}

function openQuoteForm() {
    // Open the quote form modal
    const modal = new bootstrap.Modal(document.getElementById('quoteModal'));
    modal.show();
}

function startQuickChat() {
    // Open WhatsApp with quick message
    const whatsappMessage = `Hi, Crecent Construction%0A%0AI would like to get a quote for my project.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=917418621523&text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
}

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
            delay: 1500,
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
    // ========== CUSTOM VIDEO SLIDER (NO SWIPER) ==========
    
    let currentVideoIndex = 0;
    const videosPerView = {
        mobile: 1,
        tablet: 2,
        desktop: 3
    };
    
    function getVideosPerView() {
        if (window.innerWidth >= 1024) return videosPerView.desktop;
        if (window.innerWidth >= 640) return videosPerView.tablet;
        return videosPerView.mobile;
    }
    
    function updateVideoSlider() {
        const videoWrapper = document.querySelector('.videos-slider .swiper-wrapper');
        const allSlides = document.querySelectorAll('.videos-slider .swiper-slide');
        const slidesPerView = getVideosPerView();
        const totalSlides = allSlides.length;
        
        if (!videoWrapper) return;
        
        // Simple calculation - move by exact slide width
        const slideWidthPercent = 100 / slidesPerView;
        const offset = -(currentVideoIndex * slideWidthPercent);
        
        videoWrapper.style.transform = `translateX(${offset}%)`;
        videoWrapper.style.transition = 'transform 0.3s ease';
        
        // Set slide widths with proper spacing
        allSlides.forEach((slide, index) => {
            slide.style.width = `calc(${slideWidthPercent}% - 20px)`;
            slide.style.marginRight = '20px';
            slide.style.display = 'block';
            slide.style.flexShrink = '0';
        });
        
        // Update button states
        const prevBtn = document.querySelector('.videos-slider .swiper-button-prev');
        const nextBtn = document.querySelector('.videos-slider .swiper-button-next');
        
        if (prevBtn) {
            prevBtn.style.opacity = currentVideoIndex === 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = currentVideoIndex === 0 ? 'none' : 'auto';
        }
        if (nextBtn) {
            const isLastPage = currentVideoIndex >= totalSlides - slidesPerView;
            nextBtn.style.opacity = isLastPage ? '0.3' : '1';
            nextBtn.style.pointerEvents = isLastPage ? 'none' : 'auto';
        }
        
        console.log('Updated slider:', { 
            currentVideoIndex, 
            slidesPerView, 
            totalSlides, 
            offset: offset + '%' 
        });
    }
    
    function pauseAllVideos() {
        const allVideos = document.querySelectorAll('.video-card video');
        allVideos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }
    
    // Initialize custom slider
    const videoWrapper = document.querySelector('.videos-slider .swiper-wrapper');
    const allSlides = document.querySelectorAll('.videos-slider .swiper-slide');
    const totalSlides = allSlides.length;
    const nextBtn = document.querySelector('.videos-slider .swiper-button-next');
    const prevBtn = document.querySelector('.videos-slider .swiper-button-prev');
    
    console.log('Video slider elements found:', {
        wrapper: !!videoWrapper,
        slides: allSlides.length,
        nextBtn: !!nextBtn,
        prevBtn: !!prevBtn
    });
    
    if (videoWrapper && allSlides.length > 0) {
        videoWrapper.style.display = 'flex';
        videoWrapper.style.width = '100%';
        updateVideoSlider();
        
        // Next button
        if (nextBtn) {
            nextBtn.onclick = function(e) {
                console.log('Next button clicked');
                e.preventDefault();
                e.stopPropagation();
                const slidesPerView = getVideosPerView();
                if (currentVideoIndex < totalSlides - slidesPerView) {
                    currentVideoIndex++;
                    updateVideoSlider();
                    pauseAllVideos();
                }
            };
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.onclick = function(e) {
                console.log('Prev button clicked');
                e.preventDefault();
                e.stopPropagation();
                if (currentVideoIndex > 0) {
                    currentVideoIndex--;
                    updateVideoSlider();
                    pauseAllVideos();
                }
            };
        }
    }
    
    // Video playback control
    const videoElements = document.querySelectorAll('.video-card video');
    videoElements.forEach(video => {
        video.addEventListener('play', function() {
            videoElements.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                    otherVideo.currentTime = 0;
                }
            });
        });
    });
    
    // ========== PAUSE VIDEOS WHEN LEAVING SECTION ==========
    
    // Function to check if video section is visible
    function isVideoSectionVisible() {
        const videoSection = document.querySelector('.videos-section');
        if (!videoSection) return false;
        
        const rect = videoSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Section is visible if any part is in viewport
        return rect.bottom > 0 && rect.top < windowHeight;
    }
    
    // Pause videos when scrolling away from section
    let wasVideoSectionVisible = true;
    
    window.addEventListener('scroll', function() {
        const isVisible = isVideoSectionVisible();
        
        // If section was visible but now isn't, pause all videos
        if (wasVideoSectionVisible && !isVisible) {
            pauseAllVideos();
            console.log('Paused videos - left video section');
        }
        
        wasVideoSectionVisible = isVisible;
    });
    
    // Also pause when page loses focus (tab switch, minimize, etc)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAllVideos();
            console.log('Paused videos - page hidden');
        }
    });
    
    // Pause videos when clicking outside video section
    document.addEventListener('click', function(e) {
        const videoSection = document.querySelector('.videos-section');
        if (videoSection && !videoSection.contains(e.target)) {
            // Only pause if a video is currently playing
            const playingVideo = Array.from(videoElements).find(video => !video.paused);
            if (playingVideo) {
                pauseAllVideos();
                console.log('Paused videos - clicked outside section');
            }
        }
    });
    
    // Responsive handling
    window.addEventListener('resize', function() {
        updateVideoSlider();
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

    // Real-time validation and character count
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', function() {
            const charCount = this.value.length;
            document.getElementById('charCount').textContent = charCount;
            
            // Show/hide error in real-time
            if (charCount < 10) {
                document.getElementById('messageError').style.display = charCount > 0 ? 'block' : 'none';
            } else {
                document.getElementById('messageError').style.display = 'none';
            }
        });
    }

    // Real-time phone validation
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            const phoneRegex = /^[0-9]{10}$/;
            const isValid = phoneRegex.test(this.value.replace(/\D/g, ''));
            
            if (this.value && !isValid) {
                document.getElementById('phoneError').style.display = 'block';
                this.classList.add('is-invalid');
            } else {
                document.getElementById('phoneError').style.display = 'none';
                this.classList.remove('is-invalid');
            }
        });
    }

    // Real-time email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(this.value);
            
            if (this.value && !isValid) {
                document.getElementById('emailError').style.display = 'block';
                this.classList.add('is-invalid');
            } else {
                document.getElementById('emailError').style.display = 'none';
                this.classList.remove('is-invalid');
            }
        });
    }

    // Consent checkbox validation
    const consentCheckbox = document.getElementById('whatsappConsent');
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('consentError').style.display = 'none';
            } else {
                document.getElementById('consentError').style.display = 'block';
            }
        });
    }
}

function validateForm(fullName, phone, email, projectType, message) {
    // Reset all error messages
    document.getElementById('fullNameError').style.display = 'none';
    document.getElementById('phoneError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('projectTypeError').style.display = 'none';
    document.getElementById('messageError').style.display = 'none';
    document.getElementById('consentError').style.display = 'none';

    let isValid = true;

    // Full Name validation
    if (!fullName || fullName.trim().length < 2) {
        document.getElementById('fullNameError').style.display = 'block';
        document.getElementById('fullName').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('fullName').classList.remove('is-invalid');
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\D/g, ''))) {
        document.getElementById('phoneError').style.display = 'block';
        document.getElementById('phone').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('phone').classList.remove('is-invalid');
    }

    // Email validation (optional - only validate format if provided)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('email').classList.remove('is-invalid');
    }

    // Project Type validation
    if (!projectType) {
        document.getElementById('projectTypeError').style.display = 'block';
        document.getElementById('projectType').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('projectType').classList.remove('is-invalid');
    }

    // Message validation (minimum 10 characters)
    if (!message || message.trim().length < 10) {
        document.getElementById('messageError').style.display = 'block';
        document.getElementById('message').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('message').classList.remove('is-invalid');
    }

    // WhatsApp Consent validation
    const consentCheckbox = document.getElementById('whatsappConsent');
    if (!consentCheckbox || !consentCheckbox.checked) {
        document.getElementById('consentError').style.display = 'block';
        isValid = false;
    }

    if (!isValid) {
        showAlert('❌ Please fill all fields correctly', 'warning');
    }

    return isValid;
}

// Submit quote and open WhatsApp
function submitQuote() {
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value;

    if (!validateForm(fullName, phone, email, projectType, message)) {
        return;
    }

    // Create WhatsApp message with form data
    const whatsappMessage = `Hi, Crecent Construction%0A%0A📩 New quote request.%0A%0AName: ${fullName}%0APhone: +91 ${phone}%0AEmail: ${email}%0AProject Type: ${projectType}%0A%0AMessage:%0A${message}`;
    
    // Open WhatsApp with pre-populated message
    const whatsappUrl = `https://api.whatsapp.com/send?phone=917418621523&text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showAlert('✅ Opening WhatsApp...', 'success');

    // Reset form
    document.getElementById('quoteForm').reset();

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('quoteModal'));
    if (modal) {
        modal.hide();
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
