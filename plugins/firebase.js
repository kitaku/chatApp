import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDss0yzPYtz3kLT_t-XZYC_s9QCdUEa3vs",
    authDomain: "chatapp-d6083.firebaseapp.com",
    databaseURL: "https://chatapp-d6083.firebaseio.com",
    projectId: "chatapp-d6083",
    storageBucket: "",
    messagingSenderId: "981836765059",
    appId: "1:981836765059:web:2594f40f64d4242fe848b6",
    measurementId: "G-ZKRD7MKR1Y"
  })
}

export default firebase
