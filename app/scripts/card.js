'use strict';

const Firebase = require('firebase');
const Vue = require('vue/dist/vue');
const VueFire = require('vuefire');
const Moment = require('moment');

require('./config.js');
const Session = require('./session.js');

const database = Firebase.database();
Vue.use(VueFire);

const route = window.location.pathname;

class Card {

    constructor () {

        Session.check();
        this.get();
    }

    get () {
        let cards = new Vue({
            el: '#js-card',
            data: {
                isExpanded: false
            },
            firebase: {
                items: {
                    source: database.ref(route),
                    asObject: true
                }
            },
            methods: {
                toggle: function (key, index) {

                    this.isExpanded = !this.isExpanded;
                }
            }
        });
    }
}

module.exports = new Card();
