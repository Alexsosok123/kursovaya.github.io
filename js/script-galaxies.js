document.addEventListener('DOMContentLoaded', function () {
    const galaxyTypes = {
        spiral: {
            title: 'Спиральные галактики',
            img: '../img/bf5e529cebbd1c821741510b54bb535b.jpg', 
            text: 'Спиральные галактики имеют выраженные рукава, исходящие из центрального балджа. В них активно формируются новые звёзды. Примеры: Млечный Путь, Андромеда. Диаметр: 10 000–300 000 световых лет. Состав: молодые и старые звёзды, газ, пыль, тёмная материя.'
        },
        elliptical: {
            title: 'Эллиптические галактики',
            img: '../img/x1536-y0.webp', 
            text: 'Эллиптические галактики имеют форму от почти сферической до сильно вытянутой. В них мало газа и пыли, звёздообразование практически не происходит. Пример: M87. Диаметр: 3 000–700 000 световых лет. Состав: в основном старые звёзды, тёмная материя.'
        },
        irregular: {
            title: 'Неправильные галактики',
            img: '../img/1000_545_1678094453-3599.jpg', 
            text: 'Неправильные галактики не имеют чёткой структуры. Часто являются результатом гравитационных взаимодействий. Примеры: Большое и Малое Магеллановы Облака. Диаметр: 1 000–30 000 световых лет. Состав: молодые звёзды, газ, пыль.'
        }
    };

    const famousGalaxies = {
        milkyway: {
            title: 'Млечный Путь',
            img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Milky_Way_Galaxy.jpg',
            text: 'Наша галактика, спирального типа, содержит более 100 млрд звёзд, диаметр ~100 000 световых лет, масса ~1,5 трлн масс Солнца. В центре — сверхмассивная чёрная дыра (Стрелец A*). Содержит рукава, диск, гало, тёмную материю.'
        },
        andromeda: {
            title: 'Андромеда',
            img: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/M31bobo.jpg',
            text: 'Ближайшая к нам крупная галактика, также спиральная. Диаметр ~220 000 световых лет, масса ~1,2 трлн масс Солнца, содержит около 1 трлн звёзд. Через 4-5 млрд лет столкнётся с Млечным Путём.'
        },
        m87: {
            title: 'Галактика M87',
            img: 'https://cdn.spacetelescope.org/archives/images/screen/heic1907a.jpg',
            text: 'Огромная эллиптическая галактика в созвездии Девы. Диаметр ~120 000 световых лет, масса ~2,7 трлн масс Солнца. В центре — сверхмассивная чёрная дыра массой 6,5 млрд масс Солнца, впервые сфотографированная в 2019 году.'
        },
        magellanic: {
            title: 'Магеллановы Облака',
            img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Large_and_Small_Magellanic_Clouds.jpg',
            text: 'Две неправильные галактики-спутники Млечного Пути. Большое Магелланово Облако: диаметр ~14 000 световых лет, масса ~10 млрд масс Солнца. Малое Магелланово Облако: диаметр ~7 000 световых лет. Видны невооружённым глазом в Южном полушарии.'
        }
    };
    const galaxyStructure = {
        'Ядро': {
            title: 'Ядро галактики',
            img: 'https://cdn.spacetelescope.org/archives/images/screen/heic1509a.jpg',
            text: 'Центральная область галактики, часто содержит сверхмассивную чёрную дыру. В ядре высокая плотность звёзд, сильное излучение и сложные процессы. Ядра могут быть активными (AGN), испускать мощные джеты и рентгеновское излучение.'
        },
        'Диск': {
            title: 'Диск галактики',
            img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Milky_Way_Galaxy.jpg',
            text: 'Основная плоская часть спиральных галактик, где расположены рукава, молодые звёзды, газ и пыль. В диске активно формируются новые звёзды. Толщина диска — несколько тысяч световых лет.'
        },
        'Гало': {
            title: 'Гало галактики',
            img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Large_and_Small_Magellanic_Clouds.jpg',
            text: 'Сферическая область, окружающая диск галактики. Состоит из старых звёзд, шаровых скоплений и тёмной материи. Гало может простираться на сотни тысяч световых лет.'
        },
        'Рукава': {
            title: 'Рукава галактики',
            img: 'https://cdn.spacetelescope.org/archives/images/screen/heic1509a.jpg',
            text: 'Области повышенной плотности в диске спиральных галактик. В рукавах активно рождаются новые звёзды, много газа и пыли. Рукава видны благодаря ярким молодым звёздам и туманностям.'
        },
        'Тёмная материя': {
            title: 'Тёмная материя',
            img: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Dark_Matter_Map.jpg',
            text: 'Невидимая субстанция, составляющая до 90% массы галактики. Не излучает свет, но проявляет себя через гравитационное воздействие. Без тёмной материи галактики не могли бы удерживать свои звёзды.'
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
                <p>${text}</p>
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
    document.querySelectorAll('.card-news').forEach((card, i) => {
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => {
            lastFocused = card;
            if (i === 0) createModal(galaxyTypes.spiral);
            if (i === 1) createModal(galaxyTypes.elliptical);
            if (i === 2) createModal(galaxyTypes.irregular);
        });
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                lastFocused = card;
                if (i === 0) createModal(galaxyTypes.spiral);
                if (i === 1) createModal(galaxyTypes.elliptical);
                if (i === 2) createModal(galaxyTypes.irregular);
            }
        });
    });
    const galaxyList = document.querySelectorAll('section ul li b');
    galaxyList.forEach(b => {
        b.style.textDecoration = 'underline dotted';
        b.style.cursor = 'pointer';
        b.setAttribute('tabindex', '0');
        b.addEventListener('click', () => {
            lastFocused = b;
            const name = b.textContent.trim();
            if (name === 'Млечный Путь') createModal(famousGalaxies.milkyway);
            if (name === 'Андромеда') createModal(famousGalaxies.andromeda);
            if (name === 'Галактика M87') createModal(famousGalaxies.m87);
            if (name.startsWith('Магеллановы')) createModal(famousGalaxies.magellanic);
        });
        b.addEventListener('keydown', e => {
            if ((e.key === 'Enter' || e.key === ' ') && b.textContent) {
                lastFocused = b;
                const name = b.textContent.trim();
                if (name === 'Млечный Путь') createModal(famousGalaxies.milkyway);
                if (name === 'Андромеда') createModal(famousGalaxies.andromeda);
                if (name === 'Галактика M87') createModal(famousGalaxies.m87);
                if (name.startsWith('Магеллановы')) createModal(famousGalaxies.magellanic);
            }
        });
    });
    document.querySelectorAll('section ul li b').forEach(b => {
        const name = b.textContent.trim();
        if (galaxyStructure[name]) {
            b.style.textDecoration = 'underline dotted';
            b.style.cursor = 'pointer';
            b.setAttribute('tabindex', '0');
            b.addEventListener('click', () => createModal(galaxyStructure[name]));
            b.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') createModal(galaxyStructure[name]);
            });
        }
    });
});

