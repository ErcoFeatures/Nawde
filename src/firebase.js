import  firebase from  'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBNr-mrplxevxykwmpgh_GjRYtQ-XXzVvU",
    authDomain: "nawde-c26fa.firebaseapp.com",
    projectId: "nawde-c26fa",
    storageBucket: "nawde-c26fa.appspot.com",
    messagingSenderId: "908807339643",
    appId: "1:908807339643:web:41365b8139cf97ac17ecde"
};



const firebaseApp = firebase.initializeApp (firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export {db, auth, storage, provider};