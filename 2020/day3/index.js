import getInput from "../../util/getInput.js";

const traverse = (input, slope, x = 0, y = 0, count = 0) => {
	if (y >= input.length) return count;

	if (x >= input[0].length) x = x % input[0].length;

	if (input[y][x] === "#") count++;

	return traverse(input, slope, x + slope[0], y + slope[1], count);
};

export const part1 = (input, slope) => traverse(input, slope);

export const part2 = (input, slopes = []) =>
	slopes.map((slope) => traverse(input, slope)).reduce((a, b) => a * b);

const input = getInput(import.meta.url);

console.log("--DAY 3--");
console.log("PART 1", part1(input, [3, 1]));
console.log(
	"PART 2",
	part2(input, [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2],
	])
);
