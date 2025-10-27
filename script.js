document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const ageGate = document.getElementById('age-gate');
    const ageConfirmButton = document.getElementById('age-confirm');
    const body = document.body;

    if (sessionStorage.getItem('ageVerified') === 'true') {
        if (ageGate) {
            ageGate.classList.add('hidden');
        }
        body.style.overflow = 'auto';
    } else {
        if (ageGate) {
            body.style.overflow = 'hidden';
        }
    }

    if (ageConfirmButton) {
        ageConfirmButton.addEventListener('click', () => {
            sessionStorage.setItem('ageVerified', 'true');
            if (ageGate) {
                ageGate.classList.add('hidden');
            }
            body.style.overflow = 'auto';
        });
    }
    
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileCloseButton = document.getElementById('mobile-close-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileCloseButton && mobileMenu) {
        const mobileNavLinks = mobileMenu.querySelectorAll('a');

        const toggleMenu = () => {
            mobileMenu.classList.toggle('hidden');
            body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
        };

        mobileMenuButton.addEventListener('click', toggleMenu);
        mobileCloseButton.addEventListener('click', toggleMenu);
        mobileNavLinks.forEach(link => {
            if (!link.href.includes('#')) {

                link.addEventListener('click', toggleMenu);
            }
        });
    }

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    scrollRevealElements.forEach(el => {
        revealObserver.observe(el);
    });


    const strainCards = document.querySelectorAll('.strain-card');
    if (strainCards.length > 0) {
        const strainsData = [
            { name: 'Cyber Haze', prices: { gram: 16, eighth: 50, quarter: 90, half: 160, ounce: 300 } },
            { name: 'Glitch Garden', prices: { gram: 15, eighth: 45, quarter: 80, half: 150, ounce: 280 } },
            { name: 'Neon Supernova', prices: { gram: 18, eighth: 55, quarter: 100, half: 180, ounce: 340 } },
            { name: 'Quantum Kush', prices: { gram: 17, eighth: 52, quarter: 95, half: 170, ounce: 320 } },
            { name: 'Synthwave Sunset', prices: { gram: 15, eighth: 45, quarter: 85, half: 155, ounce: 290 } },
            { name: 'Data-Mined Diesel', prices: { gram: 16, eighth: 50, quarter: 90, half: 165, ounce: 310 } },
        ];

        strainCards.forEach(card => {
            const strainIndex = card.dataset.strainIndex;
            if (strainIndex === undefined) return;

            const strain = strainsData[strainIndex];
            if (!strain) return;

            const select = card.querySelector('select');
            const priceDisplay = card.querySelector('.price-display');

            const updatePrice = () => {
                if (select && priceDisplay) {
                    const selectedWeight = select.value;
                    const price = strain.prices[selectedWeight];
                    priceDisplay.textContent = `$${price}`;
                }
            };

            if(select) {
                select.addEventListener('change', updatePrice);
            }
            
            updatePrice();
        });
    }
});
