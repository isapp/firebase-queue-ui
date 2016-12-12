'use strict';

const Firebase = require('firebase');
const Vue = require('vue/dist/vue');
const VueFire = require('vuefire');

require('./config.js');
const Session = require('./session.js');
const env = require('../env.json');

const database = Firebase.database();
Vue.use(VueFire);

class Drawer {

    constructor () {

        let dialogEl = document.querySelector('dialog');

        if(!dialogEl.showModal) {

          dialogPolyfill.registerDialog(dialogEl);
        }

        let databaseRef = database.ref(env.UI_SPECS);

        let dialog = new Vue({
            el: '#dialog',
            data: {
                task: ''
            },
            firebase: {
                queues: {
                    source: databaseRef,
                    asObject: true
                }
            },
            methods: {
                openDialog: function () {

                    dialogEl.showModal();
                },
                closeDialog: function () {

                    dialogEl.close();
                },
                submitTask: function () {

                    console.log(this.task);
                }
            }
        });
    }
}

module.exports = new Drawer();
