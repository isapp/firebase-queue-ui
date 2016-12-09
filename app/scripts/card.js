'use strict';

const Firebase = require('firebase');
const Vue = require('vue/dist/vue');
const VueFire = require('vuefire');
const Moment = require('moment');
const _ = require('lodash');

require('./config.js');
const Session = require('./session.js');

const database = Firebase.database();
Vue.use(VueFire);

class Card {

    constructor () {

        Session.check();

        let queuePath = window.location.pathname.replace(/^(\/)/g, '');
        let queueFilter = /^\?filter=(queued|retry|inprogress|error|failed)/g.exec(window.location.search);
        let queueTasks = /\/(tasks)/g.exec(queuePath);
        queueFilter = ((queueFilter) ? queueFilter[1] : null);
        queueTasks = ((queueTasks) ? queueTasks[1] : null);

        this.create(queuePath, queueFilter, queueTasks);
    }

    create (queuePath, queueFilter, queueTasks) {

        let databaseRef = database.ref(queuePath);

        let cards = new Vue({
            el: '#cards',
            data: {
                path: queuePath,
                queue: null,
                filter: queueFilter
            },
            firebase: {
                items: {
                    source: databaseRef,
                    asObject: true
                }
            },
            watch: {
                items: function () {

                    databaseRef.once('value', (snapshot) => {

                        if (snapshot.val() !== null && this.path && queueTasks) {

                            this.queue = true;
                        } else {

                            this.queue = false;
                        }
                    });
                }
            },
            methods: {
                filterItems: function() {

                    if (this.filter) {

                        this.$bindAsObject('items', databaseRef.orderByChild('_state').equalTo(this.filter));
                    }

                    return this.items;
                },
                toggleItem: function (index) {

                    var el = document.getElementsByClassName('js-mdl-card-expand')[index];
                    el.classList.toggle('mdl-card--expanded');
                },
                removeItem: function (key, index) {

                    databaseRef.child(key).remove()
                    .then(function () {

                        console.log('Remove succeeded');
                        this.toggleItem(index);
                    })
                    .catch(function (error) {

                        console.log('Remove failed: ' + error.message);
                    });
                },
                retryItem: function (key) {

                    databaseRef.child(key).update({
                        _error_details: '',
                        _state_changed: Date.now(),
                        _state: 'retry'
                    })
                    .then(function () {

                        console.log('Retry succeeded');
                    })
                    .catch(function (error) {

                        console.log('Retry failed' + error.message);
                    });
                }
            },
            filters: {
                icon: function(icon) {

                    const icons = {
                        'default': 'check_box_outline',
                        'queue': 'line_weight',
                        'retry': 'call_missed_outgoing',
                        'in_progress': 'loop',
                        'error': 'error'
                    };

                    if (icons[icon]) {
                        return icons[icon];
                    } else {
                        return icons['default'];
                    }
                },
                moment: function(date) {

                    return Moment(date).format('MMMM Do YYYY, h:mm:ss a');
                }
            }
        });
    }
}

module.exports = new Card();
