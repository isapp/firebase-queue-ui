'use strict';

const Vue = require('vue/dist/vue');

require('./config.js');
const Session = require('./session.js');
const queue = require('../queue.json');

class Drawer {

    constructor () {

        let drawer = new Vue({
            el: '#drawer',
            data: {
                items: queue
            },
            methods: {
                logout: function () {

                    Session.logout();
                }
            }
        });
    }
}

module.exports = new Drawer();
