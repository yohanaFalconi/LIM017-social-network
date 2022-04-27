/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAI4wQttmvMp9hwAw5-gAe5X5q5DeRmnGg',
  authDomain: 'binge-worthy-94b1b.firebaseapp.com',
  projectId: 'binge-worthy-94b1b',
  storageBucket: 'binge-worthy-94b1b.appspot.com',
  messagingSenderId: '1051976335838',
  appId: '1:1051976335838:web:0a251fdbb4d71af2625d4f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

export const signUpEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const verificationEmail = () => sendEmailVerification(auth.currentUser);
export const userState = (callback) => onAuthStateChanged(auth, callback);
export const logInEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logInGoogle = () => signInWithPopup(auth, gProvider);
export const logInFacebook = () => signInWithPopup(auth, fProvider);
export const recoverPasswordWithEmail = (email) => sendPasswordResetEmail(auth, email);
export const logOut = () => signOut(auth);

/** firebase */
const db = getFirestore(app);
// Guardar post en FireStore
export const savePost = async (description) => {
  const docRefPosts = await addDoc(collection(db, 'posts'), {
    description,
  });
  console.log('Se guardo publicacion en la db con el id: ', docRefPosts.id);
};
// Listar los post que ya existan
export const getPosts = () => getDocs(collection(db, 'posts'));
/* const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
*/

// funcion que reconoce/escucha datos nuevos onSnapshot : en instantánea
export const onGetPost = (callback) => onSnapshot(collection(db, 'posts'), callback);
