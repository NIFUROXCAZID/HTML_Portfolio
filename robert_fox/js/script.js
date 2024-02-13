'use strict';
// ПЕРЕМИКАННЯ СТОРІНОК
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split('/').pop(); // Отримати шлях поточної сторінки

    // Додати клас "active" до відповідного посилання
    if (currentPage === "index.html") {
        document.getElementById("homeLink").classList.add("active");
    } else if (currentPage === "_about.html") {
        document.getElementById("aboutLink").classList.add("active");
    } else if (currentPage === "_service.html") {
        document.getElementById("serviceLink").classList.add("active");
    } else if (currentPage === "_portfolio.html") {
        document.getElementById("portfolioLink").classList.add("active");
    } else if (currentPage === "_contact.html") {
        document.getElementById("portfolioLink").classList.add("active");
        let targetElement = document.getElementById('contact');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ВІДКРИТТЯ МЕНЮ АДАПТИВ + Відкриття випадаючих меню
document.addEventListener("click", documentActions);
function documentActions(e) {
    const targetElement = e.target;

    if (targetElement.closest('.header-menu')) {
        document.body.classList.toggle('menu-open');
    }

    if (targetElement.closest('#question')) {
        const container = targetElement.closest('#question');

        // Отримуємо всі прямі нащадки першого рівня елементу з id "question"
        const directChildren = container.children;

        // Перевіряємо кожен прямий нащадок, чи має атрибут data-spoller
        for (let i = 0; i < directChildren.length; i++) {
            const child = directChildren[i];
            if (child.getAttribute('data-spoller') !== null) {
                console.log('Нащадок має атрибут data-spoller:', child);
                // Отримуємо цей нащадок як цільовий елемент
                const currentElement = child;
                // Додаємо ваші дії з цим елементом тут
                if (!currentElement.nextElementSibling.classList.contains('--sliding')) {
                    currentElement.classList.toggle('active-question');

                    let parentElement = currentElement.parentElement;
                    parentElement.classList.toggle('active-parent');

                }
                slideToggle(currentElement.nextElementSibling);
            }
        }
    }
    // if (targetElement.closest('[data-spoller]')) {
    //     const currentElement = targetElement.closest('[data-spoller]');
    //     if (!currentElement.nextElementSibling.classList.contains('--sliding')) {
    //         currentElement.classList.toggle('active-question');

    //         let parentElement = currentElement.parentElement;
    //         parentElement.classList.toggle('active-parent');

    //     }
    //     slideToggle(currentElement.nextElementSibling);
    // }
}



// PORTFOLIO НАВІГАТОР
document.addEventListener("DOMContentLoaded", function () {
    // Отримуємо список елементів
    var items = document.querySelectorAll(".portfolio__nav-item");

    // Додаємо обробник подій для кожного елемента
    items.forEach(function (item) {
        item.addEventListener("click", function () {
            // Видаляємо клас "active" у всіх елементів
            items.forEach(function (el) {
                el.classList.remove("portfolio__active");
            });

            // Додаємо клас "active" лише до натиснутого елемента
            this.classList.add("portfolio__active");
        });
    });
});

// СЛАЙДЕРИ + ПЕРЕВІРКА А ТО ІНАКШЕ ЗЛАМАЄТЬСЯ
// Перевірка, чи існує об'єкт Swiper
if (typeof Swiper !== 'undefined') {
    // СЛАЙДЕР SWIPER 1
    const swiper = new Swiper('.portfolio__swiper', {
        // Optional parameters
        loop: true,
        autoHeight: true,
        speed: 300,
        spaceBetween: 24,
        slidesPerView: 3,

        // If we need pagination
        pagination: {
            el: '.portfolio__swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.portfolio__button-next',
            prevEl: '.portfolio__button-prev',
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1
            },
            // when window width is >= 320px
            479.98: {
                slidesPerView: 2
            },
            // when window width is >= 640px
            991: {
                slidesPerView: 3
            }
        }
    });

    // СЛАЙДЕР SWIPER 2
    const swiper_2 = new Swiper('.testimonial__swiper', {
        // Optional parameters
        loop: true,
        speed: 300,
        slidesPerView: 1,

        // If we need pagination
        pagination: {
            el: '.testimonial__swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.testimonial__button-next',
            prevEl: '.testimonial__button-prev',
        },
    });
} else {
    // Код, який виконається, якщо Swiper не ініціалізований
    console.log('Swiper не ініціалізований');
}

// ПРОКРУТКА ДО ФОРМИ
function scrollToElement(elementId) {
    if (elementId) {
        let element = document.getElementById(elementId);
        element.scrollIntoView({ behavior: 'smooth' });
    }
}




// ПАЛОЧКИ СКІЛІВ
// Делать проверку DOM loaded а то может сломатся
document.addEventListener("DOMContentLoaded", function () {
    var itemBars = document.querySelectorAll('.my-skills__item-bar');

    itemBars.forEach(function (itemBar) {
        var paramValueElement = itemBar.querySelector('.my-skills__param-name:last-child');
        var content = parseFloat(paramValueElement.textContent);

        var colorBarElement = itemBar.querySelector('.my-skills__color-bar');

        if (!isNaN(content)) {
            colorBarElement.style.width = content + '%';
        }
    });
});

// СПОЙЛЕР
// Принцип дії - він ховає робить hidden наступний елемент після елементу з атрібутом data-spoller
// в нашому випадку йде h5 з атрибутом data-spoller а потім список який треба сховать
const spollers = document.querySelectorAll('[data-spoller]');

if (spollers.length) {
    spollers.forEach(spoller => {
        spoller.nextElementSibling.hidden = true;
    });
}

let slideDown = (target, duration = 500) => {
    if (!target.classList.contains('--sliding')) {
        target.classList.add('--sliding');
        target.hidden = false;
        let height = target.offsetHeight;

        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;

        target.style.overflow = 'hidden';
        target.style.height = 0;

        target.offsetHeight;

        target.style.transitionProperty = `height, margin, padding`;
        target.style.transitionDuration = `${duration}ms`;

        target.style.height = `${height}px`;

        target.style.removeProperty('padding-top')
        target.style.removeProperty('padding-bottom')
        target.style.removeProperty('margin-bottom')
        target.style.removeProperty('margin-top')

        setTimeout(() => {
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            target.classList.remove('--sliding');
        }, duration);
    }
}
let slideUp = (target, duration = 500) => {
    if (!target.classList.contains('--sliding')) {
        target.classList.add('--sliding');
        let height = target.offsetHeight;

        target.style.transitionProperty = `height, margin, padding`;
        target.style.transitionDuration = `${duration}ms`;
        target.style.height = `${height}px`;

        target.offsetHeight;

        target.style.overflow = 'hidden';
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;

        target.style.height = 0;

        setTimeout(() => {
            target.style.removeProperty('padding-top')
            target.style.removeProperty('padding-bottom')
            target.style.removeProperty('margin-bottom')
            target.style.removeProperty('margin-top')

            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            target.classList.remove('--sliding');

            target.hidden = true;
        }, duration);
    }
}
let slideToggle = (target, duration = 500) => {
    target.hidden ? slideDown(target, duration) : slideUp(target, duration)
}
