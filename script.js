 // Menu opening/closing functions
        function openNav() {
            document.getElementById("mySidebar").style.width = "250px";
            document.body.style.overflow = "hidden"; // Prevent scrolling when sidebar is open
        }

        function closeNav() {
            document.getElementById("mySidebar").style.width = "0";
            document.body.style.overflow = "auto"; // Re-enable scrolling
        }

        // Close sidebar when clicking outside
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('mySidebar');
            const menuIcon = document.querySelector('.menu-icon');
            
            if (sidebar.style.width === '250px' && 
                !sidebar.contains(event.target) && 
                !menuIcon.contains(event.target)) {
                closeNav();
            }
        });

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
        
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // শুধুমাত্র শীর্ষে (স্ক্রল পজিশন 0) হলে হেডার দেখাবে
            if (scrollTop === 0) {
                header.classList.remove('header-hidden');
            } else {
                header.classList.add('header-hidden');
            }
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

        // Image Modal Functionality
        const imageModal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        
        function openImageModal(src) {
            modalImg.src = src;
            imageModal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        }
        
        function closeImageModal() {
            imageModal.style.display = "none";
            document.body.style.overflow = "auto"; // Re-enable scrolling
        }
        
        // Close modal when clicking outside the image
        imageModal.addEventListener('click', function(event) {
            if (event.target === imageModal) {
                closeImageModal();
            }
        });
        
        // Add click event to all images to open in modal
        document.querySelectorAll('.leader-image img, .member-image img, .product-image img, .developer-image img').forEach(img => {
            img.addEventListener('click', function() {
                openImageModal(this.src);
            });
        });
        
        // Add hover animations to cards
        document.querySelectorAll('.leader-card, .member-card, .product-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
