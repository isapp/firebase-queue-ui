'use strict';

import $ from 'jquery';
const firebase = require('firebase');

require('./config.js');
const Form = require('./form.js');
const Session = require('./session.js');

const auth = firebase.auth();

class Auth {

    constructor () {

        Session.check();
        
        $('.js-auth-form').submit( (e) => {

            const target = $(e.currentTarget);
            e.preventDefault();

            const email = $(target).find('.js-auth-form-email').val();
            const password = $(target).find('.js-auth-form-password').val();

            Form.toggleDisable(target);
            Form.toggleLoading(target);
            this.handleSignIn(email, password);
        });
    }

    handleSignIn (email, password) {

        Session.signIn();
    }

    signout () {

        Session.logout();
    }
}

module.exports = new Auth();
