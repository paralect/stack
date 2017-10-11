# Stack 🎉 [![Build Status](http://product-stack-ci.paralect.com/api/badges/startupsummer/product-stack/status.svg)](http://product-stack-ci.paralect.com/startupsummer/product-stack)

Stack is a number of small components combined together in one repository with a goal to improve products quality and time to market.

Main concepts:
1. Every component has an owner who maintain and contribute to the component, keeping it up to date all the time and fixing any issues.
2. Every Product Stack component has extensive documentation which allow to learn it quite quickly.  

## Tools

Get in touch for invitations with Andrew Orsich.

1. [Slack](https://paralect-stack.slack.com/messages)
2. [Drone CI](http://product-stack-ci.paralect.com)
3. [Internal Trello Board](https://trello.com/b/ZmxYFqWa/product-stack-development)
4. [NPM Organization](https://www.npmjs.com/org/paralect)
5. [Docker Hub](https://hub.docker.com/u/paralect/dashboard/)

## Technology Stack

To make collaboration simpler and more efficient we will focus around very specific and concise technology stack, which includes following:

1. Node.JS 8, Koa.JS 2
2. React.JS with Redux, POST CSS, Koa.JS 2
3. MongoDB, PostgreSQL
4. Ansible, Docker, Drone CI

## Product stack Distribution

We distribute Product Stack components in four main ways:

1. As public [npm](https://www.npmjs.com/) packages under common `@paralect` account.
2. As source code, which you can just copy/paste to get started
3. As public docker images for isolated services under common `paralect` DockerHub account.
4. As Ansible roles for common deployment tasks

### Contribute to Product Stack

We want contributing to Product Stack to be enjoyable, educational and fun for everyone. There are multiple ways to contribute:

1. Help with documentation. Great documentation is a key.
2. Submitting bug fixes or grammar fixes.
3. Adding unit or functional tests.
4. Adding new ideas to include into Product Stack.  
5. Implementing new solutions, that will be used across many products.
6. Helping answering questions in the github issues.

Read more at the [contributor guide](./CONTRIBUTOR_GUIDE.md).

Do you enjoy build great products just like we are? Join us!

#### Contributors

1. Artem Kukharenko
2. Evgeny Givitsa
3. Nikita Nesterenko
4. Igor Krasnik
5. Andrew Orsich
6. Ulad Mitskevich
7. Evgeny Leschev
8. Nastya Kostukova

TODO: find a nice way to display all contributors, their activity, packages they contribute to and their stats

### Structure of the repository

Eventually we want to group solutions into logical groups, but since there is high probability of mistake. As we just starting we will keep things simple in the beginning and come up with a structure later on. For the moment every solution should just lie in his own folder and contain README.md with comprehensive description.

1. [Product Stack Ideas](./IDEAS.md)
1. [Product Stack Solutions](./SOLUTIONS.md)

### Ship is based on Stack

👉 [Ship](https://github.com/paralect/ship) better products faster

Unstructured notes:

1. All product services start with a single command `./bin/start.sh` using docker-compose.
2. All applications has linting tests configured in package.json and running in the Drone CI.
3. Restful api has defined approach of writing integration/unit tests using mocha, sinon.
4. Deployment and configuration of Drone CI using Ansible.
5. Production, staging deployment pipeline declared and implemented using Drone CI.
6. Server(s) configuration & deployment routines implemented using Ansible.
7. Mainstream product consist MongoDB to s3 backups deployment routine.
8. All applications already have Docker images declared for development and production environments.
9. MongoDB migrations configuration
