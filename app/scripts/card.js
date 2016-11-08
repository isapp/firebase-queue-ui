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
        this.create();
    }

    create () {

        const route = window.location.pathname.replace(/^(\/)/g, '');

        let cards = new Vue({
            el: '#cards',
            data: {
                showCards: true,
                isExpanded: false,
                empty: false,
                error: false,
                path: route
            },
            firebase: {
                items: {
                    source: database.ref(route),
                    asObject: true
                }
            },
            methods: {
                toggleItem: function () {

                    this.isExpanded = !this.isExpanded;
                },
                removeItem: function (item) {

                    this.$firebaseRefs.items.child(item['.key']).remove();
                },
                setError: function (value) {

                    this.showCards = !value;
                    this.error = value;
                },
                setEmpty: function (value) {

                    this.showCards = !value;
                    this.error = value;
                }
            }
        });
    }
}

module.exports = new Card();
