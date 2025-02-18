import { auth, googleProvider, facebookProvider } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';

export const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const authStateListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
