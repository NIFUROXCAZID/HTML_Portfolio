'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.nav__element');

    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('nav-selected'));
            item.classList.add('nav-selected');
        });
    });
});

document.addEventListener("click", documentActions);

function documentActions(e) {
    const targetElement = e.target;

    if (targetElement.closest('.icon-menu')) {
        document.body.classList.toggle('menu-open');
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.footer-part__page');
    const prevButton = document.querySelector('.footer-part__page-chose:first-child');
    const nextButton = document.querySelector('.footer-part__page-chose:last-child');

    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('footer-part__selected'));
            item.classList.add('footer-part__selected');
        });
    });

    prevButton.addEventListener('click', () => {
        const selected = document.querySelector('.footer-part__selected');
        const prevItem = selected.previousElementSibling;

        if (prevItem && prevItem.classList.contains('footer-part__page')) {
            items.forEach(i => i.classList.remove('footer-part__selected'));
            prevItem.classList.add('footer-part__selected');
        }
    });

    nextButton.addEventListener('click', () => {
        const selected = document.querySelector('.footer-part__selected');
        const nextItem = selected.nextElementSibling;

        if (nextItem && nextItem.classList.contains('footer-part__page')) {
            items.forEach(i => i.classList.remove('footer-part__selected'));
            nextItem.classList.add('footer-part__selected');
        }
    });
});