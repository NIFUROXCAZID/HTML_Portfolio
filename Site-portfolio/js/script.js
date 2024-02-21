'use strict';
// ПЕРЕМИКАННЯ СТОРІНОК
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split('/').pop(); // Отримати шлях поточної сторінки

    // Додати клас "active" до відповідного посилання
    if (currentPage === "index.html") {
        document.getElementById("homeLink").classList.add("active");
    } else if (currentPage === "all_works.html") {
        document.getElementById("allWorksLink").classList.add("active");
    }

});

// ВІДКРИТТЯ МЕНЮ АДАПТИВ + Відкриття випадаючих меню
document.addEventListener("click", documentActions);
function documentActions(e) {
    const targetElement = e.target;

    if (targetElement.closest('.header-menu')) {
        document.body.classList.toggle('menu-open');
    }
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

// ПРОКРУТКА ДО ФОРМИ
function scrollToElement() {
    let element = document.getElementById('contact'); // Получаем ссылку на целевой элемент
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Прокручиваем страницу к этому элементу с плавным эффектом
    }
}

// ВИЇЗДЖЯЮЧИЙ АМОГУС
let modal = document.getElementById('Amogus');
let triggerElement = document.getElementById('triggerAmogus');
let modalShown = false;

window.addEventListener('scroll', function () {
    if (!modalShown && isElementInViewport(triggerElement)) {
        modal.classList.toggle('shown');
        modalShown = true;
    }
});

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function closeModal() {
    modal.classList.toggle('shown');
}