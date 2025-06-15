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

const SATELLITE_DETAILS = {
    'Луна (Земля)': {
        title: 'Луна (Земля)',
        img: '../img/FullMoon2010.jpg',
        text: `<b>Единственный естественный спутник Земли.</b><br>\
Масса: 7,35×10<sup>22</sup> кг. Диаметр: 3474 км.\
Влияет на приливы и отливы, стабилизирует ось вращения Земли.\
Поверхность покрыта кратерами, морями и горами.\
Луна — единственный внеземной объект, на котором побывал человек.\
Изучение Луны дало ключ к пониманию ранней истории Земли.`
    },
    'Ио (Юпитер)': {
        title: 'Ио (Юпитер)',
        img: '../img/Io_highest_resolution_true_color.jpg',
        text: `<b>Самый вулканически активный объект Солнечной системы.</b><br>\
Масса: 8,93×10<sup>22</sup> кг. Диаметр: 3643 км.\
Более 400 действующих вулканов, поверхность постоянно обновляется.\
Атмосфера разрежённая, состоит из SO<sub>2</sub>.\
Изучение Ио помогает понять внутренние процессы спутников-гигантов.`
    },
    'Европа (Юпитер)': {
        title: 'Европа (Юпитер)',
        img: '../img/evropa.jpg',
        text: `<b>Один из главных кандидатов на наличие жизни.</b><br>\
Масса: 4,8×10<sup>22</sup> кг. Диаметр: 3121 км.\
Под ледяной корой скрывается океан жидкой воды глубиной до 100 км.\
Поверхность покрыта трещинами и ледяными полями.\
Планируются миссии для поиска следов жизни.`
    },
    'Ганимед (Юпитер)': {
        title: 'Ганимед (Юпитер)',
        img: '../img/10-mest-v-solnechnoj-sisteme-gde-veroyatnee-vsego-est-priznaki-zhizni-4.webp',
        text: `<b>Крупнейший спутник в Солнечной системе.</b><br>\
Масса: 1,48×10<sup>23</sup> кг. Диаметр: 5268 км.\
Имеет собственную магнитосферу — уникально среди спутников.\
Состоит из льда и силикатных пород, возможно наличие подлёдного океана.`
    },
    'Каллисто (Юпитер)': {
        title: 'Каллисто (Юпитер)',
        img: '../img/Callisto.jpg',
        text: `<b>Один из самых древних спутников.</b><br>\
Масса: 1,08×10<sup>23</sup> кг. Диаметр: 4820 км.\
Поверхность покрыта кратерами, почти не менялась миллиарды лет.\
Возможно наличие подповерхностного океана.\
Изучение Каллисто важно для понимания ранней истории Солнечной системы.`
    },
    'Титан (Сатурн)': {
        title: 'Титан (Сатурн)',
        img: '../img/c6e75f0d929245278e2f9f6b921523a8.max-2000x1000.png',
        text: `<b>Второй по величине спутник, уникален плотной атмосферой.</b><br>\
Масса: 1,35×10<sup>23</sup> кг. Диаметр: 5150 км.\
Атмосфера плотнее земной, состоит из азота и метана.\
На поверхности — озёра и реки жидких углеводородов.\
Титан — ключ к пониманию химии ранней Земли.`
    },
    'Спутник-1': {
        title: 'Спутник-1',
        img: '../img/Sputnik_asm.jpg',
        text: `<b>Первый искусственный спутник Земли.</b><br>\
Запущен СССР 4 октября 1957 года. Масса: 83,6 кг.\
Передавал радиосигналы, стал символом начала космической эры.\
Показал возможность вывода объектов на орбиту и стимулировал развитие космических технологий.`
    },
    'МКС (Международная космическая станция)': {
        title: 'МКС (Международная космическая станция)',
        img: '../img/mk700.png',
        text: `<b>Крупнейший обитаемый искусственный спутник.</b><br>\
Масса: ~420 тонн.\
Международная лаборатория на орбите Земли, работает с 2000 года.\
Проводятся эксперименты по биологии, физике, медицине, технологиям.\
Символ сотрудничества стран в космосе.`
    },
    'Телескоп Хаббл': {
        title: 'Телескоп Хаббл',
        img: '../img/HST-SM4.jpg',
        text: `<b>Один из самых известных космических телескопов.</b><br>\
Запущен в 1990 году, масса: 11 тонн.\
Сделал тысячи открытий: определил возраст Вселенной, сфотографировал туманности, галактики, экзопланеты.\
Работает на орбите более 30 лет, регулярно обслуживался астронавтами.`
    }
};

let lastSatelliteFocused = null;
function createSatelliteModal({ title, img, text }) {
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
        if (lastSatelliteFocused) lastSatelliteFocused.focus();
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
document.querySelectorAll('.card-news').forEach(card => {
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function () {
        lastSatelliteFocused = card;
        const title = card.querySelector('.card-news-title')?.textContent?.trim();
        if (SATELLITE_DETAILS[title]) createSatelliteModal(SATELLITE_DETAILS[title]);
    });
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            lastSatelliteFocused = card;
            const title = card.querySelector('.card-news-title')?.textContent?.trim();
            if (SATELLITE_DETAILS[title]) createSatelliteModal(SATELLITE_DETAILS[title]);
        }
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


var video = document.getElementById('bg-video');
if (video) {
    var source = document.createElement('source');
    source.src = '../img/qq.webm';
    source.type = 'video/webm';
    video.appendChild(source);
}