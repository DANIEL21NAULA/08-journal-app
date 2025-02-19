// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// eslint-disable-next-line import/no-cycle
import { getEnvironments } from '../helpers';
// import { getFireStore } from 'firebase/lite';
// TODO: Add SDKs for Firebase products that you want to use
//! https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// Funcionalizades de la aplicacion
export const FirebaseAuth = getAuth(FirebaseApp);
// configuracion de mi base de datos
export const FirebaseDB = getFirestore(FirebaseApp);
