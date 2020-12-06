import getInput from "../../util/getInput.js";

const getRule = (line) => {
	const split = line.split(" "),
		bounds = split[0].split("-"),
		min = bounds[0],
		max = bounds[1],
		character = split[1].charAt(0),
		password = split[split.length - 1];

	return {
		min,
		max,
		character,
		password,
	};
};

const checkValid1 = (line) => {
	const { min, max, character, password } = getRule(line);
	const charCount = password.length - password.split(character).join("").length;

	return charCount <= max && charCount >= min;
};

const checkValid2 = (line) => {
	const { min, max, character, password } = getRule(line);
	const firstChar = password.charAt(min - 1) === character;
	const secondChar = password.charAt(max - 1) === character;

	return firstChar !== secondChar && (firstChar || secondChar);
};

const getValid = (arr, isValid) => {
	let valid = [];

	for (let i = 0; i < arr.length; i++) {
		if (isValid(arr[i])) {
			valid.push(true);
		}
	}

	return valid.length;
};

export const part1 = (input) => getValid(input, checkValid1);

export const part2 = (input) => getValid(input, checkValid2);

getInput(import.meta.url).then((input) => {
	console.log("--DAY 2--");
	console.log("PART 1", part1(input));
	console.log("PART 2", part2(input));
});
