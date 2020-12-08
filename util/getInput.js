import fs from "fs";
import path from "path";

const getInput = (url = import.meta.url, separator = "\n") => {
	const __dirname = path.dirname(new URL(url).pathname);

	return fs
		.readFileSync(path.join(__dirname, "/input.txt"), "utf8")
		.trim()
		.split(separator);
};

export default getInput;
