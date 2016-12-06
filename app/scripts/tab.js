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

        let queueFilter = /^\?filter=(queued|retry|inprogress|error|failed)/g.exec(window.location.search);
        queueFilter = ((queueFilter) ? queueFilter[1] : null);

        let tab = new Vue({
            el: '#tab',
            data: {
                active: queueFilter,
                tabs: [
                    {
                        key: '',
                        name: 'All',
                        icon: 'content_copy',
                        path: '?'
                    },
                    {
                        key: 'queued',
                        name: 'Queued',
                        icon: 'line_weight',
                        path: '?filter=queued'
                    },
                    {
                        key: 'retry',
                        name: 'Retry',
                        icon: 'call_missed_outgoing',
                        path: '?filter=retry'
                    },
                    {
                        key: 'in-progress',
                        name: 'In Progress',
                        icon: 'loop',
                        path: '?filter=in-progress'
                    },
                    {
                        key: 'failed',
                        name: 'Failed',
                        icon: 'error',
                        path: '?filter=failed'
                    }
                ]
            }
        });
    }
}

module.exports = new Drawer();
