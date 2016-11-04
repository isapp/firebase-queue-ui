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

        const route = window.location.pathname;

        this.createCard();
        this.check(route);
    }

    check (route) {

        route = route.replace(/^(\/)/g, '');

        return new Promise( (resolve, reject) => {

            let databaseSource = database.ref(route);

            if (databaseSource) {

                resolve(this.setCard(databaseSource));
            } else {

                reject(this.throwError());
            }
        });
    }

    setCard (database) {

        console.log('setCard');

        let card = Vue.extend({
            data: function () {
                return {
                    empty: false
                }
            },
            firebase: function() {
                return {
                    items: {
                        source: database,
                        asObject: true
                    }
                }
            }
        });

        new card().$mount('#cards');
    }

    throwError () {

        console.log('error');
    }

    createCard () {

        let cardItem = Vue.extend({
            template: '#card'
        });

        Vue.component('card', cardItem)

        new Vue({
            el: '#cards',
            data: {
                isExpanded: false
            },
            props: {
                empty: {
                    type: Boolean,
                    default: true
                },
                error: {
                    type: Boolean,
                    default: false
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
