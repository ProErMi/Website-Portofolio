const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

function toggleMenu(open) {
    menu.classList.toggle('hidden', !open);
    menu.classList.toggle('flex', open);
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle("hidden", !open);
    btn.setAttribute('aria-expanded', open);

}

btn.addEventListener('click', () => toggleMenu(menu.classList.contains('hidden')));
menu.querySelectorAll('a').forEach(a => a.addEventListener("click", () => toggleMenu(false)));

function kirimPesan(e){
    e.preventDefault();
    const f=e.target;
    const subject=encodeURIComponent('Pesan dari '+f.nama.value.trim());
    const body=encodeURIComponent('Nama: '+f.nama.value.trim()+'\nEmail: '+f.email.value.trim()+'\n\n'+f.pesan.value.trim());
    window.location.href='mailto:nursyauqi87@gmail.com?subject='+subject+'&body='+body;
}

// Animated
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
        const done = { clearProps: 'opacity,transform' };
        const lock = (sel) => gsap.utils.toArray(sel).forEach((e) => e.classList.add('is-animating'));
        const unlock = (sel) => () => gsap.utils.toArray(sel).forEach((e) => e.classList.remove('is-animating'));
        lock('#home a, #contact a.flex, #form-kontak a, #form-kontak button, footer a');
        /* ---------- Progress bar scroll ---------- */
        gsap.set('#progress', { scaleX: 0 });
        gsap.to('#progress', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
        });

        /* ---------- Intro: Navbar + Hero ---------- */
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('header nav', { yPercent: -100, opacity: 0, duration: 0.7, ...done })
        .from('#home h1', { y: 40, opacity: 0, duration: 0.8, ...done }, '-=0.3')
        .from('#home p', { y: 24, opacity: 0, duration: 0.6, ...done }, '-=0.5')
        .from('#home a', { y: 20, opacity: 0, stagger: 0.12, duration: 0.5, ...done }, '-=0.4')
        .from('#home figure', { scale: 0.7, rotation: -8, opacity: 0, duration: 1, ease: 'back.out(1.6)', ...done }, '-=1')
        .from('#home .star', { scale: 0, rotation: -90, duration: 0.7, ease: 'back.out(2)', stagger: 0.15 }, '-=0.5')
        .add(() => {
            unlock('#home a')();
            // Foto hero melayang pelan terus-menerus
            gsap.to('#home figure', { y: -10, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
            floatStars('#home .star');
        });

        /* ---------- Bintang melayang & berputar ---------- */
        function floatStars(selector) {
        gsap.utils.toArray(selector).forEach((el, i) => {
            gsap.to(el, {
            y: i % 2 ? 9 : -9, rotation: i % 2 ? -14 : 14,
            duration: 2 + i * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut'
            });
        });
        }
        floatStars('#about .star, #contact .star');
    
        /* ---------- Helper reveal saat scroll ---------- */
        const reveal = (targets, trigger, vars = {}) =>
        gsap.from(targets, {
            opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', stagger: 0.12, ...done,
            scrollTrigger: { trigger, start: 'top 85%', toggleActions: 'play none none none' },
            ...vars
        });
    
        /* ---------- Strip tools ---------- */
        reveal('.bg-ink.py-4 li', '.bg-ink.py-4', { y: 30, stagger: 0.08, duration: 0.5 });
    
        /* ---------- About ---------- */
        reveal('#about h2', '#about', { y: 0, x: -40 });
        reveal('#about .grid-cols-3 > div', '#about .grid-cols-3', { y: 30, duration: 0.6 });
        gsap.from('[data-anim="about-fig"]', {
        x: -80, rotation: -6, opacity: 0, duration: 1, ease: 'back.out(1.4)', ...done,
        scrollTrigger: { trigger: '[data-anim="about-fig"]', start: 'top 85%' }
        });
        reveal('#about p.font-semibold', '#about dl', { y: 0, x: 60, stagger: 0 });
        reveal('#about dl > *', '#about dl', { y: 20, stagger: 0.06, duration: 0.5 });
    
        // Hitung naik angka statistik (10+, 5, 2026)
        document.querySelectorAll('[data-count]').forEach((el) => {
        const end = +el.dataset.count, from = +(el.dataset.from || 0), suffix = el.dataset.suffix || '';
        const o = { v: from };
        el.textContent = from + suffix;
        gsap.to(o, {
            v: end, duration: 1.8, ease: 'power1.out',
            onUpdate: () => (el.textContent = Math.round(o.v) + suffix),
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
        });
    
        /* ---------- What I Can Do ---------- */
        reveal('#skills h2', '#skills', { y: 0, x: 0, scale: 0.8, duration: 0.7 });
        reveal('#skills article', '#skills .grid', { y: 90, rotation: (i) => (i % 2 ? 3 : -3), stagger: 0.18, duration: 0.9 });
        gsap.from('#skills article > span:first-child', {
        scale: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)', stagger: 0.18, delay: 0.35,
        scrollTrigger: { trigger: '#skills .grid', start: 'top 85%' }
        });
        gsap.from('#skills article p span', {
        scale: 0.6, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(2)', delay: 0.6,
        scrollTrigger: { trigger: '#skills .grid', start: 'top 85%' }
        });
    
        /* ---------- Achievement ---------- */
        reveal('#project h2', '#project', { y: 0, scale: 0.8, duration: 0.7 });
        reveal('#project article', '#project .grid', { y: 70, rotation: (i) => (i % 2 ? 2 : -2), stagger: 0.18, duration: 0.8 });
    
        /* ---------- Contact ---------- */
        gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: unlock('#contact a.flex, #form-kontak a, #form-kontak button'),
        scrollTrigger: { trigger: '#contact', start: 'top 70%' }
        })
        .from('#contact > div', { y: 60, scale: 0.95, opacity: 0, duration: 0.8, ...done })
        .from('#contact h2, #contact > div > p', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ...done }, '-=0.3')
        .from('#contact a.flex', { y: 30, opacity: 0, stagger: 0.12, duration: 0.5, ...done }, '-=0.2')
        .from('#form-kontak > *', { y: 20, opacity: 0, stagger: 0.08, duration: 0.45, ...done }, '-=0.2');
    
        /* ---------- Footer + tombol kopi ---------- */
        gsap.from('footer > *', {
        y: 20, opacity: 0, stagger: 0.12, duration: 0.6, ...done,
        onComplete: unlock('footer a'),
        scrollTrigger: { trigger: 'footer', start: 'top 95%' }
        });
        // Cangkir kopi bergoyang tiap beberapa detik
        gsap.timeline({ repeat: -1, repeatDelay: 2.5 })
        .to('footer a svg', { rotation: -14, duration: 0.1, transformOrigin: '50% 80%' })
        .to('footer a svg', { rotation: 14, duration: 0.2, repeat: 3, yoyo: true })
        .to('footer a svg', { rotation: 0, duration: 0.1 });
    
        window.addEventListener('load', () => ScrollTrigger.refresh());
    });
})();