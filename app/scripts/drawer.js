'use strict';

const Firebase = require('firebase');
const Vue = require('vue/dist/vue');
const VueFire = require('vuefire');

require('./config.js');
const Session = require('./session.js');
const env = require('../env.json');

const database = Firebase.database();
Vue.use(VueFire);

class Drawer {

    constructor () {

        let databaseRef = database.ref(env.UI_SPECS);

        let drawer = new Vue({
            el: '#drawer',
            firebase: {
                queues: databaseRef
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
