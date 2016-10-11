'use strict';

const toggle = function () {
  $('.js-card-queue-toggle').click(function (e) {

    e.preventDefault();

    $(this).closest('.js-card-queue').toggleClass('is-expanded');
  });
}

toggle();
