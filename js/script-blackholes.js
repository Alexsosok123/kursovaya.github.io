
(function addSectionAnimStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .section-hidden { opacity: 0; transform: translateY(60px) scale(.97); transition: all .7s cubic-bezier(.4,1.6,.6,1); }
    .section-visible { opacity: 1; transform: none; }
    .card-zoom { box-shadow: 0 8px 32px #0002, 0 1.5px 8px #1a1a2a22; transform: scale(1.045); transition: box-shadow .25s, transform .25s; z-index: 2; }
    .card-news { transition: box-shadow .25s, transform .25s; }
    `;
    document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', function () {

    const blackHoleDetails = {
        'Сверхмассивная чёрная дыра': {
            title: 'Сверхмассивная чёрная дыра',
            img: '../img/blackhole.jpg',
            text: '<b>Находятся в центрах большинства галактик, включая Млечный Путь.</b><br>Масса: миллионы–миллиарды масс Солнца.'
        },
        'Звёздная чёрная дыра': {
            title: 'Звёздная чёрная дыра',
            img: '../img/505616_O.jpg',
            text: '<b>Образуются из коллапса массивных звезд в конце их жизненного цикла.</b><br>Масса: 3–100 масс Солнца.'
        },
        'Промежуточная чёрная дыра': {
            title: 'Промежуточная чёрная дыра',
            img: '../img/1487473784_0_594_2550_2507_1920x0_80_0_0_0dbdaa460f3b610f23898c525e2fe055.jpg',
            text: '<b>Новый класс чёрных дыр с массой от сотен до тысяч солнечных масс.</b><br>Могут образовываться в результате слияния звёздных чёрных дыр.'
        },
        'Первичная чёрная дыра': {
            title: 'Первичная чёрная дыра',
            img: '../img/23423423.jpg',
            text: '<b>Гипотетические чёрные дыры, которые могли образоваться в ранней Вселенной.</b><br>Образовались вскоре после Большого взрыва, а не из звёзд.'
        }
    };

    let lastFocused = null;
    function createModal({ title, img, text }) {
        const old = document.querySelector('.modal-bg');
        if (old) old.remove();
        const modalBg = document.createElement('div');
        modalBg.className = 'modal-bg';
        modalBg.innerHTML = `
            <div class="modal-window" tabindex="-1" role="dialog" aria-modal="true">
                <button class="modal-close" aria-label="Закрыть окно">×</button>
                <img src="${img}" alt="${title}" class="modal-img">
                <h3>${title}</h3>
                <div>${text}</div>
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
            if (lastFocused) lastFocused.focus();
        }
        modalBg.addEventListener('click', e => {
            if (e.target === modalBg) close();
        });
        modalBg.querySelector('.modal-close').onclick = close;
        function escHandler(e) {
            if (e.key === 'Escape') close();
        }
        document.addEventListener('keydown', escHandler);
    }

    document.querySelectorAll('.blackhole-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            lastFocused = card;
            const key = card.querySelector('.card-news-title').textContent.trim();
            if (blackHoleDetails[key]) createModal(blackHoleDetails[key]);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                lastFocused = card;
                const key = card.querySelector('.card-news-title').textContent.trim();
                if (blackHoleDetails[key]) createModal(blackHoleDetails[key]);
            }
        });
    });

    document.querySelectorAll('section ul li b').forEach(b => {
        if (!b.closest('.card-news')) {
            const name = b.textContent.trim();
            if (blackHoleDetails[name]) {
                b.style.textDecoration = 'underline dotted';
                b.style.cursor = 'pointer';
                b.setAttribute('tabindex', '0');
                b.addEventListener('click', () => createModal(blackHoleDetails[name]));
                b.addEventListener('keydown', e => {
                    if (e.key === 'Enter' || e.key === ' ') createModal(blackHoleDetails[name]);
                });
            }
        }
    });

    (function addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
        .modal-bg { position: fixed; z-index: 1000; inset: 0; background: rgba(0,0,0,0.88); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity .2s; }
        .modal-bg.open { opacity: 1; pointer-events: all; }
        .modal-window { background: #fff; color: #181c24; border-radius: 18px; box-shadow: 0 4px 32px #000a; padding: 32px 32px 24px; max-width: 480px; width: 92vw; position: relative; outline: none; animation: modalIn .22s cubic-bezier(.4,1.6,.6,1); }
        .modal-close { position: absolute; top: 16px; right: 20px; background: none; border: none; color: #222; font-size: 2rem; cursor: pointer; opacity: .7; transition: opacity .2s; }
        .modal-close:hover { opacity: 1; }
        .modal-img { width: 100%; border-radius: 10px; margin-bottom: 18px; background: #f7f7fa; }
        .modal-window h3 { margin: 18px 0 10px 0; font-size: 1.35rem; font-weight: 700; text-align: center; color: #181c24; }
        .modal-window div { margin: 0 0 10px 0; font-size: 1.08rem; line-height: 1.6; text-align: left; }
        @keyframes modalIn { from { transform: translateY(40px) scale(.95); opacity: 0; } to { transform: none; opacity: 1; } }
        `;
        document.head.appendChild(style);
    })();
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
    document.querySelectorAll('.card-news').forEach(card => {
        card.style.background = '#000';
        card.style.color = '#fff';
    });
    document.querySelectorAll('.card-news-content').forEach(content => {
        content.style.background = 'transparent';
        content.style.borderRadius = '0 0 14px 14px';
        content.style.paddingTop = '16px';
        content.style.paddingBottom = '12px';
    });
    document.querySelectorAll('.card-news-title').forEach(el => {
        el.style.color = '#fff';
    });
    document.querySelectorAll('.card-news-desc').forEach(el => {
        el.style.color = '#ccc';
        el.parentElement.style.margin = '0 0 10px 0';
    });

    document.querySelectorAll('.card-news img').forEach(img => {
        img.style.background = '#000';
    });

    var video = document.getElementById('bg-video');
    if (video) {
        var source = document.createElement('source');
        source.src = '../img/aaa.mp4';
        source.type = 'video/mp4';
        video.appendChild(source);
    }
});