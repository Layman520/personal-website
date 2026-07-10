// ========================================
// 导航栏滚动效果
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// ========================================
// 移动端菜单切换
// ========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ========================================
// 平滑滚动
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (menuToggle) menuToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// ========================================
// 导航高亮
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 120;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// 表单提交
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const btn = this.querySelector('.btn-primary');
        const orig = btn.innerHTML;
        btn.innerHTML = '发送中...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('感谢你的留言，' + name + '！我会尽快回复你。');
            this.reset();
            btn.innerHTML = orig;
            btn.disabled = false;
        }, 800);
    });
}

// ========================================
// 滚动动画
// ========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ========================================
// 统计数字动画
// ========================================
function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const inc = target / (duration / 16);
    const timer = setInterval(() => {
        start += inc;
        if (start >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(stat => {
                const num = parseInt(stat.textContent);
                if (!isNaN(num)) animateCounter(stat, num);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.stats');
if (statsEl) statsObserver.observe(statsEl);

// ========================================
// Hero 视差
// ========================================
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const content = hero.querySelector('.hero-content');
        if (content) {
            const scrolled = window.pageYOffset;
            content.style.transform = `translateY(${scrolled * 0.25}px)`;
            content.style.opacity = 1 - (scrolled / 700);
        }
    }
});

// ========================================
// 视频相关功能
// ========================================

// 悬停自动播放小视频
document.querySelectorAll('.video-card video').forEach(video => {
    video.parentElement.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
    });
    video.parentElement.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// 点击播放按钮切换视频
function toggleVideo(btn) {
    const card = btn.closest('.video-card');
    const video = card.querySelector('video');
    
    if (video.paused) {
        video.play().catch(() => {});
        btn.style.opacity = '0';
    } else {
        video.pause();
        btn.style.opacity = '1';
    }
}

// 打开视频模态框
function openVideoModal(card) {
    const video = card.querySelector('video source');
    const title = card.querySelector('.video-overlay h4').textContent;
    
    if (!video) return;
    
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalVideoTitle');
    
    modalVideo.src = video.src;
    modalTitle.textContent = title;
    modal.classList.add('active');
    modalVideo.play().catch(() => {});
    
    document.body.style.overflow = 'hidden';
}

// 关闭视频模态框
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modalVideo.pause();
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ESC 键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideoModal();
});

// 点击背景关闭
document.getElementById('videoModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeVideoModal();
});

// ========================================
// 页面加载
// ========================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
    updateActiveNavLink();
});

