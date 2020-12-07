import getInput from "../../../util/getInput.js";
import { part1, part2 } from "../index.js";

getInput(import.meta.url, "\n\n").then((groups) => {
	if (part1(groups) === 11) {
		console.log("PART 1", "PASS");
	} else {
		console.log("PART 1", "FAIL");
	}

	if (part2(groups) === 6) {
		console.log("PART 2", "PASS");
	} else {
		console.log("PART 2", "FAIL");
	}
});
