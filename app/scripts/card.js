'use strict';

const $ = require('jquery');
const Firebase = require('firebase');
const Vue = require('vue/dist/vue');
const VueFire = require('vuefire');
require('jQuery.toggleModifier');

require('./config.js');
const Session = require('./session.js');

const database = Firebase.database();

class Card {

    constructor () {

        Session.check();
        Vue.use(VueFire);
        this.get();

        $('.js-card-queue-toggle').click( (e) => {

            e.preventDefault();
            $(e.currentTarget).closest('.js-card-queue').toggleModifier('expanded');
        });

        $('.js-logout').click( (e) => {

            e.preventDefault();
            Session.logout();
        });
    }

    get () {
        let cards = new Vue({
            el: '#js-card',
            firebase: {
                anObject: {
                    source: database.ref('queue/v1/location/tasks'),
                    asObject: true
                }
            }
        });
    }
}

module.exports = new Card();
