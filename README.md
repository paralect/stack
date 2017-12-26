# Stack 🎉 

[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Build Status](http://product-stack-ci.paralect.com/api/badges/paralect/stack/status.svg)](http://product-stack-ci.paralect.com/paralect/stack)

[![Watch on GitHub](https://img.shields.io/github/watchers/paralect/stack.svg?style=social&label=Watch)](https://github.com/paralect/ship/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/paralect/stack.svg?style=social&label=Stars)](https://github.com/paralect/ship/stargazers)
[![Follow](https://img.shields.io/twitter/follow/paralect.svg?style=social&label=Follow)](https://twitter.com/paralect)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/paralect/stack.svg?style=social)](https://twitter.com/intent/tweet?text=I%27m%20using%20Stack%20components%20to%20build%20my%20next%20product%20🚀.%20Check%20it%20out:%20https://github.com/paralect/stack)

A set of components for makers to ship better products faster 🚀.
[Stack](https://github.com/paralect/stack) is an number of open-source components, resulted from years of hard work on a number of awesome products. We carefully select, document and share our production-ready knowledge with you. Stack aims to help to improve your product quality and time to market. Every component can be used as standalone component and you can combine different components to create your product or just use [Ship](https://github.com/paralect/ship).

Main concepts:
1. Every component has an owner who maintain and contribute to the component, keeping it up to date all the time and fixing any issues.
2. Every Product Stack component has extensive documentation which allow to learn it quite quickly.  

## Tools

Tools we use internally to collaborate on the project. If you have any questions, suggestions or ideas — just [create an issue](https://github.com/paralect/stack/issues/new).

1. [Slack](https://paralect-stack.slack.com/messages)
2. [Drone CI](http://product-stack-ci.paralect.com)
3. [Internal Trello Board](https://trello.com/b/ZmxYFqWa/product-stack-development)
4. [NPM Organization](https://www.npmjs.com/org/paralect)
5. [Docker Hub](https://hub.docker.com/u/paralect/dashboard/)

## Technology Stack

To make collaboration simpler and more efficient we will focus around very specific and concise technology stack, which includes following:

1. **Backend:** Node.JS 8, Koa.JS 2
2. **Frontend:** React.JS, Redux, POST CSS, Webpack
3. **Databases:** MongoDB, PostgreSQL
4. **Infastructure:** Ansible, Docker, Nginx, Drone CI, Grafana

## Product stack Distribution

We distribute Product Stack components in four main ways:

1. As public [npm](https://www.npmjs.com/) packages under common `@paralect` account.
2. As source code, which you can just copy/paste to get started
3. As public docker images for isolated services under common `paralect` DockerHub account.
4. As Ansible roles for common deployment tasks

## Stack components

|Name|Description|
|:--:|:----------|
|[Next.JS landing starter](https://github.com/paralect/nextjs-landing-starter)|Build your landing site based on Next.JS in minutes|
|[Koa.JS REST api starter](https://github.com/paralect/koa-api-starter)|A starter kit for building Koa.JS based restful api|
|[React.JS (wtih Redux) starter](https://github.com/paralect/koa-react-starter)|A starter kit for building React.JS (with Redux) based applications|
|[Ansible Grafana role](https://github.com/paralect/ansible-grafana)|An ansible role for server monitoring using grafana.|
|[Deploy Grafana](https://github.com/paralect/deploy-grafana)|Grafana, InfluxDB and Telegraf deployment automation with Ansible|
|[MongoDB Api for Node.JS](https://github.com/paralect/node-mongo)|Reactive wrapper around MongoDB for Node.JS|
|[Ansible Drone role](https://github.com/paralect/ansible-drone)|Ansible role for drone deployment|
|[Deploy Drone CI](https://github.com/paralect/deploy-drone)|Ansible automation for production-ready Drone CI deployment|
|[Eslint config](https://github.com/paralect/eslint-config)|Eslint configuration used across all Stack components|
|[React Native Starter](./react-native-starter/README.md)|Starter kit for React Native applications|
|[PDF Service](./pdf-service/README.md)|A puppeteer based PDF generation services, shipped as docker image|
|[Emails Service](./mail-service/README.md)|An mjml and webpack based service for templates generation and email sending|
|[Stack Component Template](./stack-component-template/README.md)|A stack component template for starting new Stack components|

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
Every release is documented on the Github [Releases](https://github.com/paralect/ship/releases) page.

## License

Ship is released under the [MIT License](LICENSE).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/14125982?v=4" width="100px;"/><br /><sub><b>KuhArt</b></sub>](https://github.com/KuhArt)<br />[💻](https://github.com/paralect/stack/commits?author=KuhArt "Code") [📖](https://github.com/paralect/stack/commits?author=KuhArt "Documentation") [💡](#example-KuhArt "Examples") | [<img src="https://avatars2.githubusercontent.com/u/6461311?v=4" width="100px;"/><br /><sub><b>Evgeny Zhivitsa</b></sub>](https://github.com/ezhivitsa)<br />[💻](https://github.com/paralect/stack/commits?author=ezhivitsa "Code") [📖](https://github.com/paralect/stack/commits?author=ezhivitsa "Documentation") [💡](#example-ezhivitsa "Examples") [🤔](#ideas-ezhivitsa "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/12069883?v=4" width="100px;"/><br /><sub><b>NesterenkoNikita</b></sub>](https://github.com/NesterenkoNikita)<br />[💻](https://github.com/paralect/stack/commits?author=NesterenkoNikita "Code") | [<img src="https://avatars3.githubusercontent.com/u/2302873?v=4" width="100px;"/><br /><sub><b>Ihar</b></sub>](https://github.com/IharKrasnik)<br />[🐛](https://github.com/paralect/stack/issues?q=author%3AIharKrasnik "Bug reports") [💻](https://github.com/paralect/stack/commits?author=IharKrasnik "Code") [📖](https://github.com/paralect/stack/commits?author=IharKrasnik "Documentation") [🤔](#ideas-IharKrasnik "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/2989199?v=4" width="100px;"/><br /><sub><b>Uladzimir Mitskevich</b></sub>](https://github.com/umitskevich)<br />[💻](https://github.com/paralect/stack/commits?author=umitskevich "Code") | [<img src="https://avatars3.githubusercontent.com/u/22181943?v=4" width="100px;"/><br /><sub><b>Евгений</b></sub>](https://github.com/EugenLeshchov)<br />[💻](https://github.com/paralect/stack/commits?author=EugenLeshchov "Code") | [<img src="https://avatars1.githubusercontent.com/u/9166217?v=4" width="100px;"/><br /><sub><b>Anton Tsapliuk</b></sub>](https://github.com/tsapa44)<br />[💻](https://github.com/paralect/stack/commits?author=tsapa44 "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars3.githubusercontent.com/u/681396?v=4" width="100px;"/><br /><sub><b>Andrew Orsich</b></sub>](http://paralect.com)<br />[💬](#question-anorsich "Answering Questions") [💻](https://github.com/paralect/stack/commits?author=anorsich "Code") [📖](https://github.com/paralect/stack/commits?author=anorsich "Documentation") [🤔](#ideas-anorsich "Ideas, Planning, & Feedback") [👀](#review-anorsich "Reviewed Pull Requests") | [<img src="https://avatars1.githubusercontent.com/u/11842784?v=4" width="100px;"/><br /><sub><b>Anastasia Kostyukova</b></sub>](https://github.com/nastya-kostyukova)<br />[💻](https://github.com/paralect/stack/commits?author=nastya-kostyukova "Code") [📖](https://github.com/paralect/stack/commits?author=nastya-kostyukova "Documentation") [💡](#example-nastya-kostyukova "Examples") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!