const fs = require("fs");
const git = require("simple-git/promise")();
const del = require("del");

const deleteRepoDirectory = async (localChartRepoPath) => {
	if (fs.existsSync(localChartRepoPath)) {
		console.log(`Deleting chart repo cloned locally from ${localChartRepoPath}`);
		await del(localChartRepoPath);
	}
};

const cloneChartsRepo = async (gitUrl, destinationPath) => {
	const url = new URL(gitUrl);
	console.log(`Cloning charts repo ${url.origin}${url.pathname} to '${destinationPath}'`);
	await git.clone(gitUrl, destinationPath);
};

const prepare = async ({ gitUrl, clonedGitChartRepositoryPath }) => {
	await deleteRepoDirectory(clonedGitChartRepositoryPath);
	await cloneChartsRepo(gitUrl, clonedGitChartRepositoryPath);
};

module.exports = prepare;
