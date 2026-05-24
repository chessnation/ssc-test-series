"use client";

import {
  useEffect,
  useState,
} from "react";

import { useTheme } from "@/context/ThemeContext";

import {
  addQuestion,
  deleteQuestion,
  getQuestions,
} from "@/firebase/admin";

export default function AdminPage() {

  const { darkMode } =
    useTheme();

  const [question,
    setQuestion] =
    useState("");

  const [option1,
    setOption1] =
    useState("");

  const [option2,
    setOption2] =
    useState("");

  const [option3,
    setOption3] =
    useState("");

  const [option4,
    setOption4] =
    useState("");

  const [answer,
    setAnswer] =
    useState("");

  const [subject,
    setSubject] =
    useState("");

  const [premium,
    setPremium] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [questions,
    setQuestions] =
    useState<any[]>([]);

  useEffect(() => {

    loadQuestions();

  }, []);

  async function loadQuestions() {

    const data =
      await getQuestions();

    setQuestions(data);

  }

  async function handleAddQuestion() {

    if (
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !answer ||
      !subject
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    setLoading(true);

    const success =
      await addQuestion({
        question,

        options: [
          option1,
          option2,
          option3,
          option4,
        ],

        answer,

        subject,

        premium,
      });

    setLoading(false);

    if (success) {

      alert(
        "Question Added Successfully"
      );

      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setAnswer("");
      setSubject("");
      setPremium(false);

      loadQuestions();

    }
    else {

      alert(
        "Something went wrong"
      );

    }

  }

  async function handleDelete(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Delete this question?"
      );

    if (!confirmDelete)
      return;

    const success =
      await deleteQuestion(id);

    if (success) {

      alert(
        "Question Deleted"
      );

      loadQuestions();

    }

  }

  return (

    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white p-6 md:p-10"
          : "min-h-screen bg-gray-100 text-black p-6 md:p-10"
      }
    >

      <div className="max-w-3xl mx-auto">

        <div
          className={
            darkMode
              ? "bg-gray-900 p-10 rounded-3xl shadow-xl"
              : "bg-white p-10 rounded-3xl shadow-xl"
          }
        >

          <h1 className="text-4xl font-bold text-center text-blue-700">

            Admin Panel

          </h1>

          <p className="text-center mt-4 text-lg">

            Add New SSC Questions

          </p>

          {/* QUESTION */}

          <div className="mt-10">

            <label className="font-bold text-lg">

              Question

            </label>

            <textarea
              value={question}
              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }
              placeholder="Enter question"
              className="w-full mt-3 p-4 rounded-2xl border text-black"
              rows={4}
            />

          </div>

          {/* OPTIONS */}

          <div className="grid gap-5 mt-8">

            <input
              type="text"
              value={option1}
              onChange={(e) =>
                setOption1(
                  e.target.value
                )
              }
              placeholder="Option 1"
              className="p-4 rounded-2xl border text-black"
            />

            <input
              type="text"
              value={option2}
              onChange={(e) =>
                setOption2(
                  e.target.value
                )
              }
              placeholder="Option 2"
              className="p-4 rounded-2xl border text-black"
            />

            <input
              type="text"
              value={option3}
              onChange={(e) =>
                setOption3(
                  e.target.value
                )
              }
              placeholder="Option 3"
              className="p-4 rounded-2xl border text-black"
            />

            <input
              type="text"
              value={option4}
              onChange={(e) =>
                setOption4(
                  e.target.value
                )
              }
              placeholder="Option 4"
              className="p-4 rounded-2xl border text-black"
            />

          </div>

          {/* SUBJECT */}

          <div className="mt-8">

            <label className="font-bold text-lg">

              Subject

            </label>

            <select
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              className="w-full mt-3 p-4 rounded-2xl border text-black"
            >

              <option value="">
                Select Subject
              </option>

              <option value="General Knowledge">
                General Knowledge
              </option>

              <option value="Mathematics">
                Mathematics
              </option>

              <option value="English">
                English
              </option>

              <option value="Reasoning">
                Reasoning
              </option>

            </select>

          </div>

          {/* PREMIUM */}

          <div className="mt-8">

            <label className="font-bold text-lg">

              Test Type

            </label>

            <select
              value={
                premium
                  ? "premium"
                  : "free"
              }
              onChange={(e) =>
                setPremium(
                  e.target.value ===
                    "premium"
                )
              }
              className="w-full mt-3 p-4 rounded-2xl border text-black"
            >

              <option value="free">

                Free Test

              </option>

              <option value="premium">

                Premium Test

              </option>

            </select>

          </div>

          {/* ANSWER */}

          <div className="mt-8">

            <label className="font-bold text-lg">

              Correct Answer

            </label>

            <input
              type="text"
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              placeholder="Correct answer"
              className="w-full mt-3 p-4 rounded-2xl border text-black"
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={
              handleAddQuestion
            }
            disabled={loading}
            className="w-full mt-10 bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >

            {loading
              ? "Adding..."
              : "Add Question"}

          </button>

        </div>

      </div>

      {/* QUESTION LIST */}

      <div className="max-w-5xl mx-auto mt-20">

        <h2 className="text-4xl font-bold text-center text-blue-700">

          All Questions

        </h2>

        <div className="grid gap-8 mt-10">

          {questions.map(
            (
              item,
              index
            ) => (

              <div
                key={item.id}
                className={
                  darkMode
                    ? "bg-gray-900 p-8 rounded-3xl shadow-xl"
                    : "bg-white p-8 rounded-3xl shadow-xl"
                }
              >

                <div className="flex flex-wrap justify-between gap-6">

                  <div>

                    <h3 className="text-2xl font-bold">

                      Q{index + 1}.
                      {" "}
                      {item.question}

                    </h3>

                    <div className="flex flex-wrap gap-3 mt-4">

                      <div className="bg-blue-700 text-white inline-block px-4 py-2 rounded-full font-bold">

                        {item.subject}

                      </div>

                      <div
                        className={
                          item.premium
                            ? "bg-yellow-400 text-black inline-block px-4 py-2 rounded-full font-bold"
                            : "bg-green-600 text-white inline-block px-4 py-2 rounded-full font-bold"
                        }
                      >

                        {item.premium
                          ? "Premium"
                          : "Free"}

                      </div>

                    </div>

                    <div className="grid gap-3 mt-6">

                      {item.options.map(
                        (
                          option: string,
                          optionIndex: number
                        ) => (

                          <div
                            key={optionIndex}
                            className={
                              option ===
                              item.answer
                                ? "bg-green-600 text-white p-4 rounded-2xl font-bold"
                                : darkMode
                                ? "bg-gray-800 p-4 rounded-2xl"
                                : "bg-gray-200 p-4 rounded-2xl"
                            }
                          >

                            {option}

                          </div>

                        )
                      )}

                    </div>

                  </div>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDelete(
                        item.id
                      )
                    }
                    className="bg-red-500 text-white px-6 py-4 rounded-2xl font-bold h-fit hover:scale-105 transition-all duration-300"
                  >

                    Delete

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  );

}