import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { db } from "./config";

type QuestionType = {
  question: string;
  options: string[];
  answer: string;
  subject: string;
  premium: boolean;
};

export async function addQuestion(
  data: QuestionType
) {

  try {

    await addDoc(
      collection(
        db,
        "questions"
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
export async function getQuestions() {

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "questions"
        )
      );

    const questions =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    return questions;

  }
  catch (error) {

    console.log(error);

    return [];

  }

}

export async function deleteQuestion(
  id: string
) {

  try {

    await deleteDoc(
      doc(
        db,
        "questions",
        id
      )
    );

    return true;

  }
  catch (error) {

    console.log(error);

    return false;

  }

}