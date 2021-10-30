import './styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries'

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import countriesTpl from './templates/countries.hbs';
import countryTpl from './templates/country.hbs';

const refs = {
    inputEl: document.querySelector('.query-input'),
    cardContainer: document.querySelector('.js-card-container')
}

refs.inputEl.addEventListener('input', debounce(onInput, 1000));

function onInput(e) {
    const searchQuery = e.target.value;
    fetchCountries(searchQuery)
        .then(dataProcessing)
        .catch(error => {
            defaultModules.set(PNotifyMobile, {});
            alert({
                text: '! Information not found!',
                addClass: 'notify'
            });
        });
}

function dataProcessing(data) {
    if (data.length > 10) {
        defaultModules.set(PNotifyMobile, {});
        alert({
            text: '! Too many matches found. Please, enter a more specific query!',
            addClass: 'notify',
            shadow: true
        });
    } else
        if (data.length === 1) {
            refs.cardContainer.insertAdjacentHTML('beforeend', countryTpl(data));
            console.log(data);
        }
        else {
            refs.cardContainer.insertAdjacentHTML('beforeend', countriesTpl(data));
            console.log(data);
        }

}