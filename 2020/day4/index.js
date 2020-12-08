import getInput from "../../util/getInput.js";

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const getPassportObject = (passport = []) => {
	return new Map(
		passport.split(" ").map((item) => {
			const field = item.split(":");
			return [field[0], field[1]];
		})
	);
};

export const getPassports = (passports) => {
	return passports.map((passport) =>
		getPassportObject(passport.split("\n").join(" "))
	);
};

const hasRequiredFields = (passport) => {
	return (
		requiredFields.filter((field) => passport.has(field)).length ===
		requiredFields.length
	);
};

/* 
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
 */

const validYear = (year, min, max) => {
	return year.length === 4 && year >= min && year <= max;
};

const fieldRules = {
	byr: (year) => validYear(year, 1920, 2002),
	iyr: (year) => validYear(year, 2010, 2020),
	eyr: (year) => validYear(year, 2020, 2030),
	hgt: (height) => {
		const unit = height.includes("cm") ? "cm" : height.includes("in") && "in";

		if (!unit) return false;

		const value = Number(height.split(unit)[0]);

		return unit === "cm"
			? value >= 150 && value <= 193
			: value >= 59 && value <= 76;
	},
	hcl: (color) => color.match(/^#[\da-f]{6}$/),
	ecl: (color) =>
		["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(color),
	pid: (id) => id.match(/^\d{9}$/),
};

const passportIsValid = (passport) => {
	const fields = Object.keys(fieldRules);

	return (
		hasRequiredFields(passport) &&
		fields.filter(
			(key) => passport.has(key) && fieldRules[key](passport.get(key))
		).length === fields.length
	);
};

export const part1 = (passports) => passports.filter(hasRequiredFields).length;

export const part2 = (passports) => passports.filter(passportIsValid).length;

const input = getInput(import.meta.url, "\n\n");

console.log("--DAY 4--");
const passports = getPassports(input);
console.log("PART 1", part1(passports));
console.log("PART 2", part2(passports));
