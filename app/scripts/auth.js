import $ from 'jquery';
const firebase = require('firebase');

require('./config.js');
const Form = require('./form.js');

class Auth {

    constructor () {
        $('.js-auth-form').submit( (e) => {

            var $this = $(e.currentTarget);
            e.preventDefault();

            const username = $this.find('.js-auth-form-username').val();
            const password = $this.find('.js-auth-form-password').val();

            Form.toggleDisable($this);
            Form.toggleLoading($this);
            this.signin(username, password);
        });
    }

    handleSignIn (email, password) {

        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        } else {
            this.signin(username, password);
        }
    }

    signin (email, password) {

        firebase.auth().signInWithEmailAndPassword(email, password).catch( (error) => {

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

        firebase.auth().signOut().then( () => {

            // Success signing out
        }, (error) => {

            // Error signing out
        });
    }

    handleRedirect () {
        firebase.auth().onAuthStateChanged( (user) => {

          if (user) {

            // User is signed in.
          }
        });
    }
}

module.exports = new Auth();
