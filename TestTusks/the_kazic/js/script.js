'use strict';

document.addEventListener("click", documentActions);

function documentActions(e) {
    const targetElement = e.target;

    if (targetElement.closest('.header-menu')) {
        document.body.classList.toggle('menu-open');
    }

    if (targetElement.closest('.content__button--show') || targetElement.closest('.content__button--hide')) {
        document.body.classList.toggle('menu-show');
    }

    // Випадаюі питання
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
}

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

// ПРОКРУТКА ДО ЕЛЕМЕНТА
function scrollToElement(elementId) {
    let element = elementId;
    element.scrollIntoView({ behavior: 'smooth' });
}

// ПРОКРУТКА ДО ПОЧАТКУ
function scrollToStart() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ПІДЙОМ НАВЕРХ
document.addEventListener('scroll', function () {
    var targetElement = document.getElementById('target-element');
    var otherElement = document.getElementById('go-top-elem');

    // Отримуємо позицію цільового елемента відносно верхньої частини сторінки
    var targetPosition = targetElement.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    // Перевіряємо, чи цільовий елемент видно на екрані
    if (targetPosition <= windowHeight) {
        otherElement.classList.add('shown');
    } else {
        otherElement.classList.remove('shown');
    }
});