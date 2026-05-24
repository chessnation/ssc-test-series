import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./config";

export type QuestionType = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  subject: string;
};

export async function getQuestions(): Promise<QuestionType[]> {

  const questionsRef =
    collection(
      db,
      "questions"
    );

  const snapshot =
    await getDocs(
      questionsRef
    );

  const questions =
    snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<QuestionType, "id">),
      })
    ) as QuestionType[];

  return questions;

}