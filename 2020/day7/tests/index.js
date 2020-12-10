import getInput from "../../../util/getInput.js";
import { getRules, part1, part2 } from "../index.js";

const input = getInput(import.meta.url);

const ruleMap = getRules(input);

if (part1(ruleMap) === 4) {
	console.log("PART 1", "PASS");
}

if (part2(ruleMap) === 32) {
	console.log("PART 2", "PASS");
}
