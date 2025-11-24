type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = {
	id: number;
	name: string;
	department: string;
};

type Classroom = {
	number: string;
	capacity: number;
	hasProjector: boolean;
};

type Course = {
	id: number;
	name: string;
	type: CourseType;
};

type Lesson = {
	courseId: number;
	professorId: number;
	classroomNumber: string;
	dayOfWeek: DayOfWeek;
	timeSlot: TimeSlot;
};

type ScheduleConflict = {
	type: "ProfessorConflict" | "ClassroomConflict";
	lessonDetails: Lesson;
};

let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];

function addProfessor(professor: Professor): void {
	professors.push(professor);

	console.log(`Professor ${professor.name} added.`);
}

function validateLesson(lesson: Lesson): ScheduleConflict | null {
	// Чи має професор вже заняття в цей час
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

function addLesson(lesson: Lesson): boolean {
	const conflict = validateLesson(lesson);

	if (conflict) {
		console.error(`Cannot add lesson. Conflict type: ${conflict.type}`);

		return false;
	}

	schedule.push(lesson);

	console.log(`Lesson for course ${lesson.courseId} added.`);

	return true;
}

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
	const occupiedClassrooms = schedule
		.filter((lesson) => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
		.map((lesson) => lesson.classroomNumber);

	return classrooms
		.filter((classroom) => !occupiedClassrooms.includes(classroom.number))
		.map((classroom) => classroom.number);
}

function getProfessorSchedule(professorId: number): Lesson[] {
	return schedule.filter((lesson) => lesson.professorId === professorId);
}

function getClassroomUtilization(classroomNumber: string): number {
	const totalSlots = 5 * 5; // 5 днів * 5 слотів на день
	const occupiedSlots = schedule.filter((lesson) => lesson.classroomNumber === classroomNumber).length;

	if (totalSlots === 0) return 0;

	return (occupiedSlots / totalSlots) * 100;
}

function getMostPopularCourseType(): CourseType {
	const typeCounts: { [key in CourseType]?: number } = { Lecture: 0, Seminar: 0, Lab: 0, Practice: 0 };

	schedule.forEach((lesson) => {
		const course = courses.find((c) => c.id === lesson.courseId);

		if (course && course.type) {
			typeCounts[course.type] = (typeCounts[course.type] || 0) + 1;
		}
	});

	let mostPopularType: CourseType = "Lecture";
	let maxCount = 0;

	for (const type in typeCounts) {
		const count = typeCounts[type as CourseType] || 0;

		if (count > maxCount) {
			maxCount = count;
			mostPopularType = type as CourseType;
		}
	}

	return mostPopularType;
}

function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
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

function cancelLesson(lessonId: number): void {
	if (lessonId >= 0 && lessonId < schedule.length) {
		schedule.splice(lessonId, 1);

		console.log(`Lesson ${lessonId} cancelled.`);
	} else {
		console.error("Lesson not found.");
	}
}

console.log("--- Initialization ---");
addProfessor({ id: 1, name: "Dr. Smith", department: "Physics" });
addProfessor({ id: 2, name: "Dr. Doe", department: "Math" });

classrooms.push({ number: "101", capacity: 30, hasProjector: true });
classrooms.push({ number: "102", capacity: 20, hasProjector: false });

courses.push({ id: 1, name: "Physics 101", type: "Lecture" });
courses.push({ id: 2, name: "Math 101", type: "Seminar" });

console.log("\n--- Adding Lessons ---");
addLesson({ courseId: 1, professorId: 1, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" });
addLesson({ courseId: 2, professorId: 2, classroomNumber: "102", dayOfWeek: "Monday", timeSlot: "8:30-10:00" });

console.log("\n--- Conflict Test (Classroom) ---");
addLesson({ courseId: 2, professorId: 2, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" });

console.log("\n--- Analysis ---");
console.log("Available classrooms on Monday 10:15-11:45:", findAvailableClassrooms("10:15-11:45", "Monday"));
console.log("Professor 1 Schedule:", getProfessorSchedule(1));
console.log("Classroom 101 Utilization:", getClassroomUtilization("101") + "%");
console.log("Most Popular Course Type:", getMostPopularCourseType());

console.log("\n--- Modification ---");
reassignClassroom(0, "102");
cancelLesson(1);
reassignClassroom(0, "102");
