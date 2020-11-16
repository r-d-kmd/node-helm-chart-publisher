const { execSync } = require("child_process");

const run = (args) => {
	console.log(`Running 'helm ${args}'`);
	const output = execSync(`helm ${args}`, (err) => {
		if (err) {
			console.log("Cannot execute helm command");
			throw new Error(err);
		}
	}).toString();
	console.log(`Result: ${output}`);
	return output;
};

const init = () => run("init --client-only");
const version = () => run("version --client --short").toString();

module.exports = {
	run,
	init,
	version
};
