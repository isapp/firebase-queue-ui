require('firebase/auth');

class Auth {
    constructor() {
        $('.js-auth-form').submit( () => {
            const values = $(this).serialize();

            console.log(values);
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

module.exports = Auth
