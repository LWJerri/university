enum StudentStatus {
	Active = "Active",
	Academic_Leave = "Academic_Leave",
	Graduated = "Graduated",
	Expelled = "Expelled",
}

enum CourseType {
	Mandatory = "Mandatory",
	Optional = "Optional",
	Special = "Special",
}

enum Semester {
	First = "First",
	Second = "Second",
}

enum GradeValue {
	Excellent = 5,
	Good = 4,
	Satisfactory = 3,
	Unsatisfactory = 2,
}

enum Faculty {
	Computer_Science = "Computer_Science",
	Economics = "Economics",
	Law = "Law",
	Engineering = "Engineering",
}

interface Student {
	id: number;
	fullName: string;
	faculty: Faculty;
	year: number;
	status: StudentStatus;
	enrollmentDate: Date;
	groupNumber: string;
}

interface Course {
	id: number;
	name: string;
	type: CourseType;
	credits: number;
	semester: Semester;
	faculty: Faculty;
	maxStudents: number;
}

interface Grade {
	studentId: number;
	courseId: number;
	grade: GradeValue;
	date: Date;
	semester: Semester;
}

type Registration = {
	studentId: number;
	courseId: number;
};

class UniversityManagementSystem {
	private students: Student[] = [];
	private courses: Course[] = [];
	private grades: Grade[] = [];
	private registrations: Registration[] = [];
	private nextStudentId: number = 1;
	private nextCourseId: number = 1;

	public enrollStudent(studentInfo: Omit<Student, "id">): Student {
		const newStudent: Student = {
			...studentInfo,
			id: this.nextStudentId++,
		};

		this.students.push(newStudent);

		console.log(`Студента ${newStudent.fullName} зараховано на факультет ${newStudent.faculty}. ID: ${newStudent.id}`);

		return newStudent;
	}

	public addCourse(courseInfo: Omit<Course, "id">): Course {
		const newCourse: Course = { ...courseInfo, id: this.nextCourseId++ };

		this.courses.push(newCourse);

		console.log(`Курс "${newCourse.name}" створено. ID: ${newCourse.id}`);

		return newCourse;
	}

	public registerForCourse(studentId: number, courseId: number): void {
		const student = this.students.find((s) => s.id === studentId);
		const course = this.courses.find((c) => c.id === courseId);

		if (!student) {
			console.error(`Помилка: Студента з ID ${studentId} не знайдено.`);

			return;
		}

		if (!course) {
			console.error(`Помилка: Курс з ID ${courseId} не знайдено.`);

			return;
		}

		if (student.status !== StudentStatus.Active) {
			console.error(
				`Помилка: Студент ${student.fullName} не активний (Статус: ${student.status}). Реєстрація неможлива.`,
			);

			return;
		}

		if (course.type === CourseType.Mandatory && student.faculty !== course.faculty) {
			console.warn(
				`Попередження: Студент факультету ${student.faculty} реєструється на обов'язковий курс факультету ${course.faculty}.`,
			);
		}

		const registeredCount = this.registrations.filter((r) => r.courseId === courseId).length;

		if (registeredCount >= course.maxStudents) {
			console.error(`Помилка: На курсі "${course.name}" немає вільних місць.`);

			return;
		}

		const isAlreadyRegistered = this.registrations.some((r) => r.studentId === studentId && r.courseId === courseId);

		if (isAlreadyRegistered) {
			console.error(`Помилка: Студент вже зареєстрований на цей курс.`);

			return;
		}

		this.registrations.push({ studentId, courseId });

		console.log(`Студент ${student.fullName} успішно зареєстрований на курс "${course.name}".`);
	}

	public setGrade(studentId: number, courseId: number, gradeVal: GradeValue): void {
		const isRegistered = this.registrations.some((r) => r.studentId === studentId && r.courseId === courseId);

		if (!isRegistered) {
			console.error(
				`Помилка: Студент ID ${studentId} не зареєстрований на курс ID ${courseId}. Оцінку виставити неможливо.`,
			);

			return;
		}

		const course = this.courses.find((c) => c.id === courseId);

		if (!course) return;

		const newGrade: Grade = { studentId, courseId, grade: gradeVal, date: new Date(), semester: course.semester };

		this.grades.push(newGrade);

		console.log(`Оцінка ${gradeVal} виставлена студенту ID ${studentId} за курс "${course.name}".`);
	}

	public updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
		const student = this.students.find((s) => s.id === studentId);

		if (!student) {
			console.error(`Студента з ID ${studentId} не знайдено.`);

			return;
		}

		if (student.status === StudentStatus.Expelled && newStatus === StudentStatus.Active) {
			console.log(`Поновлення відрахованого студента ${student.fullName}.`);
		}

