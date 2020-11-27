const config = require("./config");
const args = require("./args");

const chartArgs = args.chart || {};

const name = chartArgs.name || args.projectName || config.chartName;
const version = chartArgs.version || args.projectVersion;

const definitionPath = chartArgs.definitionPath || config.chartDefinitionPath || `helm/${name}`;

module.exports = { name, version, definitionPath };
