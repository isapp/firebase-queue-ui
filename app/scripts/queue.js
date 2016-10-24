'use strict';

import $ from 'jquery';
const firebase = require('firebase');

require('./config.js');
const Session = require('./session.js');

class Queue {

    constructor () {

        Session.check();
    }
}

module.exports = new Queue();
