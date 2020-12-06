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

const threeSum = (arr, sum) => {
	let result = [];

	for (let i = 0; i < arr.length; i++) {
		const indices = twoSum(arr, sum - arr[i]);
		if (indices.length && !indices.includes(arr[i])) {
			result = [...new Set([...result, ...indices])];
		}
	}

	return result;
};

export const part1 = (input, target) =>
	twoSum(input, target).reduce((a, b) => a * b);

export const part2 = (input, target) =>
	threeSum(input, target).reduce((a, b) => a * b);

getInput(import.meta.url).then((input) => {
	console.log("--DAY 1--");
	console.log("PART 1", part1(input, 2020));
	console.log("PART 2", part2(input, 2020));
});
