'use strict';

const Firebase = require('firebase');
const Vue = require('vue/dist/vue');
const VueFire = require('vuefire');
const Moment = require('moment');

require('./config.js');
const Session = require('./session.js');

const database = Firebase.database();
Vue.use(VueFire);

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
                    source: database.ref('queue/v1/location/tasks'),
                    asObject: true
                }
            },
            methods: {
                toggle: function (key, index) {

                    this.isExpanded = !this.isExpanded;
                },
                retry: function(e) {

                    console.log(e);
                },
                remove: function(e) {

                    console.log(e);
                }
            }
        });
    }
}

module.exports = new Card();
