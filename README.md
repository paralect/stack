# Product 🎉 Stack 🎉

Product Stack is a number of small solutions combined together in one repository with a goal to improve products quality and time to market.

Main concepts:
1. Every component has an owner who maintain and contribute to the component, keeping it up to date all the time and fixing any issues.
2. Based on the current Product Stack components we build and support `Mainstream Product` - which is what we think best set of tools and technologies for starting product development. While we offer a `Mainstream Product boilerplate`, you can use individual components for your product development.
3. Every Product Stack component has extensive documentation which allow to learn it quite quickly.  

## Technology Stack

To make collaboration simpler and more efficient we will focus around very specific and concise technology stack, which includes following:

1. Node.JS 8 / Koa.JS 2
2. React.JS with Redux, POST CSS
3. MongoDB, PostgreSQL

### Contribute to Product Stack

We want contributing to Product Stack to be enjoyable, educational and fun for everyone. There are multiple ways to contribute:

1. Help with documentation. Great documentation is a key.
2. Submitting bug fixes or grammar fixes.
3. Adding unit or functional tests.
4. Adding new ideas to include into Product Stack.  
5. Implementing new solutions, that will be used across many products.
6. Helping answering questions in the github issues.


### Structure of the repository

Eventually we want to group solutions into logical groups, but since there is high probability of mistake. As we just starting we will keep things simple in the beginning and come up with a structure later on. For the moment every solution should just lie in his own folder and contain README.md with comprehensive description.

### Product Stack Solution Documentation

Every solution should include comprehensive documentation, which explains at least:

1. Why there is a need in this solution. A couple of use cases.
2. How to use this solution. A couple of code samples.
3. Is there any limitations now or in the future we need to know about before using it.

### Product 👋 Stack 👋 Solutions ![](https://img.shields.io/badge/status-solution-green.svg)

#### Conventions

|Name|Status|Description|
|:--:|:----:|:----------|
|[JS Style](./conventions/js-style/README.md)|![](https://img.shields.io/badge/status-solution-green.svg)|Javascript style conventions|
|[Node.JS conventions](./conventions/node-js/README.md)|![](https://img.shields.io/badge/status-solution-green.svg)|Node.JS, package.json conventions|


#### Standalone packages

|Name|Status|Description |Distribution|
|:--:|:----:|:----------:|:------|
|[Handy MongoDB layer](./mongo-node8/README.md)|![](https://img.shields.io/badge/status-solution-green.svg)|Handy MongoDB layer with database transaction log capabilities|npm package: `@paralect/mongo-node8`|
|[Config management](./config-management/README.md)|![](https://img.shields.io/badge/status-solution-green.svg)|Describe a common way and show example of managing configs for different environments|source code|

#### Starter apps

|Name|Status|Description |Distribution|
|:--:|:----:|:----------:|:------|
|[React.JS starter app](./react-starter/README.md)|![](https://img.shields.io/badge/status-solution-green.svg)|A simplest way to start your React.JS based app.|source code|


### Product 👋 Stack 👋 Ideas ![](https://img.shields.io/badge/status-idea-orange.svg)

#### Standalone packages

|Name|Status|Description|
|:--:|:----:|:----------|
|Stylish common email templates|![](https://img.shields.io/badge/status-idea-orange.svg)|Welcome, Invite, Forgot Password, Payment Receipt |
|Common logger|![](https://img.shields.io/badge/status-idea-orange.svg)| Should support logging to the File, Logstash, Loggly|
|MongoDB migrations|![](https://img.shields.io/badge/status-idea-orange.svg)|Steamline MongoDB database migrations process|

#### Starter apps & common REST resources

|Name|Status |Description|
|:--:|:-----:|:----------|
|Koa.JS 2 web application starter|![](https://img.shields.io/badge/status-idea-orange.svg)|Sample web application with Dockerfiles, empty main screen and nice progress bar while application loading|
|Stripe subscriptions resource|![](https://img.shields.io/badge/status-idea-orange.svg)|Restful API and simple react client that implement subscribe to a plan, update credit card and cancel subscription (with an easy way to embed this into Koa 2 web app starter and Koa 2 api starter)|
|Koa.JS 2 api application starter|![](https://img.shields.io/badge/status-idea-orange.svg)|Simple API starter that already have logging, connection to mongodb and sample resource implementation|
|Koa.JS 2 Registration resource|![](https://img.shields.io/badge/status-idea-orange.svg)|Resource which implement account functionality: Login, Signup (first name, last name, email, confirm email, password, confirm password)|
|Koa.JS image processing service|![](https://img.shields.io/badge/status-idea-orange.svg)|Service that allows common manipulations with images, such as thumbnail generator, resizing, etc. Node.JS wrapper for this service|
|Koa.JS pdf generation service|![](https://img.shields.io/badge/status-idea-orange.svg)|Service that allow generate PDF documents from html files|


#### Deployment resources

|Name|Status |Description|
|:--:|:-----:|:----------|
|Nginx + common template|![](https://img.shields.io/badge/status-idea-orange.svg)|Nginx deployment with ansible (role + sample playbook) with and without ssl|
|Nginx & optimizations for socket.io|![](https://img.shields.io/badge/status-idea-orange.svg)|Sample nginx config and configuration for socket.io deployments|
|Drone CI deployment|![](https://img.shields.io/badge/status-idea-orange.svg)|Description of common development pipeline and Ansible deployment scripts for Drone CI|
|Gragana deployment|![](https://img.shields.io/badge/status-idea-orange.svg)|Grafana deployment with Ansible and common grafana workflow description of how to send service monitoring + application data|
|MongoDB deployment|![](https://img.shields.io/badge/status-idea-orange.svg)|Standalone Ansible MongoDB Deploment|


### Product Stack Node.JS Mainstream product

This is sample project built based on Product Stack components, which basically what we think an ideal solution to start new project at any given point of a time.
