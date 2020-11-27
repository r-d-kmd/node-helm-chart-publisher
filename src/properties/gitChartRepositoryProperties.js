const url = require("url");
const args = require("./args");
const config = require("./config");

const gitChartRepositoryArgs = args.gitChartRepo || {};

const gitUrlParse = (repoUri, gitUser, gitPassword) => {

	const gitRepoURL = url.parse(repoUri).protocol ? new URL(repoUri) : new URL(`https://${repoUri}`);

	gitRepoURL.username = gitUser;
	gitRepoURL.password = gitPassword;

	return gitRepoURL.toString();
};

const gitChartRepoUrl = gitChartRepositoryArgs.url || args.gitRepo || config.gitChartRepoUrl || config.gitRepo;
if (!gitChartRepoUrl) {
	throw new Error("gitChartRepo.url property is not set. You can set it in package.json section like so "
		+ "\"helm-chart-publish\": { \"gitChartRepoUrl\": https://github.com/repo/url\"}, or as a command line parameter gitChartRepo.url ");
}
const gitUser = gitChartRepositoryArgs.username || args.gitUser || process.env.HELM_CHART_PUBLISH_GIT_REPO_USERNAME || config.gitUsername;
const gitPassword = gitChartRepositoryArgs.password || args.gitPassword || process.env.HELM_CHART_PUBLISH_GIT_REPO_PASSWORD;
const workDir = gitChartRepositoryArgs.workDir || config.gitChartRepoWorkDir || "";
const gitUrl = gitUrlParse(gitChartRepoUrl, gitUser, gitPassword);

module.exports = { url: gitUrl, workDir };
