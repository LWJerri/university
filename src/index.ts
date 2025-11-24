const greeting: string = "Привіт, світ!";
const year: number = 2024;
const isStudent: boolean = true;

function displayInfo(message: string, yearValue: number, status: boolean): void {
	console.log(`${message} Рік: ${yearValue}. Я студент? ${status}`);
}

displayInfo(greeting, year, isStudent);
