import {
  db,
} from "./config";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export async function checkPremium(
  email: string
) {

  try {

    const userRef =
      doc(
        db,
        "users",
        email
      );

    const snapshot =
      await getDoc(
        userRef
      );

    if (
      snapshot.exists()
    ) {

      return snapshot.data()
        .premium;

    }

    return false;

  }
  catch (error) {

    console.log(error);

    return false;

  }

}