import {
  interviewQuestions,
  type InterviewCategory,
  type InterviewQuestion,
} from "@/data/interview-questions";

export function getRandomQuestion(
  category?: InterviewCategory
): InterviewQuestion {
  const pool = category
    ? interviewQuestions.filter((q) => q.category === category)
    : interviewQuestions;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getQuestionsByCategory(
  category: InterviewCategory
): InterviewQuestion[] {
  return interviewQuestions.filter((q) => q.category === category);
}

export const interviewCategories: InterviewCategory[] = [
  "Java",
  "System Design",
  "Distributed Systems",
  "Security",
  "Backend",
  "Behavioral",
];
