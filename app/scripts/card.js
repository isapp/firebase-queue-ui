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

        const route = window.location.pathname.replace(/^(\/)/g, '');
        this.create(route);
    }

    create (route) {

        let databaseRef = database.ref(route);

        let cards = new Vue({
            el: '#cards',
            data: {
                isExpanded: false,
                path: route
            },
            firebase: {
                items: {
                    source: databaseRef,
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
                retryItem: function(item) {

                    // this.$firebaseRefs.items.child(item['.key']).remove();
                },
                setEmpty: function (value) {

                    this.error = value;
                }
            }
        });
    }
}

module.exports = new Card();
