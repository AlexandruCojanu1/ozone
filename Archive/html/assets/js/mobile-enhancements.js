// ===================================
// MOBILE ENHANCEMENTS FOR OZONE RESIDENCE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LAZY LOADING IMPLEMENTATION
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }
    
    // 2. IMPROVED TOUCH INTERACTIONS
    function enhanceTouchInteractions() {
        const touchElements = document.querySelectorAll('.theme-btn, .apartment-card, .navbar-toggle');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function(e) {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // 3. SMOOTH SCROLL TO TOP
    function initScrollToTop() {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (!scrollBtn) return;
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 4. ENHANCED MOBILE MENU
    function enhanceMobileMenu() {
        const navbarToggle = document.querySelector('.navbar-toggle');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (!navbarToggle || !navbarCollapse) return;
        
        // Add smooth animation classes
        navbarToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                navbarCollapse.classList.add('show');
            } else {
                navbarCollapse.classList.remove('show');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggle.contains(e.target) && !navbarCollapse.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggle.click();
                }
            }
        });
        
        // Close menu when clicking on a link
        const menuLinks = navbarCollapse.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991) {
                    navbarToggle.click();
                }
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                navbarToggle.click();
            }
        });
    }
    
    // 5. FORM VALIDATION ENHANCEMENTS
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Add visual feedback for valid/invalid states
                input.addEventListener('blur', function() {
                    if (this.checkValidity()) {
                        this.classList.add('valid');
                        this.classList.remove('invalid');
                    } else {
                        this.classList.add('invalid');
                        this.classList.remove('valid');
                    }
                });
                
                // Clear validation on input
                input.addEventListener('input', function() {
                    this.classList.remove('valid', 'invalid');
                });
            });
        });
    }
    
    // 6. PERFORMANCE OPTIMIZATIONS
    function optimizePerformance() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(function() {
                // Handle scroll-based animations here
            }, 16); // ~60fps
        });
        
        // Optimize resize events
        let resizeTimeout;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function() {
                // Handle resize-based updates here
            }, 250);
        });
        
        // Optimize animations on mobile
        if (window.innerWidth <= 768) {
            const animatedElements = document.querySelectorAll('.wow');
            animatedElements.forEach(element => {
                element.style.animationDuration = '0.6s';
            });
        }
    }
    
    // 7. ACCESSIBILITY IMPROVEMENTS
    function enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('.theme-btn, .navbar-toggle');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });
        
        // Improve focus management
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '3px solid #c49a6a';
                this.style.outlineOffset = '3px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
        
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Sari la conținut';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #73655a;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
        `;
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // 8. MOBILE-SPECIFIC FEATURES
    function initMobileFeatures() {
        // Add pull-to-refresh prevention for better UX
        let startY = 0;
        let currentY = 0;
        
        document.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', function(e) {
            currentY = e.touches[0].clientY;
            
            // Prevent pull-to-refresh on iOS
            if (currentY > startY && window.scrollY === 0) {
                e.preventDefault();
            }
        });
        
        // Add haptic feedback for important actions
        if ('vibrate' in navigator) {
            const importantButtons = document.querySelectorAll('.theme-btn');
            importantButtons.forEach(button => {
                button.addEventListener('click', function() {
                    navigator.vibrate(50);
                });
            });
        }
        
        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('data-src')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    // 9. ERROR HANDLING
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('Mobile enhancement error:', e.error);
        });
        
        // Handle network errors
        window.addEventListener('offline', function() {
            console.log('Device is offline');
            // Could show a notification to user
        });
        
        window.addEventListener('online', function() {
            console.log('Device is online');
        });
        
        // Handle image loading errors
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                e.target.style.display = 'none';
                console.log('Image failed to load:', e.target.src);
            }
        }, true);
    }
    
    // 10. ANALYTICS AND TRACKING
    function initAnalytics() {
        // Track mobile-specific interactions
        const trackEvent = (eventName, element) => {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    'event_category': 'mobile_interaction',
                    'event_label': element ? element.textContent : 'unknown'
                });
            }
        };
        
        // Track button clicks
        const buttons = document.querySelectorAll('.theme-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('button_click', this);
            });
        });
        
        // Track form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function() {
                trackEvent('form_submit', this);
            });
        });
        
        // Track card interactions
        const cards = document.querySelectorAll('.apartment-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                trackEvent('card_click', this);
            });
        });
    }
    
    // Initialize all mobile enhancements
    function initMobileEnhancements() {
        initLazyLoading();
        enhanceTouchInteractions();
        initScrollToTop();
        enhanceMobileMenu();
        enhanceFormValidation();
        optimizePerformance();
        enhanceAccessibility();
        initMobileFeatures();
        initAnalytics();
        initErrorHandling();
        
        console.log('Mobile enhancements initialized');
    }
    
    // Run initialization
    initMobileEnhancements();
    
    // Re-initialize on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(initMobileEnhancements, 100);
    });
    
    // Re-initialize on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            setTimeout(initMobileEnhancements, 100);
        }
    });
    
});

// Export for potential use in other scripts
window.MobileEnhancements = {
    init: function() {
        // Re-initialize if needed
        console.log('Mobile enhancements re-initialized');
    }
}; 