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
        this.check(route);
    }

    check (route) {

        route = route.replace(/^(\/)/g, '');

        return new Promise( (resolve, reject) => {

            let databaseSource = database.ref(route);

            if (databaseSource) {

                resolve(this.get(databaseSource));
            } else {

                console.log('Failed.');
                reject('Failed.');
            }
        });
    }

    get (database) {

        let cards = new Vue({
            el: '#js-card',
            data: {
                isExpanded: false
            },
            firebase: {
                items: {
                    source: database,
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
