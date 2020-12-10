import getInput from "../../util/getInput.js";

const ruleRegex = /(\d+) ([a-z]+ [a-z]+) bags?/;

export const getRules = (input) => {
	return new Map(
		input.map((item) => {
			const [key, value] = item.split(" bags contain ");

			return [
				key,
				value.split(", ").reduce((acc, rule) => {
					const match = rule.match(ruleRegex);

					if (match) {
						const [_full, count, color] = match;
						acc.push([parseInt(count), color]);
					}

					return acc;
				}, []),
			];
		})
	);
};

const containsColor = (color, map, currentBag, resultSet) => {
	return map.get(currentBag).some((rule) => {
		if (
			rule[1] === color ||
			resultSet.has(rule[1]) ||
			containsColor(color, map, rule[1], resultSet)
		) {
			resultSet.add(currentBag);
			return true;
		}
		return false;
	});
};

const countChildren = (map, key) => {
	return map
		.get(key)
		.reduce(
			(acc, colorMap) => acc + colorMap[0] * countChildren(map, colorMap[1]),
			1
		);
};

export const part1 = (ruleMap) => {
	const set = new Set();

	ruleMap.forEach((_, key) => containsColor("shiny gold", ruleMap, key, set));

	return set.size;
};

export const part2 = (ruleMap) => {
	return countChildren(ruleMap, "shiny gold") - 1;
};

const input = getInput(import.meta.url);
const ruleMap = getRules(input);

console.log("--DAY 7--");
console.log("PART 1", part1(ruleMap));
console.log("PART 2", part2(ruleMap));
