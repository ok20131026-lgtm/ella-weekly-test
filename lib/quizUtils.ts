import { QuizQuestion, QuizUnit } from "@/data/quizData";

export type AnswerRecord = { question: QuizQuestion; selectedIndex: number; isCorrect: boolean };

export const AREA_LABELS = { vocabulary: "단어", reading1: "Reading 1", reading2: "Reading 2", all: "전체" } as const;

export const getScore = (answers: AnswerRecord[]) => answers.filter((answer) => answer.isCorrect).length;
export const getAccuracy = (correct: number, total: number) => total === 0 ? 0 : Math.round((correct / total) * 100);
export const getBestScoreKey = (unitId: string) => `ella-weekly-best-${unitId}`;
export const filterWrongAnswers = (answers: AnswerRecord[]) => answers.filter((answer) => !answer.isCorrect);
export const getStoredAnswer = (answers: AnswerRecord[], questionId: string) => answers.find((answer) => answer.question.id === questionId);
export const getActiveUnits = (units: QuizUnit[]) => units.filter((unit) => unit.status === "active");

export const getSolvingGuide = (type: string) => {
  const guides: Record<string, string> = {
    "영영정의형": "영영정의의 핵심 단어를 보고 알맞은 영어 단어를 고르세요.",
    "본문 직접형": "지문에서 같은 표현이나 거의 같은 문장을 찾아 확인하세요.",
    "문장 재표현형": "본문 문장이 질문 형태로 바뀐 문제입니다.",
    "원인·이유형": "본문의 앞뒤 사건을 연결해 이유를 확인하세요.",
    "결과·사건 흐름형": "한 문장만 보지 말고 사건 순서를 따라가세요.",
    "순서 확인형": "FIRST, NEXT, AFTER, before를 보고 순서를 확인하세요.",
    "핵심 개념 적용형": "본문에 나온 개념을 보기 중에서 찾아 적용하세요.",
    "교훈·주제형": "이야기 전체가 말하려는 핵심 생각을 고르세요."
  };
  return guides[type] ?? "문제 유형을 확인하고 지문에서 근거를 찾으세요.";
};
