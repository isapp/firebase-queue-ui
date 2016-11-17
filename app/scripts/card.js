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
                path: route,
                ready: false,
            },
            firebase: {
                items: {
                    source: databaseRef,
                    asObject: true
                }
            },
            mounted: function () {

                this.ready = true;
                // componentHandler.upgradeElement(this.$el);
            },
            computed: {
                queueLength: function () {

                    return true;
                },
            },
            methods: {
                toggleItem: function () {

                    this.isExpanded = !this.isExpanded;
                },
                removeItem: function (key) {

                    databaseRef.child(key).remove()
                    .then(function() {
                        console.log('Remove succeeded');
                    })
                    .catch(function(error) {
                        console.log('Remove failed: ' + error.message);
                    });
                },
                retryItem: function (key) {

                    databaseRef.child(key).set({
                        _error_details: '',
                        _state_changed: Date.now(),
                        _state: 'retry'
                    })
                    .then(function() {
                        console.log('Retry succeeded');
                    })
                    .catch(function(error) {
                        console.log('Retry failed' + error.message);
                    });
                }
            }
        });

        Vue.filter('moment', function (date) {

            return Moment(date).format('MMMM Do YYYY, h:mm:ss a');;
        });
    }
}

module.exports = new Card();
