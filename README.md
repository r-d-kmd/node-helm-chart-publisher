# node-helm-chart-publisher

_node package helm chart and publish to git repository plugin_ 

Helm chart is an integral part of a project, more often its definition is placed as closest to code as possible. 

In order to be able to develop both at the same time helm allows to do [chart versioning](https://v2.helm.sh/docs/developing_charts/#charts-and-versioning).

This plugin packages the chart and leverages the possibility of using git repository as a [helm repository](https://helm.sh/docs/topics/chart_repository/). 

## Basic usage

- add chart definition to `helm` foldder in your project directory 

```.
   ├── src                    
   ├── dist                    
   ├── helm                    
   │   └── your-app-name
   │       ├── templates
   │       ├── values.yaml
   │       └── Chart.yaml
   └── ...
```
- add and configure plugin in `package.json`
```
{
    "scripts": {
        "helm-chart-publish": "helm-chart-publisher --projectName=<NAME-OF-YOUR-PROJECT>"
    }
}
```
- run script
```
$ npm run helm-chart-publish -- --chart.version=1.0.3 --gitChartRepo.url=<HELM-CHART-GIT-URL> --gitChartRepo.username=<HELM-CHART-GIT-USERNAME> --gitChartRepo.password=<HELM-CHART-GIT-PASSWORD>

```

## Requirements

Plugin requires helm client in version 2.x or 3.x to be installed.

## Workflow

- clone git repository where helm chart definitions are stored
- init helm client
- package chart
- reindex helm chart repository
- push changes to git repository 

## Parameters


Parameter | Description | Default value |  Flag | Environment variable | package.json config property 
--------- | ----------- | ------------- | ----- | -------------------- | ---------------------
Git chart repository URL | URL to a git repository in which helm charts are stored. Accepts both ssh and https protocols. | - | `gitChartRepo.url` | - | `helm-chart-publish.gitChartRepoUrl`
Git username | Git repository username | - | `gitChartRepo.username` | `HELM_CHART_PUBLISH_GIT_REPO_USERNAME` | `helm-chart-publish.gitUsername`
Git password | Git repository password | - | `gitChartRepo.password` | `HELM_CHART_PUBLISH_GIT_REPO_PASSWORD` | -
Git repository working directory | Directory in git repository where helm chart repository is stored | / (root folder of the repository) | `gitChartRepo.workDir` | - | `helm-chart-publish.gitChartRepoWorkDir`
Chart version | Version under which the chart will be published | project.version |  `chart.version` | - | -
Chart name | Version under which the chart will be published | project.name |  `chart.name` | - | `helm-chart-publish.chartName`
Chart definition path | Where in the project chart definition is stored | `${projectDir}/helm/$chartName` | `chart.definitionPath` | - | `helm-chart-publish.chartDefinitionPath`
