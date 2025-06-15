document.addEventListener('DOMContentLoaded', function () {
    const missions = {
        apollo11: {
            title: 'Apollo 11',
            img: '../img/NASA_ApolloLanderOnMom-scaled.jpg',
            text: `<b>Первая высадка человека на Луну (1969).</b><br>\
Экипаж: Нил Армстронг, Базз Олдрин, Майкл Коллинз.<br>\
Старт: 16 июля 1969, посадка на Луну: 20 июля 1969.<br>\
Доставлено 21,5 кг лунного грунта.\
Легендарные слова: «Это маленький шаг для человека, но гигантский скачок для всего человечества».<br>\
Миссия доказала возможность межпланетных полётов и стала символом научного прогресса.`
        },
        voyager1: {
            title: 'Voyager 1',
            img: '../img/voyager.webp',
            text: `<b>Запущен в 1977 году.</b><br>\
Самый дальний зонд, покинувший Солнечную систему (с 2012 года в межзвёздном пространстве).<br>\
Передал «Портрет семьи» — снимок всех планет Солнечной системы.<br>\
На борту — «Золотая пластинка» с посланием внеземным цивилизациям.<br>\
Исследовал Юпитер, Сатурн, их спутники и магнитосферы.<br>\
Работает более 45 лет, продолжает передавать данные.`
        },
        hubble: {
            title: 'Hubble',
            img: '../img/HST-SM4.jpg',
            text: `<b>Космический телескоп, работающий с 1990 года.</b><br>\
Сделал более 1,5 млн наблюдений, открыл ускоренное расширение Вселенной.<br>\
Определил возраст Вселенной, сфотографировал тысячи галактик, туманностей, экзопланет.<br>\
Пять раз обслуживался астронавтами на орбите.<br>\
Революционизировал астрономию и стал иконой науки.`
        },
        rosetta: {
            title: 'Rosetta',
            img: '../img/Rosetta_at_Comet_pillars.jpg',
            text: `<b>Миссия Европейского космического агентства (ESA).</b><br>\
Запущена в 2004 году, достигла кометы 67P/Чурюмова-Герасименко в 2014.<br>\
Впервые доставила спускаемый аппарат Philae на поверхность кометы.<br>\
Изучила состав, структуру и эволюцию ядра кометы.<br>\
Данные Rosetta помогли понять роль комет в формировании воды и органики на Земле.`
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

    document.querySelectorAll('.mission-card').forEach(card => {
        card.addEventListener('click', function () {
            lastFocused = card;
            const key = card.getAttribute('data-mission');
            if (missions[key]) createModal(missions[key]);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                lastFocused = card;
                const key = card.getAttribute('data-mission');
                if (missions[key]) createModal(missions[key]);
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
});
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('bg-video');
    var source = document.createElement('source');
    source.src = '../img/dddd1.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
});