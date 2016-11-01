'use strict';

const Vue = require('vue/dist/vue');

require('./config.js');
const Session = require('./session.js');

class Drawer {

    constructor () {

        let drawer = new Vue({
            el: '#js-drawer',
            methods: {
                logout: function () {

                    Session.logout();
                }
            }
        });
    }
}

module.exports = new Drawer();
