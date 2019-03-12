
import firebase from 'firebase/app';
import 'firebase/firestore'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCXximNXXPYcpCJwAtY5wDCBRqxmZ4yjaM",
    authDomain: "pilotadirecte-71637.firebaseapp.com",
    databaseURL: "https://pilotadirecte-71637.firebaseio.com",
    projectId: "pilotadirecte-71637",
    storageBucket: "pilotadirecte-71637.appspot.com",
    messagingSenderId: "115000632222"
  };
  const firebaseApp = firebase.initializeApp(config);
  //firebaseApp.firestore().settings({ timestampsInSnapshots: true});

  export default firebaseApp.firestore();
