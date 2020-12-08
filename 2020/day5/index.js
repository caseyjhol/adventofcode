import getInput from "../../util/getInput.js";

const getLowerHalf = (range) => {
	const upper = range[0] + Math.floor((range[1] - range[0]) / 2);
	return [range[0], upper];
};

const getUpperHalf = (range) => {
	const lower = range[0] + Math.ceil((range[1] - range[0]) / 2);
	return [lower, range[1]];
};

const getSeat = (pass) => {
	let rowRange = [0, 127];
	let colRange = [0, 7];

	for (let i = 0; i < pass.length; i++) {
		let char = pass[i];

		switch (char) {
			case "F": {
				rowRange = getLowerHalf(rowRange);
				break;
			}
			case "B": {
				rowRange = getUpperHalf(rowRange);
				break;
			}
			case "L": {
				colRange = getLowerHalf(colRange);
				break;
			}
			case "R": {
				colRange = getUpperHalf(colRange);
				break;
			}
		}
	}

	return { row: rowRange[0], column: colRange[0] };
};

export const getId = (pass) => {
	const seat = getSeat(pass);

	return seat.row * 8 + seat.column;
};

export const getIds = (passes) => passes.map(getId);

export const part1 = (passIds) => {
	return Math.max(...passIds);
};

export const part2 = (passIds) => {
	let missing;

	passIds.sort((a, b) => a - b);

	for (let i = 0; i < passIds.length; i++) {
		let id = passIds[i],
			nextId = passIds[i + 1];

		if (nextId - id > 1) {
			missing = id + 1;
			break;
		}
	}

	return missing;
};

const passes = getInput(import.meta.url);

console.log("--DAY 5--");
const passIds = getIds(passes);
console.log("PART 1", part1(passIds));
console.log("PART 2", part2(passIds));
