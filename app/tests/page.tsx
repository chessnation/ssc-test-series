"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  checkPremium,
} from "@/firebase/premium";

import {
  useTheme,
} from "@/context/ThemeContext";

import {
  useAuth,
} from "@/context/AuthContext";

import {
  saveResult,
} from "@/firebase/results";

import {
  getQuestions,
} from "@/firebase/admin";

export default function TestsPage() {

  const { darkMode } =
    useTheme();

  const { user } =
    useAuth();

  const [questions,
    setQuestions] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [selectedSubject,
    setSelectedSubject] =
    useState("");

  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);

  const [selectedAnswers,
    setSelectedAnswers] =
    useState<any>({});

  const [submitted,
    setSubmitted] =
    useState(false);

  const [showReview,
    setShowReview] =
    useState(false);

  const [timeLeft,
    setTimeLeft] =
    useState(1800);

  const [isPremium,
  setIsPremium] =
  useState(false);

  /* LOAD QUESTIONS */

  useEffect(() => {

    async function loadQuestions() {

      if (!selectedSubject)
        return;

      setLoading(true);

      if (user?.email) {

  const premiumStatus =
    await checkPremium(
      user.email
    );

  setIsPremium(
    premiumStatus
  );

}
      const data =
        await getQuestions();

      const filtered =
        data.filter(
          (item: any) =>
            item.subject ===
            selectedSubject
        );

      setQuestions(filtered);

      setLoading(false);

    }

    loadQuestions();

  }, [selectedSubject]);

  /* TIMER */

  useEffect(() => {

    if (
      submitted ||
      !selectedSubject
    )
      return;

    if (timeLeft <= 0) {

      handleSubmit();

      return;

    }

    const timer =
      setInterval(() => {

        setTimeLeft(
          (prev) => prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [
    timeLeft,
    submitted,
    selectedSubject,
  ]);

  /* TIME */

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

  /* ANSWER */

  function handleAnswer(
    option: string
  ) {

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]:
        option,
    });

  }

  /* SCORE */

  const correct =
    questions.filter(
      (
        question,
        index
      ) =>
        selectedAnswers[
          index
        ] === question.answer
    ).length;

  const wrong =
    Object.keys(
      selectedAnswers
    ).length - correct;

  const score =
    correct * 2 -
    wrong * 0.5;

  /* SUBMIT */

  async function handleSubmit() {

    const confirmSubmit =
      confirm(
        "Submit test?"
      );

    if (!confirmSubmit)
      return;

    setSubmitted(true);

    if (user?.email) {

      await saveResult({
        email:
          user.email,

        score,

        correct,

        wrong,

        total:
          questions.length,

        subject:
          selectedSubject,

        date:
          new Date().toLocaleString(),
      });

    }

  }

  /* SUBJECT SCREEN */

  if (!selectedSubject) {

    return (

      <main
        className={
          darkMode
            ? "min-h-screen bg-black text-white p-6 md:p-10"
            : "min-h-screen bg-gray-100 text-black p-6 md:p-10"
        }
      >

        <section className="text-center">

          <h1 className="text-5xl md:text-7xl font-bold text-blue-700">

            SSC Mock Tests

          </h1>

          <p className="mt-6 text-xl">

            Choose Subject

          </p>

        </section>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-20">

          <button
  onClick={() =>
    setSelectedSubject(
      "General Knowledge"
    )
  }
  className="bg-blue-700 text-white p-10 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 relative"
>

  <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full font-bold text-sm">

    FREE

  </div>

  <div className="text-6xl">
    📚
  </div>

  <h2 className="text-3xl font-bold mt-6">

    General Knowledge

  </h2>

</button>
<div
  className="bg-black text-white p-10 rounded-3xl shadow-xl relative border-4 border-yellow-400"
>

  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">

    PREMIUM

  </div>

  <div className="text-6xl">
    🔒
  </div>

  <h2 className="text-3xl font-bold mt-6">

    Premium Full Mock

  </h2>

  <p className="mt-4 text-gray-300">

    Unlock after Razorpay integration

  </p>

  <div
    className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold inline-block"
  >

    Upgrade Plan

  </div>

</div>

          <button
            onClick={() =>
              setSelectedSubject(
                "Mathematics"
              )
            }
            className="bg-green-600 text-white p-10 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
          >

            <div className="text-6xl">
              ➗
            </div>

            <h2 className="text-3xl font-bold mt-6">

              Mathematics

            </h2>

          </button>

          <button
            onClick={() =>
              setSelectedSubject(
                "English"
              )
            }
            className="bg-yellow-400 text-black p-10 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
          >

            <div className="text-6xl">
              📖
            </div>

            <h2 className="text-3xl font-bold mt-6">

              English

            </h2>

          </button>

          <button
            onClick={() =>
              setSelectedSubject(
                "Reasoning"
              )
            }
            className="bg-red-500 text-white p-10 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
          >

            <div className="text-6xl">
              🧠
            </div>

            <h2 className="text-3xl font-bold mt-6">

              Reasoning

            </h2>

          </button>
          <button
  onClick={() => {

    if (!isPremium) {

      alert(
        "Buy Premium Plan First 🚀"
      );

      window.location.href =
        "/premium";

      return;

    }

    setSelectedSubject(
      "Premium Mock"
    );

  }}
  className="bg-black text-white p-10 rounded-3xl shadow-xl border-4 border-yellow-400 relative"
>

  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">

    PREMIUM

  </div>

  <div className="text-6xl">

    👑

  </div>

  <h2 className="text-3xl font-bold mt-6">

    Premium Full Mock

  </h2>

  <p className="mt-4 text-gray-300">

    Unlock advanced SSC mocks

  </p>

</button>

        </div>

      </main>

    );

  }

  /* LOADING */

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center text-4xl font-bold">

        Loading Questions...

      </main>

    );

  }

  /* REVIEW */

  if (showReview) {

    return (

      <main
        className={
          darkMode
            ? "min-h-screen bg-black text-white p-6 md:p-10"
            : "min-h-screen bg-gray-100 text-black p-6 md:p-10"
        }
      >

        <h1 className="text-5xl font-bold text-center text-blue-700">

          Answer Review

        </h1>

        <div className="grid gap-8 mt-16">

          {questions.map(
            (
              question,
              index
            ) => {

              const userAnswer =
                selectedAnswers[
                  index
                ];

              const isCorrect =
                userAnswer ===
                question.answer;

              return (

                <div
                  key={question.id}
                  className={
                    darkMode
                      ? "bg-gray-900 p-8 rounded-3xl"
                      : "bg-white p-8 rounded-3xl"
                  }
                >

                  <div className="flex justify-between gap-6 flex-wrap">

                    <h2 className="text-2xl font-bold">

                      Q{index + 1}.
                      {" "}
                      {question.question}

                    </h2>

                    <div
                      className={
                        isCorrect
                          ? "bg-green-600 text-white px-5 py-2 rounded-full font-bold"
                          : "bg-red-500 text-white px-5 py-2 rounded-full font-bold"
                      }
                    >

                      {isCorrect
                        ? "Correct"
                        : "Wrong"}

                    </div>

                  </div>

                  <div className="grid gap-4 mt-8">

                    {question.options.map(
                      (
                        option: string,
                        optionIndex: number
                      ) => {

                        const isUser =
                          option ===
                          userAnswer;

                        const isAnswer =
                          option ===
                          question.answer;

                        return (

                          <div
                            key={optionIndex}
                            className={
                              isAnswer
                                ? "bg-green-600 text-white p-5 rounded-2xl font-bold"
                                : isUser
                                ? "bg-red-500 text-white p-5 rounded-2xl font-bold"
                                : darkMode
                                ? "bg-gray-800 p-5 rounded-2xl"
                                : "bg-gray-200 p-5 rounded-2xl"
                            }
                          >

                            {option}

                          </div>

                        );

                      }
                    )}

                  </div>

                </div>

              );

            }
          )}

        </div>

      </main>

    );

  }

  /* RESULT SCREEN */

  if (submitted) {

    return (

      <main
        className={
          darkMode
            ? "min-h-screen bg-black text-white flex items-center justify-center p-6"
            : "min-h-screen bg-gray-100 text-black flex items-center justify-center p-6"
        }
      >

        <div
          className={
            darkMode
              ? "bg-gray-900 p-10 rounded-3xl shadow-xl max-w-2xl w-full text-center"
              : "bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full text-center"
          }
        >

          <h1 className="text-5xl font-bold text-blue-700">

            Test Submitted

          </h1>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="bg-green-600 text-white p-6 rounded-2xl">

              <h2 className="text-xl">

                Correct

              </h2>

              <p className="text-5xl font-bold mt-4">

                {correct}

              </p>

            </div>

            <div className="bg-red-500 text-white p-6 rounded-2xl">

              <h2 className="text-xl">

                Wrong

              </h2>

              <p className="text-5xl font-bold mt-4">

                {wrong}

              </p>

            </div>

            <div className="bg-blue-700 text-white p-6 rounded-2xl">

              <h2 className="text-xl">

                Score

              </h2>

              <p className="text-5xl font-bold mt-4">

                {score}

              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setShowReview(true)
            }
            className="mt-10 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-lg"
          >

            Review Answers

          </button>

        </div>

      </main>

    );

  }

  /* MAIN TEST */

  return (

    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white p-6 md:p-10"
          : "min-h-screen bg-gray-100 text-black p-6 md:p-10"
      }
    >

      <div className="grid lg:grid-cols-4 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-3">

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl"
                : "bg-white p-8 rounded-3xl shadow-xl"
            }
          >

            <div className="flex flex-wrap justify-between gap-6">

              <h1 className="text-3xl font-bold">

                Question
                {" "}
                {currentQuestion + 1}

              </h1>

              <div className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold text-xl">

                ⏰
                {" "}
                {minutes}
                :
                {seconds
                  .toString()
                  .padStart(2, "0")}

              </div>

            </div>

            <div className="mt-10">

              <h2 className="text-2xl font-bold leading-relaxed">

                {
                  questions[
                    currentQuestion
                  ]?.question
                }

              </h2>

            </div>

            <div className="grid gap-5 mt-10">

              {questions[
                currentQuestion
              ]?.options.map(
                (
                  option: string,
                  index: number
                ) => (

                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(
                        option
                      )
                    }
                    className={
                      selectedAnswers[
                        currentQuestion
                      ] === option
                        ? "bg-blue-700 text-white p-5 rounded-2xl text-left font-bold"
                        : darkMode
                        ? "bg-gray-800 p-5 rounded-2xl text-left"
                        : "bg-gray-200 p-5 rounded-2xl text-left"
                    }
                  >

                    {option}

                  </button>

                )
              )}

            </div>

            <div className="flex flex-wrap gap-5 mt-12">

              <button
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion - 1
                  )
                }
                disabled={
                  currentQuestion === 0
                }
                className="bg-gray-500 text-white px-8 py-4 rounded-2xl font-bold disabled:opacity-50"
              >

                Previous

              </button>

              {currentQuestion <
              questions.length - 1 ? (

                <button
                  onClick={() =>
                    setCurrentQuestion(
                      currentQuestion + 1
                    )
                  }
                  className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
                >

                  Save & Next

                </button>

              ) : (

                <button
                  onClick={
                    handleSubmit
                  }
                  className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold"
                >

                  Submit Test

                </button>

              )}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div
            className={
              darkMode
                ? "bg-gray-900 p-6 rounded-3xl shadow-xl sticky top-6"
                : "bg-white p-6 rounded-3xl shadow-xl sticky top-6"
            }
          >

            <h2 className="text-2xl font-bold text-center">

              Question Palette

            </h2>

            <div className="grid grid-cols-5 gap-4 mt-10">

              {questions.map(
                (
                  question,
                  index
                ) => {

                  const isAnswered =
                    selectedAnswers[
                      index
                    ];

                  const isCurrent =
                    currentQuestion ===
                    index;

                  return (

                    <button
                      key={question.id}
                      onClick={() =>
                        setCurrentQuestion(
                          index
                        )
                      }
                      className={
                        isCurrent
                          ? "w-12 h-12 rounded-xl bg-blue-700 text-white font-bold"
                          : isAnswered
                          ? "w-12 h-12 rounded-xl bg-green-600 text-white font-bold"
                          : "w-12 h-12 rounded-xl bg-gray-500 text-white font-bold"
                      }
                    >

                      {index + 1}

                    </button>

                  );

                }
              )}

            </div>

            <div className="mt-10 space-y-5">

              <div className="flex justify-between">

                <span>
                  Attempted
                </span>

                <span className="font-bold text-green-600">

                  {
                    Object.keys(
                      selectedAnswers
                    ).length
                  }

                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Remaining
                </span>

                <span className="font-bold text-red-500">

                  {
                    questions.length -
                    Object.keys(
                      selectedAnswers
                    ).length
                  }

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}