import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'squeeze-films.firebaseapp.com',
  projectId: 'squeeze-films',
  storageBucket: 'squeeze-films.appspot.com',
  messagingSenderId: '941596027044',
  appId: '1:941596027044:web:7ebaed05a0693c1d7f9e31',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
