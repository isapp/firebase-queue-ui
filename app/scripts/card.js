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

        let databaseRef = database.ref(route).limitToLast(10);

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

                    console.log(this);
                    return true;
                },
            },
            methods: {
                toggleItem: function () {

                    this.isExpanded = !this.isExpanded;
                },
                removeItem: function (item) {

                    console.log('remove');
                    // this.$firebaseRefs.items.child(item['.key']).remove();
                },
                retryItem: function(item) {

                    console.log('retry');
                    // console.log(this.$firebaseRefs.items.child(item['.key']));
                },
                setEmpty: function (value) {

                    this.error = value;
                }
            }
        });

        Vue.filter('moment', function (date) {

            return Moment(date).format('MMMM Do YYYY, h:mm:ss a');;
        });
    }
}

module.exports = new Card();
