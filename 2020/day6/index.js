import getInput from "../../util/getInput.js";

export const part1 = (groups) => {
	return groups
		.map((group) => {
			let groupAnswers = [];

			group.split("\n").map((person) => {
				groupAnswers = [...groupAnswers, ...person.split("")];
			});

			return new Set(groupAnswers).size;
		})
		.reduce((a, b) => a + b);
};

export const part2 = (groups) => {
	return groups
		.map((group, i) => {
			const answers = group.split("\n");
			const groupAnswers = new Map();

			answers.map((person) => {
				person
					.split("")
					.forEach((answer) =>
						groupAnswers.set(answer, (groupAnswers.get(answer) || 0) + 1)
					);
			});

			let count = 0;

			groupAnswers.forEach((answer) => {
				if (answer === answers.length) count++;
			});

			return count;
		})
		.reduce((a, b) => a + b);
};

getInput(import.meta.url, "\n\n").then((input) => {
	console.log("--DAY 6--");
	console.log("PART 1", part1(input));
	console.log("PART 2", part2(input));
});
