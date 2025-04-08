// Theme initialization (existing code - KEEP THIS)
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Existing theme detection (KEEP THIS)
const savedTheme = localStorage.getItem('zenshin-theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

// Existing theme toggle (KEEP THIS)
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('zenshin-theme', newTheme);
});

// NEW LOGO SWITCHER (ADD THIS RIGHT AFTER)
const logo = document.querySelector('.logo-image');

function updateLogo() {
  logo.src = html.getAttribute('data-theme') === 'dark' 
    ? logo.dataset.darkSrc 
    : logo.dataset.lightSrc;
}

// Initialize logo on load AND theme change
updateLogo();
themeToggle.addEventListener('click', updateLogo);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        menuToggle.textContent = mobileMenu.classList.contains('open') ? 'Close' : 'Menu';
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    menuToggle.textContent = 'Menu';
                }
            }
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll Animation
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading (replace with actual loading logic)
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.remove();
        }, 600);
    }, 1500);
    
    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.btn-quickview');
    const quickViewModal = document.querySelector('.quickview-modal');
    const modalClose = document.querySelector('.modal-close');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // In a real implementation, you would load product data here
            const productCard = button.closest('.product-card');
            const productImage = productCard.querySelector('img').src;
            const productTitle = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productDesc = productCard.querySelector('.product-desc').textContent;
            
            // Populate modal
            const modalGallery = quickViewModal.querySelector('.modal-gallery');
            modalGallery.innerHTML = `
                <img src="${productImage}" alt="${productTitle}">
            `;
            
            const modalInfo = quickViewModal.querySelector('.modal-info');
            modalInfo.innerHTML = `
                <h3>${productTitle}</h3>
                <p class="product-price">${productPrice}</p>
                <p class="product-desc">${productDesc}</p>
                <p>This piece features subtle design elements inspired by classic anime, visible only to those who know where to look. The premium materials and construction ensure lasting quality.</p>
                <div class="size-selector">
                    <label>Size</label>
                    <select>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                </div>
                <button class="btn-addtocart">Add to Cart</button>
            `;
            
            quickViewModal.classList.add('active');
        });
    });
    
    modalClose.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
    });
    
    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            quickViewModal.classList.remove('active');
        }
    });
    
    // Easter Egg (Konami Code)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Trigger easter egg
                const easterEgg = document.createElement('div');
                easterEgg.className = 'easter-egg';
                easterEgg.innerHTML = '🎌';
                document.body.appendChild(easterEgg);
                
                setTimeout(() => {
                    easterEgg.remove();
                }, 5000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
