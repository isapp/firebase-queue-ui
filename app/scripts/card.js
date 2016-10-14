'use strict';

import $ from 'jquery';
import 'jQuery.toggleModifier'

$('.js-card-queue-toggle').click(function (e) {

  e.preventDefault();

  $(this).closest('.js-card-queue').toggleModifier('expanded');
});
