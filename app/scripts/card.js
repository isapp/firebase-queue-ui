'use strict';

const $ = require('jquery');
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

        $('.js-logout').click( (e) => {

            e.preventDefault();
            Session.logout();
        });
    }

    get () {
        let cards = new Vue({
            el: '#js-card',
            data: {
                isExpanded: false
            },
            firebase: {
                anObject: {
                    source: database.ref('queue/v1/location/tasks'),
                    asObject: true
                }
            },
            methods: {
                toggle: function () {

                    this.isExpanded = ! this.isExpanded;
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
