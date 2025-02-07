import { auth, googleProvider, facebookProvider } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Erreur Google Auth :', error);
    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error) {
    console.error('Erreur Facebook Auth :', error);
    throw error;
  }
};
