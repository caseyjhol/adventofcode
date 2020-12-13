import getInput from "../../../util/getInput.js";
import { part1, part2 } from "../index.js";

const input = getInput(import.meta.url);

if (part1(input) === 2) {
	console.log("PART 1", "PASS");
} else {
	console.log("PART 1", "FAIL");
}

if (part2(input) === 1) {
	console.log("PART 2", "PASS");
} else {
	console.log("PART 2", "FAIL");
}
