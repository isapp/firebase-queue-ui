'use strict';

import $ from 'jquery';
require('jQuery.toggleModifier');

$('.js-card-queue-toggle').click( (e) => {

    e.preventDefault();

    $(this).closest('.mdl-card').toggleModifier('expanded');
});
