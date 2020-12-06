import getInput from "../../../util/getInput.js";
import { getPassports, part1, part2 } from "../index.js";

getInput(import.meta.url, "\n\n").then((input) => {
	const passports = getPassports(input);

	if (part1(passports) === 2) {
		console.log("PART 1", "PASS");
	} else {
		console.log("PART 1", "FAIL");
	}

	if (part2(passports) === 2) {
		console.log("PART 2", "PASS");
	} else {
		console.log("PART 2", "FAIL");
	}
});
