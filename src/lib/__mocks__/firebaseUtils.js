/* eslint-disable no-unused-vars */
export const initializeApp = () => Promise.resolve({});
// export const Register = () => ({});
// Autenticación
export const getAuth = () => ({});
// { currentUser: { displayName: '' } };
// eslint-disable-next-line max-len
export const createUserWithEmailAndPassword = jest.fn((auth, email, password) => { Promise.resolve({ user: { email, password } }); });
export const updateProfile = jest.fn((fullName) => ({ displayName: fullName }));
export const logInGoogle = jest.fn(() => ({}));
export class GoogleAuthProvider {}

export const FacebookAuthProvider = jest.fn();

export const sendEmailVerification = () => Promise.resolve({});
export const signInWithPopup = jest.fn((auth, provider) => Promise.resolve({}));

// eslint-disable-next-line max-len
export const signInWithEmailAndPassword = jest.fn((auth, email, password) => Promise.resolve({ user: { email, password } }));
export const signOut = jest.fn(() => Promise.resolve({}));
export const onAuthStateChanged = () => Promise.resolve({});
