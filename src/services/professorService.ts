import { professors } from "../data/storage";
import { Professor } from "../types/index";

export function addProfessor(professor: Professor): void {
	professors.push(professor);

	console.log(`Professor ${professor.name} added.`);
}
