import getInput from "../../util/getInput.js";

const parseLine = (instruction) => {
	const parsed = instruction.split(" ");

	return {
		action: parsed[0],
		num: parsed[1],
	};
};

const readLine = (instruction, currentLine, acc) => {
	const { action, num } = parseLine(instruction);

	switch (action) {
		case "nop": {
			currentLine++;
			break;
		}
		case "acc": {
			acc += Number(num);
			currentLine++;
			break;
		}
		case "jmp": {
			currentLine += Number(num);
			break;
		}
	}

	return [currentLine, acc];
};

export const runProgram = (
	input,
	currentLine = 0,
	acc = 0,
	tracker = new Set()
) => {
	if (tracker.has(currentLine) || currentLine > input.length - 1)
		return { acc, currentLine, tracker };

	tracker.add(currentLine);

	const instruction = input[currentLine];

	[currentLine, acc] = readLine(instruction, currentLine, acc);

	return runProgram(input, currentLine, acc, tracker);
};

export const part1 = (input) => {
	const { acc } = runProgram(input);
	return acc;
};

const flipStep = (instruction) => {
	let { action, num } = parseLine(instruction);

	action = action === "jmp" ? "nop" : "jmp";

	return [action, num].join(" ");
};

export const part2 = (input) => {
	// get the steps the program runs through
	const { tracker } = runProgram(input);
	let currentAcc = 0;

	tracker.forEach((step) => {
		if (input[step].split(" ")[0] !== "acc") {
			const newInput = [...input];
			newInput[step] = flipStep(newInput[step]);
			const { currentLine, acc } = runProgram(newInput);

			if (currentLine > newInput.length - 1) {
				currentAcc = acc;
			}
		}
	});

	return currentAcc;
};

const input = getInput(import.meta.url);

console.log("--DAY 8--");
console.log("PART 1", part1(input));
console.log("PART 2", part2(input));
