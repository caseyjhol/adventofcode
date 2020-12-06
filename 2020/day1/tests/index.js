import { part1, part2 } from "../index.js";

const numbers1 = [23, 325, 21, 3, 5, 9],
	numbers2 = [4, 74, 22, 91, 2, 77, 451];

if (part1(numbers1, 334) === 2925) {
	console.log("PART 1", "PASS");
} else {
	console.log("PART 1", "FAIL");
}

if (part1(numbers2, 93) === 182) {
	console.log("PART 1", "PASS");
} else {
	console.log("PART 1", "FAIL");
}

if (part2(numbers1, 31) === 345) {
	console.log("PART 2", "PASS");
} else {
	console.log("PART 2", "FAIL");
}

if (part2(numbers2, 547) === 734228) {
	console.log("PART 2", "PASS");
} else {
	console.log("PART 2", "FAIL");
}
