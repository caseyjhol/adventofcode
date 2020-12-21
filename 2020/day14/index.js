import getInput from "../../util/getInput.js";

const getMask = (line) => {
	return line
		.split("mask = ")[1]
		.split("")
		.map((num, index) => {
			if (num === "X") {
				return null;
			} else {
				return {
					num,
					index,
				};
			}
		})
		.filter((x) => x);
};

const applyMask = (number, masks) => {
	const numArr = Array.from(number.padStart(36, "0"));

	for (let i = 0; i < masks.length; i++) {
		const mask = masks[i];

		numArr[mask.index] = mask.num;
	}

	return parseInt(numArr.join(""), 2);
};

const getAssign = (line, convert = true) => {
	const match = line.match(/^mem\[(\d+)\] = (\d+)$/);
	return [
		Number(match[1]),
		convert ? Number(match[2]).toString(2) : Number(match[2]),
	];
};

export const part1 = (input) => {
	const mem = new Map();

	let currentMask;

	for (let i = 0; i < input.length; i++) {
		const line = input[i];

		if (line.startsWith("mask")) {
			currentMask = getMask(line);
			continue;
		}

		const [index, number] = getAssign(line);

		const maskedNumber = applyMask(number, currentMask);

		mem.set(index, maskedNumber);
	}

	return [...mem.values()].reduce((a, b) => a + b);
};

const getMaskV2 = (line) => {
	return line
		.split("mask = ")[1]
		.split("")
		.map((num, index) => {
			if (num === "0") {
				return null;
			} else {
				return {
					num,
					index,
				};
			}
		})
		.filter((x) => x);
};

const convertFloater = (address, index = 0, addresses = []) => {
	if (index === address.length) {
		addresses.push(address.join(""));
		return;
	}

	if (address[index] === "X") {
		address[index] = "0";
		convertFloater(address, index + 1, addresses);
		address[index] = "1";
		convertFloater(address, index + 1, addresses);

		address[index] = "X";
	} else {
		convertFloater(address, index + 1, addresses);
	}

	return addresses;
};

const applyMaskV2 = (number, masks) => {
	const numArr = Array.from(number.toString(2).padStart(36, "0"));

	for (let i = 0; i < masks.length; i++) {
		const mask = masks[i];

		numArr[mask.index] = mask.num;
	}

	return convertFloater(numArr);
};

export const part2 = (input) => {
	const mem = new Map();

	let currentMask;

	for (let i = 0; i < input.length; i++) {
		const line = input[i];

		if (line.startsWith("mask")) {
			currentMask = getMaskV2(line);
			continue;
		}

		const [index, number] = getAssign(line, false);

		applyMaskV2(index, currentMask).map((num) => {
			mem.set(parseInt(num, 2), number);
		});
	}

	return [...mem.values()].reduce((a, b) => a + b);
};

const input = getInput(import.meta.url);

console.log("--DAY 14--");
console.log("PART 1", part1(input));
console.log("PART 2", part2(input));
