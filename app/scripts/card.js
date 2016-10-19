'use strict';

import $ from 'jquery';
import 'jQuery.toggleModifier'

$('.js-card-queue-toggle').click( (e) => {

    e.preventDefault();

    $(this).closest('.js-card-queue').toggleModifier('expanded');
});
