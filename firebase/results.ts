import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db }
from "./config";

export async function saveResult(
  data: any
) {

  try {

    await addDoc(
      collection(
        db,
        "results"
      ),
      data
    );

    return true;

  }
  catch (error) {

    console.log(error);

    return false;

  }

}

export async function getUserResults(
  email: string
) {

  try {

    const q = query(
      collection(
        db,
        "results"
      ),
      where(
        "email",
        "==",
        email
      )
    );

    const snapshot =
      await getDocs(q);

    const results =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    return results;

  }
  catch (error) {

    console.log(error);

    return [];

  }

}
export async function getLeaderboard() {

  try {

    const q = query(
      collection(
        db,
        "results"
      ),
      orderBy(
        "score",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    const results =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    return results;

  }
  catch (error) {

    console.log(error);

    return [];

  }

}