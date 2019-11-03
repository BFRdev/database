import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAVmTqOH-r_AAVAwpye-7KqyJoRP-dPdXc",
    authDomain: "reactapp-6e18a.firebaseapp.com",
    databaseURL: "https://reactapp-6e18a.firebaseio.com",
    projectId: "reactapp-6e18a",
    storageBucket: "reactapp-6e18a.appspot.com",
    messagingSenderId: "1098794603043",
    appId: "1:1098794603043:web:2285404591cca02e1f1796"
};

firebase.initializeApp(firebaseConfig);

export default firebase; 