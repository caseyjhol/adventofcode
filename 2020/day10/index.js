import getInput from "../../util/getInput.js";

const getDiff = (
	input,
	prev = 0,
	index = 0,
	tracker = {
		count1: 0,
		// built-in is always 3 higher, so start count at 1
		count3: 1,
	}
) => {
	const current = input[index];
	const diff = current - prev;

	index++;

	tracker[`count${diff}`]++;

	if (index === input.length) return tracker;

	return getDiff(input, current, index, tracker);
};

export const part1 = (input) => {
	input.sort((a, b) => a - b);

	const { count1, count3 } = getDiff(input);

	return count1 * count3;
};

export const part2 = (input) => {
	input.sort((a, b) => a - b);
	const highest = input[input.length - 1];
	input.push(highest + 3);

	const cache = new Map();

	function findCombinations(currentEnd, adapters) {
		if (currentEnd === highest) {
			return 1;
		}

		let combinationCount = 0;

		for (let i = 1; i <= 3; i++) {
			const nextEnd = currentEnd + i;
			const nextIndex = adapters.indexOf(nextEnd);

			if (nextIndex !== -1) {
				const remaining = adapters.slice(nextIndex);

				if (!cache.has(nextEnd)) {
					cache.set(nextEnd, findCombinations(nextEnd, remaining));
				}

				combinationCount += cache.get(nextEnd);
			}
		}

		return combinationCount;
	}

	return findCombinations(0, input);
};

const input = getInput(import.meta.url, undefined, Number);

console.log("--DAY 10--");
console.log("PART 1", part1(input));
console.log("PART 2", part2(input));
