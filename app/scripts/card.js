'use strict';

const $ = require('jquery');
require('jQuery.toggleModifier');

$('.js-card-queue-toggle').click( (e) => {

    e.preventDefault();
    const target = $(e.currentTarget);

    $(target).closest('.js-card-queue').toggleModifier('expanded');
});
