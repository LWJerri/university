import { classrooms, courses } from "./data/storage";
import { getClassroomUtilization, getMostPopularCourseType } from "./services/analysisService";
import {
	addLesson,
	cancelLesson,
	findAvailableClassrooms,
	getProfessorSchedule,
	reassignClassroom,
} from "./services/lessonService";
import { addProfessor } from "./services/professorService";

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
