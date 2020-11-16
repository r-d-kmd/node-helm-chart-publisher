const gitChartRepository = require("./gitChartRepositoryProperties");
const chart = require("./chartProperties");

const clonedGitChartRepositoryPath = "charts-repo";
const helmChartRepositoryPath = `${clonedGitChartRepositoryPath}/${gitChartRepository.workPath}`;
const packageDestinationPath = `${clonedGitChartRepositoryPath}/${gitChartRepository.workPath}/${(chart.name)}`;

module.exports = { helmChartRepositoryPath, packageDestinationPath, clonedGitChartRepositoryPath };
