'use strict';

const $ = require('jquery');
const firebase = require('firebase');

require('./config.js');
const Form = require('./form.js');

const auth = firebase.auth();

class Session {

    check () {

        auth.onAuthStateChanged(function(user) {
            if (!user) {

                const authpage = '/login';

                if (document.location.pathname !== authpage) {

                    document.location.href = authpage;
                }
            }
        });
    }

    signIn (email, password) {

        auth.signInWithEmailAndPassword(email, password).then( () => {

            const queuepage = '/queue';

            if (document.location.pathname !== queuepage) {

                document.location.href = queuepage;
            }
        }).catch( (error) => {

            this.signInError(error);
        });
    }

    signInError (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {

            Form.showError('.js-auth-form-password-wrapper', '.js-mdl-textfield-error', errorMessage);
        } else {

            Form.showError('.js-auth-form-email-wrapper', '.js-mdl-textfield-error', errorMessage);
        }
    }

    logout () {

        auth.signOut().then( () => {

            this.check();
        });
    }
}

module.exports = new Session();
