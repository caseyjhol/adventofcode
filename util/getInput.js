import fs from "fs/promises";
import path from "path";

const getInput = (url = import.meta.url, separator = "\n") => {
	const __dirname = path.dirname(new URL(url).pathname);

	return fs
		.readFile(path.join(__dirname, "/input.txt"), "utf8")
		.then((data) => data.trim().split(separator));
};

export default getInput;
