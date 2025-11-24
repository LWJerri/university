import { classrooms, schedule } from "../data/storage";
import { DayOfWeek, Lesson, ScheduleConflict, TimeSlot } from "../types/index";

export function validateLesson(lesson: Lesson): ScheduleConflict | null {
	const isLessonsConflicts = schedule.find(
		(l) => l.professorId === lesson.professorId && l.dayOfWeek === lesson.dayOfWeek && l.timeSlot === lesson.timeSlot,
	);

	if (isLessonsConflicts) return { type: "ProfessorConflict", lessonDetails: isLessonsConflicts };

	const isClassroomConflict = schedule.find(
		(l) =>
			l.classroomNumber === lesson.classroomNumber &&
			l.dayOfWeek === lesson.dayOfWeek &&
			l.timeSlot === lesson.timeSlot,
	);

	if (isClassroomConflict) return { type: "ClassroomConflict", lessonDetails: isClassroomConflict };

	return null;
}

export function addLesson(lesson: Lesson): boolean {
	const conflict = validateLesson(lesson);

	if (conflict) {
		console.error(`Cannot add lesson. Conflict type: ${conflict.type}`);

		return false;
	}

	schedule.push(lesson);

	console.log(`Lesson for course ${lesson.courseId} added.`);

	return true;
}

export function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
	const occupiedClassrooms = schedule
		.filter((lesson) => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
		.map((lesson) => lesson.classroomNumber);

	return classrooms
		.filter((classroom) => !occupiedClassrooms.includes(classroom.number))
		.map((classroom) => classroom.number);
}

export function getProfessorSchedule(professorId: number): Lesson[] {
	return schedule.filter((lesson) => lesson.professorId === professorId);
}

export function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
	if (lessonId < 0 || lessonId >= schedule.length) {
		console.error("Lesson not found.");

		return false;
	}

	const lesson = schedule[lessonId];
	const newLessonCandidate = { ...lesson, classroomNumber: newClassroomNumber };

	const isClassroomConflict = schedule.find(
		(l) =>
			l.classroomNumber === newClassroomNumber &&
			l.dayOfWeek === lesson.dayOfWeek &&
			l.timeSlot === lesson.timeSlot &&
			schedule.indexOf(l) !== lessonId,
	);

	if (isClassroomConflict) {
		console.error("New classroom is occupied.");

		return false;
	}

	schedule[lessonId] = newLessonCandidate;

	console.log(`Lesson reassigned to classroom ${newClassroomNumber}.`);

	return true;
}

export function cancelLesson(lessonId: number): void {
	if (lessonId >= 0 && lessonId < schedule.length) {
		schedule.splice(lessonId, 1);

		console.log(`Lesson ${lessonId} cancelled.`);
	} else {
		console.error("Lesson not found.");
	}
}
