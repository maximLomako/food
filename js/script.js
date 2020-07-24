window.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./modules/tabs'),
    modal = require('./modules/modal'),
    cards = require('./modules/cards'),
    calc = require('./modules/calc'),
    form = require('./modules/form'),
    timer = require('./modules/timer'),
    slider = require('./modules/slider');
    
    tabs();
    modal();
    cards();
    form();
    slider();
    timer();
    calc();
});