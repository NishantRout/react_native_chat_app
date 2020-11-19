import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfoye1Z63DAcsMzy7xEfBgFNFNLtAA-n0",
  authDomain: "react-native-chat-app-47b25.firebaseapp.com",
  databaseURL: "https://react-native-chat-app-47b25.firebaseio.com",
  projectId: "react-native-chat-app-47b25",
  storageBucket: "react-native-chat-app-47b25.appspot.com",
  messagingSenderId: "681596177833",
  appId: "1:681596177833:web:d2b13bb57054b59d14c8b8",
  measurementId: "G-GMYEERFHK1",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebaseapp.auth();

export { db, auth };
