import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCNDSWYbsH55LE3DBur-MQuQ7a4-zrZuME',
  authDomain: 'medisource-v3.firebaseapp.com',
  projectId: 'medisource-v3',
  storageBucket: 'medisource-v3.appspot.com',
  messagingSenderId: '648394317241',
  appId: '1:648394317241:web:d7afda7b3df87a18f62a68'
};


if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
