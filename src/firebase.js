import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
    apiKey: "###################",
    authDomain: "slack-clone-###################.firebaseapp.com",
    databaseURL: "https://slack-clone-###################.firebaseio.com",
    projectId: "slack-clone-###################",
    storageBucket: "slack-clone-###################.appspot.com",
    messagingSenderId: "###################"
};

firebase.initializeApp(config);

export default firebase;