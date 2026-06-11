// Helpers de progreso para el modulo de capacitaciones.

import type { Course } from "@/mock/paco";
import type { LessonState } from "@/store/paco-store";

export const lessonKey = (courseId: string, lessonId: string) => `${courseId}:${lessonId}`;

export function completedLessons(course: Course, lessonStates: Record<string, LessonState>) {
  return course.lessons.filter((lesson) => lessonStates[lessonKey(course.id, lesson.id)]?.completed).length;
}

export function isLessonLocked(course: Course, lessonIndex: number, lessonStates: Record<string, LessonState>) {
  if (lessonIndex === 0) return false;
  const previous = course.lessons[lessonIndex - 1];
  if (!previous) return false;
  return !lessonStates[lessonKey(course.id, previous.id)]?.completed;
}

export function courseProgress(
  course: Course,
  lessonStates: Record<string, LessonState>,
  evaluationDone: Record<string, boolean>,
  satisfactionDone: Record<string, boolean>,
  finishedCourses: string[],
) {
  if (finishedCourses.includes(course.id)) return 100;
  const steps = course.lessons.length + (course.evaluation ? 1 : 0) + (course.satisfaction ? 1 : 0);
  let done = completedLessons(course, lessonStates);
  if (course.evaluation && evaluationDone[course.id]) done += 1;
  if (course.satisfaction && satisfactionDone[course.id]) done += 1;
  const computed = Math.round((done / Math.max(1, steps)) * 100);
  return Math.max(course.initialProgress, Math.min(99, computed));
}

export function courseStatus(
  course: Course,
  lessonStates: Record<string, LessonState>,
  finishedCourses: string[],
): "Pendiente" | "En curso" | "Finalizado" {
  if (finishedCourses.includes(course.id)) return "Finalizado";
  if (completedLessons(course, lessonStates) > 0 || course.initialStatus === "En curso") return "En curso";
  return "Pendiente";
}
