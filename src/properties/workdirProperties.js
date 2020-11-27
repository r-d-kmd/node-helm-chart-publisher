const gitChartRepository = require("./gitChartRepositoryProperties");
const chart = require("./chartProperties");

const clonedGitChartRepositoryPath = "charts-repo";
const helmChartRepositoryPath = gitChartRepository.workDir ? `${clonedGitChartRepositoryPath}/${gitChartRepository.workDir}` : clonedGitChartRepositoryPath;
const packageDestinationPath = `${helmChartRepositoryPath}/${chart.name}`;

module.exports = { helmChartRepositoryPath, packageDestinationPath, clonedGitChartRepositoryPath };
