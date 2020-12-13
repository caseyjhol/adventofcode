import getInput from "../../util/getInput.js";

const twoSum = (arr, sum) => {
	const arrMap = new Map();
	let result = [];

	for (let i = 0; i < arr.length; i++) {
		let itemStart = Number(arr[i]),
			itemEnd = Number(arr[arr.length - 1 - i]),
			startDiff = sum - itemStart,
			endDiff = sum - itemEnd;

		let mapDiff = arrMap.get(startDiff) || arrMap.get(endDiff);

		if (mapDiff) {
			result = [mapDiff, sum - mapDiff];
			break;
		} else {
			arrMap.set(itemStart, itemStart);
			arrMap.set(itemEnd, itemEnd);
		}
	}

	return result;
};

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

const sumNext = (input, target, index = 0) => {
	return sumNext(input, target, index);
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
