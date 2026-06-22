"use client";

import { useState } from "react";
import { QuizQuestion, QuizUnit } from "@/data/quizData";

type Props = {
  question: QuizQuestion;
  unit: QuizUnit;
};

export default function PassageBox({ question, unit }: Props) {
  const [open, setOpen] = useState(true);

  if (question.section === "vocabulary") return null;

  const passage = unit.passages.find((item) => item.id === question.section);
  if (!passage) return null;

  return (
    <section className="rounded-3xl border border-sky-100 bg-sky-50 p-4">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 font-extrabold text-sky-700"
      >
        <span>
          {question.section === "reading1" ? "Reading 1" : "Reading 2"} · {passage.title}
        </span>
        <span className="shrink-0">{open ? "지문 숨기기" : "지문 보기"} 🐾</span>
      </button>

      {open && (
        <div className="mt-3 text-base leading-relaxed text-slate-800">
          {passage.passage.map((line, index) =>
            line === "" ? (
              <div key={`${passage.id}-${index}`} className="h-2" />
            ) : (
              <p key={`${passage.id}-${index}`}>{line}</p>
            )
          )}
        </div>
      )}
    </section>
  );
}
