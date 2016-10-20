'use strict';

import $ from 'jquery';
const firebase = require('firebase');

require('./config.js');

const auth = firebase.auth();

class Session {

    handleRedirect () {

    }

    status () {

      auth.onAuthStateChanged( (user) => {

          if (user) {

              // User is signed in.
          }
      });
    }
}
