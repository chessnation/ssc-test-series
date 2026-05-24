import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./config";

// SIGNUP
export async function signup(
  email: string,
  password: string
) {

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    return userCredential;

  } catch (error) {

    console.log(error);

    return null;

  }

}

// LOGIN
export async function login(
  email: string,
  password: string
) {

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return userCredential;

  } catch (error) {

    console.log(error);

    return null;

  }

}

// LOGOUT
export async function logout() {

  try {

    await signOut(auth);

    return true;

  } catch (error) {

    console.log(error);

    return false;

  }

}

// EXPORT AUTH
export { auth };