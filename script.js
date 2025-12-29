// ===== Smart Power Website JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbarScroll();
    initSmoothScroll();
    initScrollReveal();
    initMobileMenu();
    initDownloadButton();
    initAnimatedCounters();
    initTypingEffect();
    initCursorGlow();
    initCardTilt();
    initScrollProgress();
    initMagneticButtons();
    initRippleEffect();
});

// ===== Particle System =====
function initParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        const hue = Math.random() > 0.5 ? '234' : '186';
        p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-delay:${Math.random() * 15}s;animation-duration:${Math.random() * 10 + 10}s;background:hsl(${hue},85%,65%);box-shadow:0 0 ${size * 2}px hsl(${hue},85%,65%)`;
        container.appendChild(p);
    }
}

// ===== Navbar Scroll =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ===== Scroll Reveal =====
function initScrollReveal() {
    const els = document.querySelectorAll('.feature-card,.step-card,.section-header,.download-card');
    els.forEach(el => el.classList.add('reveal'));
    const reveal = () => {
        els.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        nav.style.cssText = nav.classList.toggle('active') ?
            'display:flex;flex-direction:column;position:absolute;top:var(--nav-height);left:0;right:0;background:rgba(10,10,15,0.98);backdrop-filter:blur(20px);padding:20px;border-bottom:1px solid var(--glass-border);gap:15px' : '';
    });
}

// ===== Download Button =====
function initDownloadButton() {
    document.querySelectorAll('.btn-download,.btn-download-alt').forEach(btn => {
        btn.addEventListener('click', function () {
            const n = document.createElement('div');
            n.innerHTML = '<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#6366f1,#22d3ee);border-radius:50%;font-size:1.2rem">✓</div><div><strong style="display:block;margin-bottom:4px">Download starting...</strong><p style="margin:0;font-size:0.9rem;opacity:0.7">Your download will begin shortly!</p></div>';
            n.style.cssText = 'position:fixed;bottom:30px;right:30px;display:flex;align-items:center;gap:16px;padding:20px 24px;background:rgba(20,20,35,0.95);backdrop-filter:blur(20px);border:1px solid rgba(99,102,241,0.3);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.4);z-index:9999;transform:translateX(0);transition:transform 0.4s ease';
            document.body.appendChild(n);
            setTimeout(() => { n.style.transform = 'translateX(150%)'; setTimeout(() => n.remove(), 400); }, 3000);
        });
    });
}

// ===== Animated Stat Counters =====
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-value');
    const animateCounter = (el) => {
        const text = el.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const hasSlash = text.includes('/');

        // Handle special formats like "24/7"
        if (hasSlash) {
            el.style.opacity = '1';
            return;
        }

        const target = parseInt(text.replace(/[^0-9]/g, ''));
        if (isNaN(target)) return;

        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            let display = Math.floor(current);
            if (hasPercent) display += '%';
            if (hasPlus) display += '+';
            el.textContent = display;
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===== Typing Effect =====
function initTypingEffect() {
    const heroDesc = document.querySelector('.hero-description');
    if (!heroDesc) return;

    const text = heroDesc.textContent;
    heroDesc.textContent = '';
    heroDesc.style.opacity = '1';

    let i = 0;
    const speed = 20;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const type = () => {
                    if (i < text.length) {
                        heroDesc.textContent += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    }
                };
                type();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(heroDesc);
}

// ===== Cursor Glow Effect =====
function initCursorGlow() {
    // Create cursor glow element
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    // Create inner cursor
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth glow follow
    const animateGlow = () => {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    };
    animateGlow();

    // Expand on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .step-card, .device-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.classList.add('expanded');
            cursorDot.classList.add('hidden');
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('expanded');
            cursorDot.classList.remove('hidden');
        });
    });
}

// ===== 3D Card Tilt Effect =====
function initCardTilt() {
    const cards = document.querySelectorAll('.feature-card, .step-card, .device-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ===== Scroll Progress Indicator =====
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== Magnetic Buttons =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-download, .nav-cta');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== Ripple Effect on Click =====
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .feature-card, .device-card');

    buttons.forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===== Parallax Effect on Scroll =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Parallax for dashboard preview
    const dashboard = document.querySelector('.dashboard-preview');
    if (dashboard) {
        const rect = dashboard.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (window.innerHeight - rect.top) * 0.05;
            dashboard.style.transform = `translateY(${yPos}px)`;
        }
    }
});

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.classList.add('party-mode');
        setTimeout(() => document.body.classList.remove('party-mode'), 5000);
    }
});

console.log('⚡ SmartPower Website Loaded with Enhanced Interactivity');
