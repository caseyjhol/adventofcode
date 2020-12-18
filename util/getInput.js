import fs from "fs";
import path from "path";

const getInput = (url = import.meta.url, separator = "\n", filter = false) => {
	const __dirname = path.dirname(new URL(url).pathname);

	const input = fs
		.readFileSync(path.join(__dirname, "/input.txt"), "utf8")
		.trim()
		.split(separator);

	if (filter) {
		return input.map(filter);
	}

	return input;
};

export default getInput;
