'use strict';

const $ = require('jquery');

class Form {

    toggleLoading (el) {

        $(el).toggleClass('form--loading');
    }

    toggleDisable (el) {

        $(el).toggleClass('form--disabled');
    }

    showError (el, targetMessage, message) {

        $(el).addClass('is-invalid');
        $(el).find(targetMessage).text(message);
    }

    hideError (el, targetMessage) {

        $(el).removeClass('is-invalid');
        $(el).find(targetMessage).empty();
    }
}

module.exports = new Form();
