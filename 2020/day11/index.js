import getInput from "../../util/getInput.js";

const matrix = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[-1, 0],
	[1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
];

const getSurroundingSeats = (input, x, y) => {
	const position = input[y][x];
	let occupied = 0;

	if (position === ".") return 0;

	matrix.forEach((coordinates) => {
		const row = input[y + coordinates[1]];

		if (row) {
			const seat = row[x + coordinates[0]];

			if (seat === "#") occupied++;
		}
	});

	return occupied;
};

const mapAndCount = (input, counter, swapThreshold, prevOccupied) => {
	const occupiedMap = new Map();
	let occupiedCount = 0;

	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			const position = input[y][x];

			if (position === "#") occupiedCount++;

			const occupiedSurround = counter(input, x, y);
			occupiedMap.set([x, y], occupiedSurround);
		}
	}

	occupiedMap.forEach((count, coordinates) => {
		const x = coordinates[0];
		const y = coordinates[1];

		const seat = input[y][x];

		if (seat === "L" && count === 0) {
			input[y].splice(x, 1, "#");
		} else if (seat === "#" && count >= swapThreshold) {
			input[y].splice(x, 1, "L");
		}
	});

	if (prevOccupied === occupiedCount) return occupiedCount;

	prevOccupied = occupiedCount;

	return mapAndCount(input, counter, swapThreshold, occupiedCount);
};

const keepMoving = (input, [x, y], coordinates) => {
	const position = input[y][x];

	if (position !== ".") {
		return position;
	}

	const x1 = x + coordinates[0];
	const y1 = y + coordinates[1];
	const row = input[y1];

	if (row) {
		const seat = row[x1];

		if (seat) return keepMoving(input, [x1, y1], coordinates);
	}

	return position;
};

const getVisibleSeats = (input, x, y) => {
	let occupied = 0;

	matrix.forEach((coordinates) => {
		const x1 = x + coordinates[0];
		const y1 = y + coordinates[1];
		const row = input[y1];

		if (row) {
			let seat = row[x1];

			if (seat === ".") {
				// if it's not a seat, keep moving in the same direction until we find one
				seat = keepMoving(input, [x1, y1], coordinates);
			}

			if (seat === "#") occupied++;
		}
	});

	return occupied;
};

const deepClone = (array) => {
	return JSON.parse(JSON.stringify(array));
};

export const part1 = (input) => {
	const clone = deepClone(input);
	return mapAndCount(clone, getSurroundingSeats, 4);
};

export const part2 = (input) => {
	const clone = deepClone(input);
	return mapAndCount(clone, getVisibleSeats, 5);
};

const input = getInput(import.meta.url, undefined, (line) => line.split(""));

console.log("--DAY 11--");
console.log("PART 1", part1(input));
console.log("PART 2", part2(input));
