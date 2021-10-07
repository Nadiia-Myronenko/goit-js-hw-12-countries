import dishesTpl from './templates/dishes.hbs';
import menu from './menu.json';
import './styles.css';

// Добавление функционала изменения темы при нажатии на чекбокс #theme-switch-toggle в тулбаре.
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
    body: document.querySelector('body'),
    themeSwitch: document.querySelector('#theme-switch-toggle')
}

themeDefaultSetting();

refs.themeSwitch.addEventListener('change', onThemeSwitchChange);

function onThemeSwitchChange() {
    refs.body.classList.toggle(Theme.DARK);

    if (refs.body.classList.contains(Theme.DARK)) {
        localStorage.setItem('theme', Theme.DARK)
    } else { localStorage.setItem('theme', Theme.LIGHT) };
}

function themeDefaultSetting() {
    if (!localStorage.length) {
        localStorage.setItem('theme', Theme.LIGHT)
    };
    refs.body.classList.add(localStorage.getItem('theme'));
    
    if (refs.body.classList.contains(Theme.DARK)) {
        refs.themeSwitch.checked = true;
    }
}

// Используя шаблон, создаем разметку всего меню по данным из menu.json и добавляем в DOM в ul.js-menu

console.log(dishesTpl(dishes));