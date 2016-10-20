'use strict';

const firebase = require('firebase');
const env = require('../env.json');

let config = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    databaseURL: env.DATABASE_URL,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
