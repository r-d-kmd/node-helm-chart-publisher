const cosmiconfig = require("cosmiconfig");

const helmChartModule = cosmiconfig("helm-chart-publish").searchSync();
const config = helmChartModule ? helmChartModule.config : {};

module.export = config;
