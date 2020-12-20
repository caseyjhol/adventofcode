import getInput from "../../util/getInput.js";

const directions = ["E", "S", "W", "N"];

const turnMap = {
	R: 1,
	L: -1,
};

const directionMap = {
	E: [0, 1],
	W: [0, -1],
	N: [1, 1],
	S: [1, -1],
};

const parseLine1 = (line, direction, coordinates) => {
	const action = line.slice(0, 1);
	const value = Number(line.slice(1));

	switch (action) {
		case "F": {
			let [index, multiplier] = directionMap[direction];

			coordinates[index] += value * multiplier;
			break;
		}
		case "R":
		case "L": {
			let directionIndex = directions.indexOf(direction);
			let newIndex = directionIndex + (value / 90) * turnMap[action];

			direction = directions.slice(newIndex % directions.length)[0];
			break;
		}
		default: {
			let [index, multiplier] = directionMap[action];

			coordinates[index] += value * multiplier;
		}
	}

	return [direction, coordinates];
};

export const part1 = (input) => {
	let direction = "E";
	let coordinates = [0, 0];

	for (let i = 0; i < input.length; i++) {
		const line = input[i];

		[direction, coordinates] = parseLine1(line, direction, coordinates);
	}

	return coordinates.reduce((a, b) => Math.abs(a) + Math.abs(b));
};

const parseLine2 = (line, waypoint, coordinates) => {
	const action = line.slice(0, 1);
	const value = Number(line.slice(1));

	switch (action) {
		case "F": {
			coordinates = [
				waypoint[0] * value + coordinates[0],
				waypoint[1] * value + coordinates[1],
			];
			break;
		}
		case "R":
		case "L": {
			for (let i = 0; i < value / 90; i++) {
				waypoint = [
					turnMap[action] * waypoint[1],
					turnMap[action] * -1 * waypoint[0],
				];
			}
			break;
		}
		default: {
			let [index, multiplier] = directionMap[action];

			waypoint[index] += value * multiplier;
		}
	}

	return [waypoint, coordinates];
};

export const part2 = (input) => {
	let waypoint = [10, 1];
	let coordinates = [0, 0];

	for (let i = 0; i < input.length; i++) {
		const line = input[i];

		[waypoint, coordinates] = parseLine2(line, waypoint, coordinates);
	}

	return coordinates.reduce((a, b) => Math.abs(a) + Math.abs(b));
};

const input = getInput(import.meta.url);

console.log("--DAY 12--");
console.log("PART 1", part1(input));
console.log("PART 2", part2(input));
