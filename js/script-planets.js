
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('bg-video');
    var source = document.createElement('source');
    source.src = '../img/SE_20170310_145448_Binary-system_2560x1440.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
});
const PLANET_DETAILS = {
    mercury: {
        title: 'Меркурий',
        img: '../img/18_mercury_new.png',
        text: `
            <b>Тип:</b> земная планета<br>
            <b>Средний радиус:</b> 2 439 км<br>
            <b>Масса:</b> 0,055 массы Земли<br>
            <b>Плотность:</b> 5,43 г/см³<br>
            <b>Период обращения вокруг Солнца:</b> 88 суток<br>
            <b>Период вращения вокруг оси:</b> 59 суток<br>
            <b>Температура:</b> от -173°C до +427°C<br>
            <b>Атмосфера:</b> практически отсутствует (разреженный экзосферный слой)<br>
            <b>Спутники:</b> нет<br>
            <b>Гравитация:</b> 3,7 м/с²<br>
            <b>Особенности:</b> Самая быстрая планета, поверхность покрыта кратерами, нет атмосферы — небо всегда чёрное.<br>
            <b>Интересный факт:</b> Солнечный день на Меркурии длится 176 земных суток.`
    },
    venus: {
        title: 'Венера',
        img: '../img/27_venus_jg.png',
        text: `
            <b>Тип:</b> земная планета<br>
            <b>Средний радиус:</b> 6 052 км<br>
            <b>Масса:</b> 0,815 массы Земли<br>
            <b>Плотность:</b> 5,24 г/см³<br>
            <b>Период обращения вокруг Солнца:</b> 225 суток<br>
            <b>Период вращения вокруг оси:</b> 243 суток (ретроградное вращение)<br>
            <b>Температура:</b> около +465°C<br>
            <b>Атмосфера:</b> CO₂ (96%), очень плотная, облака серной кислоты<br>
            <b>Спутники:</b> нет<br>
            <b>Гравитация:</b> 8,87 м/с²<br>
            <b>Особенности:</b> Самая горячая планета, сильный парниковый эффект, давление у поверхности в 92 раза выше земного.<br>
            <b>Интересный факт:</b> Сутки на Венере длиннее года!`
    },
    earth: {
        title: 'Земля',
        img: '../img/17_earth.png',
        text: `
            <b>Тип:</b> земная планета<br>
            <b>Средний радиус:</b> 6 371 км<br>
            <b>Масса:</b> 1 масса Земли<br>
            <b>Плотность:</b> 5,52 г/см³<br>
            <b>Период обращения вокруг Солнца:</b> 365,25 суток<br>
            <b>Период вращения вокруг оси:</b> 23,93 часа<br>
            <b>Температура:</b> от -89°C до +57°C<br>
            <b>Атмосфера:</b> азот (78%), кислород (21%), аргон, CO₂<br>
            <b>Спутники:</b> 1 (Луна)<br>
            <b>Гравитация:</b> 9,8 м/с²<br>
            <b>Особенности:</b> Единственная известная планета с жизнью и жидкой водой.<br>
            <b>Интересный факт:</b> Более 70% поверхности покрыто водой.`
    },
    mars: {
        title: 'Марс',
        img: '../img/19_mars.png',
        text: `
            <b>Тип:</b> земная планета<br>
            <b>Средний радиус:</b> 3 390 км<br>
            <b>Масса:</b> 0,107 массы Земли<br>
            <b>Плотность:</b> 3,93 г/см³<br>
            <b>Период обращения вокруг Солнца:</b> 687 суток<br>
            <b>Период вращения вокруг оси:</b> 24,6 часа<br>
            <b>Температура:</b> от -153°C до +20°C<br>
            <b>Атмосфера:</b> CO₂ (95%), разреженная<br>
            <b>Спутники:</b> 2 (Фобос и Деймос)<br>
            <b>Гравитация:</b> 3,71 м/с²<br>
            <b>Особенности:</b> Красная поверхность из-за оксида железа, есть полярные шапки, следы древних рек.<br>
            <b>Интересный факт:</b> На Марсе самая высокая гора — Олимп (22 км) и самая большая долина — Маринер.`
    },
    jupiter: {
        title: 'Юпитер',
        img: '../img/16_jupiter_new.png',
        text: `
            <b>Тип:</b> газовый гигант<br>
            <b>Средний радиус:</b> 69 911 км<br>
            <b>Масса:</b> 318 масс Земли<br>
            <b>Плотность:</b> 1,33 г/см³<br>
            <b>Период обращения вокруг Солнца:</b> 11,86 лет<br>
            <b>Период вращения вокруг оси:</b> 9,9 часа (самая быстрая планета)<br>
            <b>Температура:</b> около -145°C<br>
            <b>Атмосфера:</b> водород (90%), гелий (10%)<br>
            <b>Спутники:</b> 95<br>
            <b>Кольца:</b> есть, но тусклые<br>
            <b>Гравитация:</b> 24,79 м/с²<br>
            <b>Особенности:</b> Самая большая планета, мощные штормы (Большое Красное Пятно), сильное магнитное поле.<br>
            <b>Интересный факт:</b> Юпитер излучает больше энергии, чем получает от Солнца.`
    },
    saturn: {
        title: 'Сатурн',
        img: '../img/28_saturn.png',
        text: `
            <b>Тип:</b> газовый гигант<br>
            <b>Средний радиус:</b> 58 232 км<br>
            <b>Масса:</b> 95 масс Земли<br>
            <b>Плотность:</b> 0,69 г/см³ (самая низкая среди планет)<br>
            <b>Период обращения вокруг Солнца:</b> 29,5 лет<br>
            <b>Период вращения вокруг оси:</b> 10,7 часа<br>
            <b>Температура:</b> около -178°C<br>
            <b>Атмосфера:</b> водород (96%), гелий (3%)<br>
            <b>Спутники:</b> 83<br>
            <b>Кольца:</b> самые яркие и протяжённые<br>
            <b>Гравитация:</b> 10,44 м/с²<br>
            <b>Особенности:</b> Кольца состоят из миллиардов частиц льда и камней, у Сатурна есть спутник Титан с плотной атмосферой.<br>
            <b>Интересный факт:</b> Сатурн мог бы плавать в воде из-за низкой плотности.`
    },
    uranus: {
        title: 'Уран',
        img: '../img/29_uranus.png',
        text: `
            <b>Тип:</b> ледяной гигант<br>
            <b>Средний радиус:</b> 25 362 км<br>
            <b>Масса:</b> 14,5 масс Земли<br>
            <b>Плотность:</b> 1,27 г/см³<br>
            <b>Период обращения вокруг Солнца:</b> 84 года<br>
            <b>Период вращения вокруг оси:</b> 17,2 часа<br>
            <b>Температура:</b> около -224°C (самая холодная планета)<br>
            <b>Атмосфера:</b> водород, гелий, метан<br>
            <b>Спутники:</b> 27<br>
            <b>Кольца:</b> есть, тёмные и узкие<br>
            <b>Гравитация:</b> 8,87 м/с²<br>
            <b>Особенности:</b> Ось вращения наклонена почти на 98°, вращается "лежа на боку".<br>
            <b>Интересный факт:</b> Метан придаёт Урану голубой цвет.`
    },
    neptune: {
        title: 'Нептун',
        img: '../img/30_neptune.png',
        text: `
            <b>Тип:</b> ледяной гигант<br>
            <b>Средний радиус:</b> 24 622 км<br>
            <b>Масса:</b> 17 масс Земли<br>
            <b>Плотность:</b> 1,64 г/см³<br>
            <b>Период обращения вокруг Солнца:</b> 165 лет<br>
            <b>Период вращения вокруг оси:</b> 16,1 часа<br>
            <b>Температура:</b> около -214°C<br>
            <b>Атмосфера:</b> водород, гелий, метан<br>
            <b>Спутники:</b> 14<br>
            <b>Кольца:</b> есть, тонкие и слабо заметные<br>
            <b>Гравитация:</b> 11,15 м/с²<br>
            <b>Особенности:</b> Самые сильные ветры в Солнечной системе (до 2100 км/ч), глубокий синий цвет.<br>
            <b>Интересный факт:</b> Открыт по расчётам, а не визуально.`
    }
};

