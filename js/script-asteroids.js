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
    const asteroids = {
        ceres: {
            title: 'Церера',
            img: '../img/Ceresintruecolor.png',
            text: 'Крупнейший астероид и карликовая планета в поясе астероидов. Диаметр: 940 км. Исследована зондом Dawn.'
        },
        vesta: {
            title: 'Веста',
            img: '../img/Vesta-snimok-kosmicheskogo-apparata-Dawn.jpg',
            text: 'Второй по размеру астероид (диаметр ~525 км), имеет дифференцированное строение. Исследована Dawn.'
        },
        pallas: {
            title: 'Паллада',
            img: '../img/images.jpg',
            text: 'Третий по массе астероид, диаметр ~512 км, орбита сильно наклонена.'
        },
        eros: {
            title: 'Эрос',
            img: '../img/eros2_near.jpg',
            text: 'Один из крупнейших околоземных астероидов (34×11 км), исследован миссией NEAR Shoemaker.'
        }
    };
    const comets = {
        halley: {
            title: 'Комета Галлея',
            img: '../img/td41yl6mvnprbe2.jpg',
            text: 'Самая известная короткопериодическая комета. Период обращения: 76 лет. Следующее появление — 2061 год.'
        },
        'hale-bopp': {
            title: 'Комета Хейла-Боппа',
            img: '../img/171405536711613588.jpg',
            text: 'Одна из самых ярких комет XX века, наблюдалась в 1997 году. Орбита — 2537 лет.'
        },
        '67p': {
            title: 'Комета Чурюмова-Герасименко',
            img: '../img/resize.webp',
            text: 'Известна миссией Rosetta (ESA). Длина ~4 км, период обращения — 6,45 года.'
        },
        neowise: {
            title: 'Комета NEOWISE',
            img: '../img/567589w_1595241829.jpg',
            text: 'Яркая комета, наблюдавшаяся в 2020 году невооружённым глазом. Период — ~6800 лет.'
        }
    };
    const structureDetails = {
        'Ядро астероида': {
            title: 'Ядро астероида',
            img: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Ceres_-_RC3_-_Haulani_Crater_%2820786245164%29_crop.jpg',
            text: 'Твёрдая каменистая или металлическая часть астероида. Может быть пористой или монолитной, иногда содержит воду и органику. Ядро определяет массу и гравитацию астероида.'
        },
        'Ядро кометы': {
            title: 'Ядро кометы',
            img: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Comet_67P_on_19_September_2014_NavCam_mosaic.jpg',
            text: 'Состоит из смеси льда, пыли и органических веществ. Имеет неправильную форму, размер — от сотен метров до десятков километров. При нагреве образует кому и хвост.'
        },
        'Кома': {
            title: 'Кома кометы',
            img: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Halley%27s_Comet_-_May_8_1910.jpg',
            text: 'Облако газа и пыли, окружающее ядро кометы при приближении к Солнцу. Может достигать десятков тысяч километров в диаметре.'
        },
        'Хвост': {
            title: 'Хвост кометы',
            img: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Comet_NEOWISE_-_2020-07-13.jpg',
            text: 'Вытягивается от Солнца под действием солнечного ветра. Бывает ионный (голубой) и пылевой (белый/жёлтый). Длина — до 100 млн км.'
        },
        'Реголит': {
            title: 'Реголит',
            img: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Eros_-_PIA02923.jpg',
            text: 'Слой пыли и мелких обломков на поверхности астероидов. Возникает из-за микрометеоритных ударов и термических процессов.'
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

    document.querySelectorAll('.asteroid-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            lastFocused = card;
            const key = card.getAttribute('data-asteroid');
            if (asteroids[key]) createModal(asteroids[key]);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                lastFocused = card;
                const key = card.getAttribute('data-asteroid');
                if (asteroids[key]) createModal(asteroids[key]);
            }
        });
    });

    document.querySelectorAll('.comet-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            lastFocused = card;
            const key = card.getAttribute('data-comet');
            if (comets[key]) createModal(comets[key]);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                lastFocused = card;
                const key = card.getAttribute('data-comet');
                if (comets[key]) createModal(comets[key]);
            }
        });
    });

    document.querySelectorAll('section ul li b').forEach(b => {
        const name = b.textContent.trim();
        if (structureDetails[name]) {
            b.style.textDecoration = 'underline dotted';
            b.style.cursor = 'pointer';
            b.setAttribute('tabindex', '0');
            b.addEventListener('click', () => createModal(structureDetails[name]));
            b.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') createModal(structureDetails[name]);
            });
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
        el.parentElement.style.borderRadius = '12px';
        el.parentElement.style.paddingTop = '12px';
        el.parentElement.style.paddingBottom = '10px';
        el.parentElement.style.margin = '8px 12px 12px 12px';
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