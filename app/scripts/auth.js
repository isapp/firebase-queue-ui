import $ from 'jquery';
const _ = require('underscore');
const firebase = require('firebase/auth');

class Auth {
    constructor() {
        $('.js-auth-form:input').submit( (e) => {
            e.preventDefault();
            const values = $(this).serializeArray();

            console.log('submitted');

            console.log(values);

            _.object($(this).serializeArray().map(function(v) {
                console.log([v.name, v.value]);
            }));
        });
    }

    signin (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch( (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    signout () {
        firebase.auth().signOut().then( () => {

        }, (error) => {

        });
    }
}

module.exports = new Auth();