(function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .modal-bg { position: fixed; z-index: 1000; inset: 0; background: rgba(0, 0, 0, 0.88); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity .2s; }
    .modal-bg.open { opacity: 1; pointer-events: all; }
    .modal-window { background: #fff; color: #181c24; border-radius: 18px; box-shadow: 0 4px 32px #000a; padding: 32px 32px 24px; max-width: 480px; width: 92vw; position: relative; outline: none; animation: modalIn .22s cubic-bezier(.4,1.6,.6,1); }
    .modal-close { position: absolute; top: 16px; right: 20px; background: none; border: none; color: #222; font-size: 2rem; cursor: pointer; opacity: .7; transition: opacity .2s; }
    .modal-close:hover { opacity: 1; }
    .modal-img { width: 100%; border-radius: 10px; margin-bottom: 18px; background: #f7f7fa; }
    .modal-window h3 { margin: 18px 0 10px 0; font-size: 1.35rem; font-weight: 700; text-align: center; color: #181c24; }
    .modal-window p { margin: 0 0 10px 0; font-size: 1.08rem; line-height: 1.6; text-align: center; }
    @keyframes modalIn { from { transform: translateY(40px) scale(.95); opacity: 0; } to { transform: none; opacity: 1; } }
    `;
    document.head.appendChild(style);
})();
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
        img.style.borderRadius = '12px';
    });
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('bg-video');
    var source = document.createElement('source');
    source.src = '../img/Nebula.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
});