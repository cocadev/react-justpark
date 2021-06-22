import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCNdlm5_FcH0IU74bq3Mr9Va4GigrOr-Xk",
  authDomain: "prked-web.firebaseapp.com",
  projectId: "prked-web",
  storageBucket: "prked-web.appspot.com",
  messagingSenderId: "92544552001",
  appId: "1:92544552001:web:eead9b13de8677328a4ac0",
  measurementId: "G-3ECXHN9ZSG",
};

firebase.initializeApp(firebaseConfig);

export default firebase;