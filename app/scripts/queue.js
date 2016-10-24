'use strict';

const $ = require('jquery');
const firebase = require('firebase');

require('./config.js');
const Session = require('./session.js');

class Queue {

    constructor () {

        Session.check();

        $('.js-logout').click( (e) => {
            e.preventDefault();

            Session.logout();
        });
    }
}

module.exports = new Queue();
