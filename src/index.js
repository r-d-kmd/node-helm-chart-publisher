#!/usr/bin/env node

const chart = require("./properties/chartProperties");
const gitChartRepository = require("./properties/gitChartRepositoryProperties");
const workDir = require("./properties/workdirProperties");

const prepare = require("./helm-prepare");
const build = require("./helm-package");
const publish = require("./helm-publish");

(async () => {
	await prepare({ gitUrl: gitChartRepository.url, clonedGitChartRepositoryPath: workDir.clonedGitChartRepositoryPath });
	await build({	chartDefinitionPath: chart.definitionPath, chartVersion: chart.version, packageDestinationPath: workDir.packageDestinationPath });
	await publish({
		clonedGitChartRepositoryPath: workDir.clonedGitChartRepositoryPath,
		helmChartRepositoryPath: workDir.helmChartRepositoryPath,
		commitMessage: `Publishing ${chart.name} chart in version ${chart.version}`
	});
})().catch((err) => {
	console.error("Error during preparing helm chart", err);
	process.exit(1);
});
