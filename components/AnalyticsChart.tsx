"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "@/context/ThemeContext";

const data = [
  {
    subject: "Math",
    score: 85,
  },
  {
    subject: "Reasoning",
    score: 92,
  },
  {
    subject: "English",
    score: 78,
  },
  {
    subject: "GK",
    score: 80,
  },
];

export default function AnalyticsChart() {

  const { darkMode } =
    useTheme();

  return (

    <div
      className={
        darkMode
          ? "bg-gray-900 p-8 rounded-3xl shadow-xl mt-10"
          : "bg-white p-8 rounded-3xl shadow-xl mt-10"
      }
    >

      <h2 className="text-3xl font-bold mb-8">

        Performance Analytics

      </h2>

      <div className="w-full h-[400px]">

        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="subject" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="score"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}