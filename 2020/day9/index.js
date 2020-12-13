import getInput from "../../util/getInput.js";
import { twoSum } from "../day1/index.js";

export const part1 = (input, pre) => {
	let outlier = 0;

	for (let i = pre; i < input.length; i++) {
		if (twoSum(input.slice(i - pre, i), input[i]).length) {
			continue;
		} else {
			outlier = input[i];
			break;
		}
	}

	return Number(outlier);
};

export const part2 = (input, target) => {
	let i = 0;
	let endIndex;

	for (i; i < input.length; i++) {
		input.slice(i).reduce((acc, current, index, arr) => {
			if (acc === target) {
				endIndex = index;
				arr.splice(1);
			}
			// if it's greater than target, break out of reduce loop
			if (acc > target) arr.splice(1);

			return Number(acc) + Number(current);
		});

		if (endIndex !== undefined) {
			break;
		}
	}

	const range = input.slice(i, i + endIndex);

	return Math.max(...range) + Math.min(...range);
};

const input = getInput(import.meta.url);

console.log("--DAY 9--");
const outlier = part1(input, 25);
console.log("PART 1", outlier);
console.log("PART 2", part2(input, outlier));
