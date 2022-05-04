/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
import { initializeApp } from './firebaseUtils.js';
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
} from './firebaseUtils.js';

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  where,
} from './firebaseUtils.js';

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
const db = getFirestore(app);
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

const db = getFirestore(app);

/** firebase */

// Función que devuelve datos del usuario:
export const getUserLocalStorage = () => JSON.parse(localStorage.getItem('user'));

// Guardar post en FireStore
export const savePost = (post, tag) => addDoc(collection(db, 'posts'), {
  post: post.value,
  tag: tag.value,
  date: serverTimestamp(),
});
// funcion que reconoce/escucha datos nuevos onSnapshot : en instantánea
export const onGetPost = (callback) => {
  const dataSort = query(collection(db, 'posts'), orderBy('date', 'desc'));
  return onSnapshot(dataSort, callback);
};
export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

export const getDataWithFilters = (tag, callback) => {
  const dataSort = query(collection(db, 'posts'), where('tag', '==', tag));
  return onSnapshot(dataSort, callback);
};

export const getPost = (id) => getDoc(doc(db, 'posts', id));

export const updatePost = (id, editedFields) => updateDoc(doc(db, 'posts', id), editedFields);
