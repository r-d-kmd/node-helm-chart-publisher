const helm = require("./helm");

const helmPackage = ({ chartPath, chartVersion, packageDestinationPath = "." }) => {
	console.log(`Prepare Helm chart package from ${chartPath}`);
	if (helm.version().startsWith("2")) {
		helm.init();
	}
	helm.run(`package --version ${chartVersion} --destination ${packageDestinationPath} ${chartPath}`);
};

module.exports = helmPackage;