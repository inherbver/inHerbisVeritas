import React from 'react';
import { signInWithGoogle, signInWithFacebook } from '../config/auth';

const Login = () => {
  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto mt-20">
      <button
        onClick={signInWithGoogle}
        className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors"
      >
        Se connecter avec Google
      </button>

      <button
        onClick={signInWithFacebook}
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Se connecter avec Facebook
      </button>
    </div>
  );
};

export default Login;
