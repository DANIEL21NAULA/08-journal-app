// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// import { getFireStore } from 'firebase/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUYl313uIkCkHCaH-CYmmo9V9KxWihYUs',
  authDomain: 'react-cursos-journal-9b46f.firebaseapp.com',
  projectId: 'react-cursos-journal-9b46f',
  storageBucket: 'react-cursos-journal-9b46f.appspot.com',
  messagingSenderId: '1029529018120',
  appId: '1:1029529018120:web:eb34aeef2adec0d876d6bd',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// Funcionalizades de la aplicacion
export const FirebaseAuth = getAuth(FirebaseApp);
// configuracion de mi base de datos
export const FirebaseDB = getFirestore(FirebaseApp);
