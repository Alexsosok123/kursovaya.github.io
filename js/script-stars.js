
const STAR_DETAILS = {
    sun: {
        title: 'Солнце (Жёлтый карлик)',
        img: '../img/sun.jpg',
        text: `
            <b>Тип:</b> Жёлтый карлик (G2V)<br>
            <b>Температура поверхности:</b> ~5 500°C<br>
            <b>Масса:</b> 1,989 × 10³⁰ кг (99,86% массы Солнечной системы)<br>
            <b>Диаметр:</b> 1 392 700 км<br>
            <b>Светимость:</b> 3,828 × 10²⁶ Вт<br>
            <b>Возраст:</b> ~4,6 млрд лет<br>
            <b>Продолжительность жизни:</b> ~10 млрд лет<br>
            <b>Состав:</b> водород (74%), гелий (24%), тяжёлые элементы (2%)<br>
            <b>Интересный факт:</b> Солнце совершает оборот вокруг центра Галактики за 225–250 млн лет.`
    },
    red_dwarf: {
        title: 'Красный карлик',
        img: '../img/red.jpg',
        text: `
            <b>Тип:</b> Красный карлик (M-класс)<br>
            <b>Температура поверхности:</b> 2 500–4 000°C<br>
            <b>Масса:</b> 0,08–0,6 массы Солнца<br>
            <b>Диаметр:</b> 0,1–0,7 диаметра Солнца<br>
            <b>Светимость:</b> 0,01–0,6 от солнечной<br>
            <b>Продолжительность жизни:</b> до триллионов лет<br>
            <b>Состав:</b> водород, гелий<br>
            <b>Интересный факт:</b> Самые распространённые звёзды во Вселенной (около 75% всех звёзд).`
    },
    red_giant: {
        title: 'Красный гигант',
        img: '../img/158891026.jpg',
        text: `
            <b>Тип:</b> Красный гигант<br>
            <b>Температура поверхности:</b> 2 200–3 200°C<br>
            <b>Масса:</b> 0,3–8 масс Солнца<br>
            <b>Диаметр:</b> до 1 000 диаметров Солнца<br>
            <b>Светимость:</b> в сотни и тысячи раз выше солнечной<br>
            <b>Продолжительность стадии:</b> ~1% жизни звезды<br>
            <b>Состав:</b> гелий, углерод, кислород<br>
            <b>Интересный факт:</b> Пример — Бетельгейзе. В будущем Солнце тоже станет красным гигантом.`
    },
    blue_giant: {
        title: 'Голубой гигант',
        img: '../img/918202914.jpg',
        text: `
            <b>Тип:</b> Голубой гигант<br>
            <b>Температура поверхности:</b> 10 000–50 000°C<br>
            <b>Масса:</b> 10–50 масс Солнца<br>
            <b>Диаметр:</b> 5–20 диаметров Солнца<br>
            <b>Светимость:</b> в десятки тысяч раз выше солнечной<br>
            <b>Продолжительность жизни:</b> несколько миллионов лет<br>
            <b>Состав:</b> водород, гелий<br>
            <b>Интересный факт:</b> Голубые гиганты часто заканчивают жизнь взрывом сверхновой.`
    },
    white_dwarf: {
        title: 'Белый карлик',
        img: '../img/istockphoto-1489129048-612x612.jpg',
        text: `
            <b>Тип:</b> Белый карлик<br>
            <b>Температура поверхности:</b> 8 000–40 000°C<br>
            <b>Масса:</b> до 1,4 массы Солнца (предел Чандрасекара)<br>
            <b>Диаметр:</b> ~10 000 км (размер Земли)<br>
            <b>Плотность:</b> 1 тонна в 1 см³<br>
            <b>Состав:</b> углерод, кислород, иногда гелий<br>
            <b>Интересный факт:</b> Остаток звезды после сброса оболочки. Чайная ложка вещества весит несколько тонн. Со временем остывает и становится чёрным карликом.`
    }
};

function createStarModal({ title, img, text }) {
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
        if (window.lastStarFocused) window.lastStarFocused.focus();
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

document.querySelectorAll('.star-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function () {
        window.lastStarFocused = card;
        const star = this.getAttribute('data-star');
        const data = STAR_DETAILS[star];
        if (data) createStarModal(data);
    });
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            window.lastStarFocused = card;
            const star = this.getAttribute('data-star');
            const data = STAR_DETAILS[star];
            if (data) createStarModal(data);
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
    .modal-img { width: 100%; border-radius: 10px; margin-bottom: 18px; background: #f7f7fa; }
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

document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('bg-video');
    var source = document.createElement('source');
    source.src = '../img/Superliminal.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
});