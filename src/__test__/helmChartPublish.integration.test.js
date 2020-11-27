/* global describe, expect, test */
const { execSync } = require("child_process");
const git = require("simple-git/promise")();
const fs = require("fs");
const yaml = require("js-yaml");
const del = require("del");

const gitRepoUrl = "http://localhost:8080/chart-repo.git";
const clonedGitRepoPath = "git-cloned-repo";

async function cloneGitRepo(destination) {
	if (fs.existsSync(destination)) {
		await del(destination);
	}
	await git.clone(gitRepoUrl, destination);
}

const randomVersion = () => `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`;

describe("helm chart publisher test", () => {

	test.each([[randomVersion()], [randomVersion()], [randomVersion()]])("should publish helm chart in version %s to a remote git repository one by one", async (givenVersion) => {
		// when
		execSync(`node src/index.js`
			+ ` --gitChartRepo.url=${gitRepoUrl}`
			+ ` --chart.version=${givenVersion} --chart.name=example-name --chart.definitionPath=src/__test__/chart/example-name`);

		// then
		await cloneGitRepo(clonedGitRepoPath);
		expect(fs.existsSync(`${clonedGitRepoPath}/example-name`)).toBe(true);
		expect(fs.existsSync(`${clonedGitRepoPath}/index.yaml`)).toBe(true);

		const index = yaml.safeLoad(fs.readFileSync(`${clonedGitRepoPath}/index.yaml`, "utf8"));
		expect(index.entries).toHaveProperty("example-name");

		const entry = index.entries["example-name"].find((e) => e.version === givenVersion);
		expect(entry).toBeTruthy();

		const packagedChartPath = `charts-repo/${entry.urls[0]}`;
		expect(fs.existsSync(packagedChartPath)).toBe(true);
	});

});
