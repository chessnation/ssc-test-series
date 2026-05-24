"use client";

import {
  useEffect,
  useState,
} from "react";

import { auth } from "@/firebase/auth";
import { db } from "@/firebase/db";

import {
  getDocs,
  addDoc,
  collection,
} from "firebase/firestore";

export default function MockTestPage() {

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [score, setScore] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [questions, setQuestions] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(60);

  // SAFE CATEGORY STATE
  const [category, setCategory] = useState("");

  // READ CATEGORY FROM URL SAFELY
  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    const selectedCategory =
      params.get("category");

    if (selectedCategory) {

      setCategory(selectedCategory);

    }

  }, []);

  // FETCH QUESTIONS
  useEffect(() => {

    async function fetchQuestions() {

      try {

        const querySnapshot = await getDocs(
          collection(db, "questions")
        );

        const fetchedQuestions: any[] = [];

        querySnapshot.forEach((doc) => {

          const data = doc.data();

          // CATEGORY FILTER
          if (
            !category ||
            data.category
              ?.trim()
              .toLowerCase() ===
              category
                .trim()
                .toLowerCase()
          ) {

            fetchedQuestions.push(data);

          }

        });

        setQuestions(fetchedQuestions);

      } catch (error) {

        console.log(
          "Error fetching questions:",
          error
        );

      } finally {

        setLoading(false);

      }

    }

    fetchQuestions();

  }, [category]);

  // TIMER
  useEffect(() => {

    if (showResult) return;

    if (timeLeft <= 0) {

      setShowResult(true);

      return;

    }

    const timer = setInterval(() => {

      setTimeLeft((prevTime) => prevTime - 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft, showResult]);

  // LOADING SCREEN
  if (loading) {

    return (

      <main className="min-h-screen bg-gray-100 p-5 flex justify-center items-center">

        <h1 className="text-3xl font-bold">
          Loading Questions...
        </h1>

      </main>

    );

  }

  // NO QUESTIONS FOUND
  if (questions.length === 0) {

    return (

      <main className="min-h-screen flex items-center justify-center flex-col">

        <h1 className="text-3xl font-bold text-red-600">
          No Questions Found
        </h1>

        <p className="mt-3 text-gray-600">
          Please check Firestore categories.
        </p>

        <p className="mt-2 text-blue-700 font-bold">
          Current Category:
          {" "}
          {category}
        </p>

        <a
          href="/tests"
          className="mt-5 bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          Go Back
        </a>

      </main>

    );

  }

  // HANDLE ANSWER
  function handleAnswer(selectedOption: string) {

    setSelectedAnswer(selectedOption);

    if (
      selectedOption ===
      questions[currentQuestion]?.answer
    ) {

      setScore((prev) => prev + 1);

    } else {

      setScore((prev) => prev - 0.25);

    }

  }

  // NEXT QUESTION
  async function handleNextQuestion() {

    setSelectedAnswer("");

    const nextQuestion =
      currentQuestion + 1;

    if (nextQuestion < questions.length) {

      setCurrentQuestion(nextQuestion);

    } else {

      try {

        const user = auth.currentUser;

        if (user && user.email) {

          await addDoc(
            collection(db, "scores"),
            {
              email: user.email,

              score: score,

              totalQuestions:
                questions.length,

              category:
                category || "General",

              createdAt: new Date(),
            }
          );

        }

      } catch (error) {

        console.log(
          "Error saving score:",
          error
        );

      }

      setShowResult(true);

    }

  }

  // PREVIOUS QUESTION
  function handlePreviousQuestion() {

    if (currentQuestion > 0) {

      setCurrentQuestion(
        currentQuestion - 1
      );

      setSelectedAnswer("");

    }

  }

  return (

    <main className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">

      <h1 className="text-3xl font-bold text-blue-700">
        {category || "SSC"} Mock Test
      </h1>

      <p className="mt-2 text-lg font-semibold">
        Question {currentQuestion + 1}
        {" "}
        of
        {" "}
        {questions.length}
      </p>

      <div className="w-full max-w-3xl bg-gray-300 h-4 rounded-full mt-3">

        <div
          className="bg-blue-700 h-4 rounded-full"
          style={{
            width: `${(
              ((currentQuestion + 1) /
                questions.length) *
              100
            )}%`,
          }}
        ></div>

      </div>

      <p className="mt-3 text-xl font-bold text-red-600">
        Time Left: {timeLeft} seconds
      </p>

      {!showResult ? (

        <div className="bg-white w-full max-w-3xl p-6 rounded-3xl shadow-xl mt-5">

          <h2 className="text-3xl font-bold leading-relaxed">
            Question {currentQuestion + 1}
          </h2>

          <p className="mt-4 text-lg">
            {
              questions[currentQuestion]
                ?.question
            }
          </p>

          <div className="mt-5 flex flex-col gap-3">

            {questions[
              currentQuestion
            ]?.options?.map(
              (option: string) => (

                <button
                  key={option}
                  disabled={
                    selectedAnswer !== ""
                  }
                  onClick={() =>
                    handleAnswer(option)
                  }
                  className={`p-4 rounded-2xl text-lg font-semibold transition-all text-left border-2
                  ${
                    selectedAnswer ===
                      option &&
                    option ===
                      questions[
                        currentQuestion
                      ]?.answer
                      ? "bg-green-500 text-white border-green-700"
                      : selectedAnswer ===
                        option
                      ? "bg-red-500 text-white border-red-700"
                      : "bg-gray-200 border-gray-300"
                  }`}
                >
                  {option}
                </button>

              )
            )}

          </div>

          <div className="mt-5 flex gap-3">

            {currentQuestion > 0 && (

              <button
                onClick={
                  handlePreviousQuestion
                }
                className="bg-gray-500 text-white px-5 py-3 rounded-xl"
              >
                Previous Question
              </button>

            )}

            {selectedAnswer !== "" && (

              <button
                onClick={
                  handleNextQuestion
                }
                className="bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold text-lg"
              >
                {currentQuestion ===
                questions.length - 1
                  ? "Finish Test"
                  : "Next Question"}
              </button>

            )}

          </div>

        </div>

      ) : (

        <div className="bg-white p-5 rounded-2xl shadow mt-5 text-center w-full max-w-3xl">

          <h2 className="text-3xl font-bold text-green-600">
            Test Completed 🎉
          </h2>

          <p className="mt-5 text-2xl">
            Your Score:
            {" "}
            {score}
            {" "}
            /
            {" "}
            {questions.length}
          </p>

          <p className="mt-3 text-lg text-gray-700">

            Correct Answers:
            {" "}
            {score > 0
              ? Math.floor(score)
              : 0}

          </p>

          <p className="mt-2 text-lg text-gray-700">

            Wrong Answers:
            {" "}
            {questions.length -
              (score > 0
                ? Math.floor(score)
                : 0)}

          </p>

          <a
            href="/"
            className="mt-5 inline-block bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            Go Home
          </a>

        </div>

      )}

    </main>

  );

}