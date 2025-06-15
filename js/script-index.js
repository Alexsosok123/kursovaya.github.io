
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('bg-video');
    var source = document.createElement('source');
    source.src = 'img/vlhlll.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
});

document.addEventListener('DOMContentLoaded', function () {
    const animatedSections = document.querySelectorAll('main section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.15 });
    animatedSections.forEach(sec => {
        sec.classList.add('section-hidden');
        observer.observe(sec);
    });
    document.querySelectorAll('.card-news').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('card-zoom'));
        card.addEventListener('mouseleave', () => card.classList.remove('card-zoom'));
    });
    document.querySelectorAll('.gallery-cards img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.onclick = function () {
            const old = document.querySelector('.modal-bg');
            if (old) old.remove();
            const modalBg = document.createElement('div');
            modalBg.className = 'modal-bg';
            modalBg.innerHTML = `
                <div class="modal-window modal-gallery" tabindex="-1" role="dialog" aria-modal="true">
                    <button class="modal-close" aria-label="Закрыть окно">×</button>
                    <img src="${img.src}" alt="${img.alt || ''}" class="modal-img-gallery">
                </div>
            `;
            document.body.appendChild(modalBg);
            setTimeout(() => modalBg.classList.add('open'), 10);
            const dialog = modalBg.querySelector('.modal-window');
            dialog.focus();
            function close() {
                modalBg.classList.remove('open');
                setTimeout(() => modalBg.remove(), 200);
                document.removeEventListener('keydown', escHandler);
            }
            modalBg.addEventListener('click', e => {
                if (e.target === modalBg) close();
            });
            modalBg.querySelector('.modal-close').onclick = close;
            function escHandler(e) {
                if (e.key === 'Escape') close();
            }
            document.addEventListener('keydown', escHandler);
        };
    });
    const year = new Date().getFullYear();
    document.querySelector('footer p').innerHTML = `&copy; ${year} Космические тела`;
});

document.querySelectorAll('.site-map-card').forEach(card => {
    card.style.background = '#000';
    card.style.color = '#fff';
});
document.querySelectorAll('.site-map-title').forEach(el => {
    el.style.color = '#181c24';
    el.parentElement.style.background = '#fff';
    el.parentElement.style.borderRadius = '0 0 14px 14px';
    el.parentElement.style.paddingTop = '12px';
    el.parentElement.style.paddingBottom = '10px';
});
document.querySelectorAll('.site-map-desc').forEach(el => {
    el.style.color = '#222';
    el.parentElement.style.background = '#fff';
    el.parentElement.style.borderRadius = '12px';
    el.parentElement.style.paddingTop = '12px';
    el.parentElement.style.paddingBottom = '10px';
    el.parentElement.style.margin = '8px 12px 12px 12px';
});
document.querySelectorAll('.site-map-card img').forEach(img => {
    img.style.background = '#000';
});

(function addIndexStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .section-hidden { opacity: 0; transform: translateY(60px) scale(.97); transition: all .7s cubic-bezier(.4,1.6,.6,1); }
    .section-visible { opacity: 1; transform: none; }
    .card-zoom { box-shadow: 0 8px 32px #0002, 0 1.5px 8px #1a1a2a22; transform: scale(1.045); transition: box-shadow .25s, transform .25s; z-index: 2; }
    .card-news { transition: box-shadow .25s, transform .25s; }
    .modal-bg { position: fixed; z-index: 2000; inset: 0; background: rgba(0,0,0,0.88); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity .2s; }
    .modal-bg.open { opacity: 1; pointer-events: all; }
    .modal-window { background: #fff; border-radius: 18px; box-shadow: 0 4px 32px #000a; max-width: 700px; width: 92vw; position: relative; outline: none; animation: modalIn .22s cubic-bezier(.4,1.6,.6,1); }
    .modal-gallery { padding: 0; background: #181c24; box-shadow: 0 8px 48px #000a; max-width: 600px; width: 96vw; display: flex; flex-direction: column; align-items: center; }
    .modal-img-gallery { width: 100%; max-width: 600px; max-height: 70vh; border-radius: 18px; display: block; background: #222; }
    .modal-close { position: absolute; top: 10px; right: 18px; background: none; border: none; color: #fff; font-size: 2.2rem; cursor: pointer; opacity: .7; transition: opacity .2s; z-index: 2; }
    .modal-close:hover { opacity: 1; }
    @keyframes modalIn { from { transform: translateY(40px) scale(.95); opacity: 0; } to { transform: none; opacity: 1; } }
    `;
    document.head.appendChild(style);
})();


document.querySelectorAll('.card-news').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('card-zoom'));
    card.addEventListener('mouseleave', () => card.classList.remove('card-zoom'));
});

document.querySelectorAll('.card-news').forEach(card => {
    card.style.background = '#000';
    card.style.color = '#fff';
});
document.querySelectorAll('.card-news-title').forEach(el => {
    el.style.color = '#181c24';
    el.parentElement.style.background = '#fff';
    el.parentElement.style.borderRadius = '0 0 14px 14px';
    el.parentElement.style.paddingTop = '12px';
    el.parentElement.style.paddingBottom = '10px';
});
document.querySelectorAll('.card-news-desc').forEach(el => {
    el.style.color = '#222';
    el.parentElement.style.background = '#fff';
    el.parentElement.style.borderRadius = '11px';
    el.parentElement.style.paddingTop = '13px';
    el.parentElement.style.paddingBottom = '10px';
    el.parentElement.style.margin = '12px';
});

document.querySelectorAll('.card-news img').forEach(img => {
    img.style.background = '#000';
});
