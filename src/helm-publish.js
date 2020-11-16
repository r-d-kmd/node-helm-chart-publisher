const gitP = require("simple-git/promise");
const helm = require("./helm");

const NUMBER_OF_RETRIES = 5;

const reindexHelmCharts = (chartRepoPath) => {
	console.log("Reindexing Helm chart repo");
	helm.run(`repo index ${chartRepoPath}`);
};

const pushHelmChartRepoToRemote = async (gitPath, commitMessage) => {
	console.log("Pushing updated Helm chart repo");
	const git = gitP(gitPath);
	await git.add("./*");
	await git.commit(commitMessage);
	await pushWithRetry(git);
};

const pushWithRetry = async (git) => {
	try {
		await git.push();
	} catch (err) {
		console.log("Push has been rejected. Trying to pull new changes with --rebase and then retry.");
		await pullAndRetryPush(git);
	}
	console.log("Pushed successfully.");
};

const pullAndRetryPush = async (git) => {
	let done = false;
	for (let i = 0; i < NUMBER_OF_RETRIES && !done; i++) {
		try {
			console.log(`${i + 1} retry to pull new changes with --rebase.`);
			await git.pull(null, null, { "--rebase": "true" });
			await git.push();
			done = true;
		} catch (err) {
			console.log("Push has been rejected.", err);
		}
	}
	if (!done) {
		throw new Error("Push to Helm chart repository failed.");
	}
};

const publish = async ({ clonedGitChartRepositoryPath, helmChartRepositoryPath, commitMessage }) => {
	console.log("Publishing Helm chart");
	reindexHelmCharts(helmChartRepositoryPath);
	await pushHelmChartRepoToRemote(clonedGitChartRepositoryPath, commitMessage);
};

module.exports = publish;
