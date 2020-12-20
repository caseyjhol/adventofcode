import getInput from "../../util/getInput.js";

export const part1 = (input) => {
	const earliest = input[0];

	const busIds = input[1]
		.split(",")
		.filter((id) => id !== "x")
		.map(Number);

	const available = busIds
		.map((id) => ({
			id,
			time: Math.ceil(earliest / id) * id,
			wait: id - (earliest % id),
		}))
		.sort((a, b) => a.time - b.time);

	return available[0].id * available[0].wait;
};

export const part2 = (input) => {
	const busIds = input[1]
		.split(",")
		.map((id, index) => (id !== "x" ? { id: Number(id), index } : null))
		.filter((x) => x);

	let step = busIds[0].id;
	let timestamp = step;

	const lastBus = busIds[busIds.length - 1];

	for (let i = 1; i < busIds.length; i++) {
		const bus = busIds[i];

		while ((timestamp + bus.index) % bus.id !== 0) {
			timestamp += step;
		}

		step *= bus.id;
	}

	return timestamp;
};

const input = getInput(import.meta.url);

console.log("--DAY 13--");
console.log("PART 1", part1(input));
console.log("PART 2", part2(input));
