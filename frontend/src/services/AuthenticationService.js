// /services/authService.js
import api from '../api';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const firebaseLoginAndGetToken = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return token;
};

export const loginWithToken = async (token) => {
  return api.post('/auth/login/', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = async (name, email, password) => {
  return api.post('/auth/register/', { name, email, password });
};

export const resetPassword = async (newPassword) => {
  return api.post('/auth/reset_password/', { newPassword });
};

export const forgotPassword = async (email) => {
  return api.post('/auth/forget_password/', { email });
};