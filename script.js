/* ============================================
   PORTFOLIO - Sacha Sitbon
   JavaScript - Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. CUSTOM CURSOR
    // ==========================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth ring follow using requestAnimationFrame
    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .stat-card, .contact-card, .btn-neon, .nav-hamburger');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hovering');
            cursorRing.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hovering');
            cursorRing.classList.remove('hovering');
        });
    });

    // ==========================================
    // 2. CODE RAIN BACKGROUND
    // ==========================================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    const chars = '{}();=>/<>const let var function return if else for while import export class def int void char #include printf std::'.split('');
    const columns = [];
    const FONT_SIZE = 13;
    let columnCount;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columnCount = Math.floor(canvas.width / (FONT_SIZE * 1.8));
        columns.length = 0;
        for (let i = 0; i < columnCount; i++) {
            columns.push({
                x: i * (FONT_SIZE * 1.8) + FONT_SIZE,
                y: Math.random() * canvas.height * -1,
                speed: 0.15 + Math.random() * 0.35,
                opacity: 0.03 + Math.random() * 0.05,
                char: chars[Math.floor(Math.random() * chars.length)],
                switchInterval: 60 + Math.floor(Math.random() * 120),
                frame: 0
            });
        }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function animateCodeRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${FONT_SIZE}px "Fira Code", monospace`;

        columns.forEach(col => {
            col.frame++;
            if (col.frame % col.switchInterval === 0) {
                col.char = chars[Math.floor(Math.random() * chars.length)];
            }

            ctx.fillStyle = `rgba(0, 240, 255, ${col.opacity})`;
            ctx.fillText(col.char, col.x, col.y);

            col.y += col.speed;
            if (col.y > canvas.height + 20) {
                col.y = -20;
                col.char = chars[Math.floor(Math.random() * chars.length)];
            }
        });

        requestAnimationFrame(animateCodeRain);
    }
    animateCodeRain();

    // ==========================================
    // 2b. FLOATING CODE SYMBOLS
    // ==========================================
    const symbols = ['{ }', '< />', '( )', '[ ]', '&&', '||', '=>', '::',  '/*', '*/', '#!/', '0x'];
    const floatingContainer = document.createElement('div');
    floatingContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;overflow:hidden;';
    document.body.prepend(floatingContainer);

    for (let i = 0; i < 10; i++) {
        const el = document.createElement('span');
        const dur = 15 + Math.random() * 25;
        const startX = Math.random() * 100;
        const drift = -30 + Math.random() * 60;
        const size = 0.7 + Math.random() * 0.6;
        const delay = Math.random() * -dur;
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.cssText = `
            position:absolute;
            bottom:-30px;
            left:${startX}%;
            font-family:'Fira Code',monospace;
            font-size:${size}rem;
            color:rgba(0,240,255,0.06);
            animation:symbol-rise ${dur}s linear ${delay}s infinite;
            --drift:${drift}px;
        `;
        floatingContainer.appendChild(el);
    }

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes symbol-rise {
            0% { transform:translateY(0) translateX(0) rotate(0deg); opacity:0; }
            10% { opacity:1; }
            90% { opacity:1; }
            100% { transform:translateY(calc(-100vh - 60px)) translateX(var(--drift)) rotate(20deg); opacity:0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // ==========================================
    // 3. TYPEWRITER EFFECT
    // ==========================================
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'EPITA Student',
        'Developer',
        'AI Enthusiast',
        'Systems Programmer',
        'Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typeWriter, typeSpeed);
    }
    typeWriter();

    // ==========================================
    // 4. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.getElementById('scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Fade out scroll indicator
        if (scrollIndicator) {
            scrollIndicator.style.opacity = Math.max(0, 1 - scrollY / 300);
        }
    });

    // ==========================================
    // 5. MOBILE MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ==========================================
    // 6. AOS (Animate On Scroll) Init
    // ==========================================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: 'mobile'
    });

    // ==========================================
    // 7. COUNTER ANIMATION (About Stats)
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * countTo);
                    target.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = countTo;
                    }
                }

                requestAnimationFrame(updateCount);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // ==========================================
    // 9. PROJECT CARD 3D TILT EFFECT
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const inner = card.querySelector('.project-card-inner');
        const glow = card.querySelector('.project-card-glow');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;

            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

            // Move glow with cursor
            if (glow) {
                glow.style.left = (x - rect.width) + 'px';
                glow.style.top = (y - rect.height) + 'px';
            }
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            inner.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            inner.style.transition = 'none';
        });
    });

    // ==========================================
    // 8. SMOOTH SCROLL FOR NAV LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 12. ACTIVE NAV LINK HIGHLIGHT
    // ==========================================
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--cyan)';
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // ==========================================
    // 13. CONTACT CARD HOVER GLOW FOLLOW
    // ==========================================
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.06), var(--bg-card) 60%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ==========================================
    // 14. PAGE LOAD ANIMATION
    // ==========================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

});
