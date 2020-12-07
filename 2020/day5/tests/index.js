import { getId, part2 } from "../index.js";

const pass1 = "FBFBBFFRLR",
	pass2 = "BFFFBBFRRR";

if (getId(pass1) === 357) {
	console.log("PART 1", "PASS");
} else {
	console.log("PART 1", "FAIL");
}

if (getId(pass2) === 567) {
	console.log("PART 1", "PASS");
} else {
	console.log("PART 1", "FAIL");
}

if (part2([1, 2, 3, 4, 6, 7, 8]) === 5) {
	console.log("PART 2", "PASS");
} else {
	console.log("PART 2", "FAIL");
}
