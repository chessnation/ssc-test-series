import { initializeApp }
from "firebase/app";

import { getFirestore }
from "firebase/firestore";

import { getAuth }
from "firebase/auth";

const firebaseConfig = {

  apiKey:
    "AIzaSyAazzuk51aI49gzzj5gtSy--4hfILxQ59Q",

  authDomain:
    "ssc-master-c49d5.firebaseapp.com",

  projectId:
    "ssc-master-c49d5",

  storageBucket:
    "ssc-master-c49d5.firebasestorage.app",

  messagingSenderId:
    "152749693767",

  appId:
    "1:152749693767:web:8a13bb8211cfce48294a62",

};

export const app =
  initializeApp(firebaseConfig);

export const db =
  getFirestore(app);

export const auth =
  getAuth(app);