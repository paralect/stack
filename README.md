# Paralect Service Stack

The main intent of this repository is to improve following:

1. Sharing of most common technical solutions across the company
2. Improve technical knowledge by participating in discussions about different technical subjects
3. Improve time of delivering Most Viable Product to the market

## Technology Stack

To make collaboration simpler and more efficient we will focus around very specific and concise technology stack, which includes following:

1. Node.JS 8 / Koa.JS 2
2. React.JS, SCSS
3. MongoDB, PostgreSQL

### Contribute to Service Stack

We want contributing to Service Stack to be enjoyable, educational and fun for everyone. There are multiple ways to contribute:

1. Help with documentation.
2. Submitting bug fixes or grammar fixes.
3. Adding unit or functional tests.
4. Adding new ideas to include into Service Stack.  
5. Implementing new solutions, that will be used across many products.
6. Helping answering questions in the github issues.

### Structure of the repository

Eventually we want to group solutions into logical groups, but since there is high probability of mistake. As we just starting we will keep things simple in the beginning and come up with a structure later on. For the moment every solution should just lie in his own folder and contain README.md with comprehensive description.

### Service Stack Solution Documentation

Every solution should include comprehensive documentation, which explains at least:

1. Why there is a need in this solution. A couple of use cases.
2. How to use this solution. A couple of code samples.
3. Is there any limitations now or in the future we need to know about before using it.

### Service Stack Solutions Ideas


#### Standalone packages

|Name|Status|Description|
|:--:|:----:|:----------|
|Stylish common email templates|idea|Welcome, Invite, Forgot Password, Payment Receipt |
|MongoDB reactive wrapper|idea|Wrapper that simplify work with MongoDB and provide a way to listen for database updates|
|Config management|idea|Describe a common way and show example of managing configs for different environments|
|Common logger|idea| Should support logging to the File, Logstash, Loggly|
|MongoDB migrations|idea|Steamline MongoDB database migrations process|

#### Starter apps & common REST resources

|Name|Status|Description|
|:--:|:----:|:----------|
|Koa.JS 2 web application starter|idea|Sample web application with Dockerfiles, empty main screen and nice progress bar while application loading|
|Stripe subscriptions resource|idea|Restful API and simple react client that implement subscribe to a plan, update credit card and cancel subscription (with an easy way to embed this into Koa 2 web app starter and Koa 2 api starter)|
|Koa.JS 2 api application starter|idea|Simple API starter that already have logging, connection to mongodb and sample resource implementation|
|Koa.JS 2 Registration resource|idea|Resource which implement account functionality: Login, Signup (first name, last name, email, confirm email, password, confirm password)|
|Koa.JS image processing service|idea|Service that allows common manipulations with images, such as thumbnail generator, resizing, etc. Node.JS wrapper for this service|
|Koa.JS pdf generation service|idea|Service that allow generate PDF documents from html files|


#### Deployment resources

|Name|Status|Description|
|:--:|:----:|:----------|
|Nginx + common template|idea|Nginx deployment with ansible (role + sample playbook) with and without ssl|
|Nginx & optimizations for socket.io|idea|Sample nginx config and configuration for socket.io deployments|
|Drone CI deployment|idea|Description of common development pipeline and Ansible deployment scripts for Drone CI|
|Gragana deployment|idea|Grafana deployment with Ansible and common grafana workflow description of how to send service monitoring + application data|
|MongoDB deployment|idea|Standalone Ansible MongoDB Deploment|


### Service Stack Mainsteam project

This is sample project built based on Service Stack components, which basically what we think an ideal solution to start new project at any given point of a time.
