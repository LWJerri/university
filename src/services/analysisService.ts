import { courses, schedule } from "../data/storage";
import { CourseType } from "../types/index";

export function getClassroomUtilization(classroomNumber: string): number {
	const totalSlots = 5 * 5; // 5 днів * 5 слотів на день
	const occupiedSlots = schedule.filter((lesson) => lesson.classroomNumber === classroomNumber).length;

	if (totalSlots === 0) return 0;

	return (occupiedSlots / totalSlots) * 100;
}

export function getMostPopularCourseType(): CourseType {
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
