import getInput from "../../../util/getInput.js";
import { part1, part2 } from "../index.js";

const test = (input, slope, answer) => {
	if (part1(input, slope) === answer) {
		console.log("PART 1", slope, "PASS");
	} else {
		console.log("PART 1", slope, "FAIL");
	}
};

getInput(import.meta.url).then((input) => {
	test(input, [1, 1], 2);
	test(input, [3, 1], 7);
	test(input, [5, 1], 3);
	test(input, [7, 1], 4);
	test(input, [1, 2], 2);

	if (
		part2(input, [
			[1, 1],
			[3, 1],
			[5, 1],
			[7, 1],
			[1, 2],
		]) === 336
	) {
		console.log("PART 2", "PASS");
	} else {
		console.log("PART 2", "FAIL");
	}
});
