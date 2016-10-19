const firebase = require('firebase/app');
const envFile = require('../env.json');
const env = JSON.parse(envFile);

var config = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    databaseURL: env.DATABASE_URL,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
