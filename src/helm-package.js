const fs = require("fs");
const helm = require("./helm");

const helmPackage = ({ chartDefinitionPath, chartVersion, packageDestinationPath }) => {
	console.log(`Prepare Helm chart package from ${chartDefinitionPath}`);
	if (helm.version().startsWith("2")) {
		helm.init();
	}

	if (!fs.existsSync(packageDestinationPath)) {
		fs.mkdirSync(packageDestinationPath);
	}
	helm.run(`dependency update ${chartDefinitionPath}`);
	helm.run(`package --version ${chartVersion} --destination ${packageDestinationPath} ${chartDefinitionPath}`);
};

module.exports = helmPackage;