function createPlanetModal({ title, img, text }) {
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
        if (window.lastPlanetFocused) window.lastPlanetFocused.focus();
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

document.querySelectorAll('.planet-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function () {
        window.lastPlanetFocused = card;
        const planet = this.getAttribute('data-planet');
        const data = PLANET_DETAILS[planet];
        if (data) createPlanetModal(data);
    });
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            window.lastPlanetFocused = card;
            const planet = this.getAttribute('data-planet');
            const data = PLANET_DETAILS[planet];
            if (data) createPlanetModal(data);
        }
    });
});

(function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .modal-bg { position: fixed; z-index: 1000; inset: 0; background: rgba(0,0,0,0.88); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity .2s; }
    .modal-bg.open { opacity: 1; pointer-events: all; }
    .modal-window { background: #fff; color: #181c24; border-radius: 18px; box-shadow: 0 4px 32px #000a; padding: 32px 32px 24px; max-width: 480px; width: 92vw; position: relative; outline: none; animation: modalIn .22s cubic-bezier(.4,1.6,.6,1); }
    .modal-close { position: absolute; top: 16px; right: 20px; background: none; border: none; color: #222; font-size: 2rem; cursor: pointer; opacity: .7; transition: opacity .2s; }
    .modal-close:hover { opacity: 1; }
    .modal-img { width: 100%; border-radius: 10px; margin-bottom: 18px; background:rgb(0, 0, 0); }
    .modal-window h3 { margin: 18px 0 10px 0; font-size: 1.35rem; font-weight: 700; text-align: center; color: #181c24; }
    .modal-window div { margin: 0 0 10px 0; font-size: 1.08rem; line-height: 1.6; text-align: left; }
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


});