		if (student.status === StudentStatus.Graduated) {
			console.error(`Помилка: Не можна змінити статус випускника.`);

			return;
		}

		student.status = newStatus;

		console.log(`Статус студента ${student.fullName} змінено на ${newStatus}.`);
	}

	public getStudentsByFaculty(faculty: Faculty): Student[] {
		return this.students.filter((s) => s.faculty === faculty);
	}

	public getStudentGrades(studentId: number): Grade[] {
		return this.grades.filter((g) => g.studentId === studentId);
	}

	public getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
		return this.courses.filter((c) => c.faculty === faculty && c.semester === semester);
	}

	public calculateAverageGrade(studentId: number): number {
		const studentGrades = this.getStudentGrades(studentId);

		if (studentGrades.length === 0) return 0;

		const sum = studentGrades.reduce((acc, g) => acc + g.grade, 0);

		return parseFloat((sum / studentGrades.length).toFixed(2));
	}

	public getExcellentStudentsByFaculty(faculty: Faculty): Student[] {
		const facultyStudents = this.getStudentsByFaculty(faculty);

		return facultyStudents.filter((student) => {
			if (student.status !== StudentStatus.Active) return false;

			const avgGrade = this.calculateAverageGrade(student.id);

			return avgGrade >= 4.5;
		});
	}
}

console.log("=== ПОЧАТОК ТЕСТУВАННЯ СИСТЕМИ УНІВЕРСИТЕТУ ===\n");

const system = new UniversityManagementSystem();

const cs101 = system.addCourse({
	name: "Introduction to CS",
	type: CourseType.Mandatory,
	credits: 5,
	semester: Semester.First,
	faculty: Faculty.Computer_Science,
	maxStudents: 30,
});

const math101 = system.addCourse({
	name: "Calculus I",
	type: CourseType.Mandatory,
	credits: 6,
	semester: Semester.First,
	faculty: Faculty.Computer_Science,
	maxStudents: 50,
});

const history101 = system.addCourse({
	name: "History of Economics",
	type: CourseType.Optional,
	credits: 3,
	semester: Semester.First,
	faculty: Faculty.Economics,
	maxStudents: 20,
});

console.log("\n--- Зарахування студентів ---");

const student1 = system.enrollStudent({
	fullName: "Іван Петренко",
	faculty: Faculty.Computer_Science,
	year: 1,
	status: StudentStatus.Active,
	enrollmentDate: new Date(),
	groupNumber: "CS-101",
});

const student2 = system.enrollStudent({
	fullName: "Марія Сидоренко",
	faculty: Faculty.Computer_Science,
	year: 1,
	status: StudentStatus.Active,
	enrollmentDate: new Date(),
	groupNumber: "CS-101",
});

const student3 = system.enrollStudent({
	fullName: "Олег Коваленко",
	faculty: Faculty.Economics,
	year: 2,
	status: StudentStatus.Active,
	enrollmentDate: new Date(),
	groupNumber: "ECO-201",
});

console.log("\n--- Реєстрація на курси ---");
system.registerForCourse(student1.id, cs101.id);
system.registerForCourse(student1.id, math101.id);
system.registerForCourse(student2.id, cs101.id);
system.registerForCourse(student1.id, history101.id);
system.registerForCourse(999, cs101.id);

console.log("\n--- Виставлення оцінок ---");

system.setGrade(student1.id, cs101.id, GradeValue.Excellent);
system.setGrade(student1.id, math101.id, GradeValue.Good);

system.setGrade(student2.id, cs101.id, GradeValue.Excellent);

system.setGrade(student3.id, cs101.id, GradeValue.Satisfactory);

console.log("\n--- Зміна статусу ---");
system.updateStudentStatus(student3.id, StudentStatus.Academic_Leave);
system.updateStudentStatus(student3.id, StudentStatus.Active);

console.log("\n--- Аналітика ---");
const csStudents = system.getStudentsByFaculty(Faculty.Computer_Science);
console.log(`Студентів на CS: ${csStudents.length}`);

const avgGrade1 = system.calculateAverageGrade(student1.id);
console.log(`Середній бал студента ${student1.fullName}: ${avgGrade1}`);

const availableCSFirst = system.getAvailableCourses(Faculty.Computer_Science, Semester.First);
console.log(
	`Доступні курси для CS (1 семестр):`,
	availableCSFirst.map((c) => c.name),
);

console.log("\n--- Відмінники ---");
const excellentStudents = system.getExcellentStudentsByFaculty(Faculty.Computer_Science);
console.log(
	"Відмінники CS:",
	excellentStudents.map((s) => s.fullName),
);
