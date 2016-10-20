'use strict';

import $ from 'jquery';
const firebase = require('firebase');

require('./config.js');
const Form = require('./form.js');

const auth = firebase.auth();

class Auth {

    constructor () {

        this.handleRedirect();

        $('.js-auth-form').submit( (e) => {

            const target = $(e.currentTarget);
            e.preventDefault();

            const username = $(target).find('.js-auth-form-username').val();
            const password = $(target).find('.js-auth-form-password').val();

            Form.toggleDisable(target);
            Form.toggleLoading(target);
            this.signin(username, password);
        });
    }

    handleSignIn (email, password) {

        if (auth.currentUser) {

            auth.signOut();
        } else {

            this.signin(username, password);
        }
    }

    signin (email, password) {

        auth.signInWithEmailAndPassword(email, password).catch( (error) => {

            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {

                Form.showError('.js-auth-form-password-wrapper', '.js-mdl-textfield-error', errorMessage);
            } else {

                Form.showError('.js-auth-form-username-wrapper', '.js-mdl-textfield-error', errorMessage);
            }
        });
    }

    signout () {

        auth.signOut().then( () => {

            document.location.href = '/';
        });
    }

    handleRedirect () {

    }
}

module.exports = new Auth();
