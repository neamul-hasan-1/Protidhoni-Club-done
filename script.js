  // Image Slider Functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            document.querySelector('.slider').style.transform = `translateX(-${index * 100}%)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Initialize dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Auto slide
        setInterval(nextSlide, 3000);
        
        // Scroll to top button
        const scrollBtn = document.querySelector('.scroll-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Fade-in animation on scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
        // Header scroll behavior - only show at top
        const header = document.getElementById('mainHeader');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop === 0) {
                // At top - show header
                header.classList.remove('header-hidden');
            } else if (scrollTop > 100) {
                // Scrolled down - hide header
                header.classList.add('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Product Modal Functionality
        const modal = document.getElementById("productModal");
        const comingSoonButtons = document.querySelectorAll(".coming-soon");
        const closeBtn = document.querySelector(".close-btn");
        
        // Open modal when Coming Soon button is clicked
        comingSoonButtons.forEach(button => {
            button.addEventListener('click', () => {
                modal.style.display = "flex";
            });
        });
        
        // Close modal when close button is clicked
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
        
        // Close modal when clicking outside of it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
        
        // Reorder members based on position
        document.addEventListener('DOMContentLoaded', function() {
            const membersGrid = document.querySelector('.members-grid');
            const memberCards = Array.from(membersGrid.children);
            
            // Create an array of positions in hierarchical order
            const positionOrder = [
                "সহ সভাপতি",
                "যুগ্ম সা:সম্পাদক",
                "সাংগঠনিক সম্পাদক",
                "যুগ্ম সাধারণ সম্পাদক",
                "যুগ্ম সাং: সম্পাদক",
                "সদস্য",
                "সমাজ কল্যাণ বি: সম্পাদক",
                "সাংস্কৃতিক বি: সম্পাদক",
                "স্বাস্থ্য বিষয়ক সম্পাদক",
                "প্রচার সম্পাদক",
                "যুগ্ম সাংগঠনিক সম্পাদক",
                "শিক্ষা সম্পাদক",
                "ধর্ম বিষয়ক সম্পাদক",
                "যুগ্ম ধর্ম বিষয়ক সম্পাদক",
                "যুগ্ম স্বাস্থ্য বিষয়ক সম্পাদক",
                "যুগ্ম সমাজ কল্যাণ বি সম্পাদক",
                "যুগ্ম শিক্ষা বি: সম্পাদক",
                "ভারপ্রাপ্ত কোষাধক্ষ",
                "ভারপ্রাপ্ত সাধারণ সম্পাদক",
                "যুগ্ম শিক্ষা সম্পাদক",
                "যুগ্ম দপ্তর সম্পাদক",
                "দপ্তর সম্পাদক",
                "যুগ্ম সাংস্কৃতিক বি: সম্পাদক",
                "যুগ্ম প্রচার সম্পাদক",
                "যুগ্ম দপ্তর সম্পাদক"
            ];
            
            // Sort member cards based on position order
            memberCards.sort((a, b) => {
                const positionA = a.querySelector('.member-position').textContent.split(': ')[1];
                const positionB = b.querySelector('.member-position').textContent.split(': ')[1];
                
                const indexA = positionOrder.indexOf(positionA);
                const indexB = positionOrder.indexOf(positionB);
                
                return indexA - indexB;
            });
            
            // Clear the grid and append sorted cards
            membersGrid.innerHTML = '';
            memberCards.forEach(card => membersGrid.appendChild(card));
        });
        
        // Lazy Loading for Images
        document.addEventListener('DOMContentLoaded', function() {
            const lazyImages = document.querySelectorAll('img.lazy');
            
            const lazyLoad = function() {
                lazyImages.forEach(img => {
                    if (img.getAttribute('data-src') && img.getBoundingClientRect().top <= window.innerHeight + 100 && img.getBoundingClientRect().bottom >= 0) {
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        img.onload = function() {
                            img.classList.remove('lazy');
                        };
                    }
                });
            };
            
            // Initial load
            lazyLoad();
            
            // Load images on scroll
            window.addEventListener('scroll', lazyLoad);
            
            // Load images on resize
            window.addEventListener('resize', lazyLoad);
        });
