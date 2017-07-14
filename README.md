# Paralect Service Stack

The main intent of this repository is improve following:

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

#### Starter apps & common REST resources

|Name|Status|Description|
|:--:|:----:|:----------|
|Koa.JS 2 web application starter|idea|Sample web application with Dockerfiles, empty main screen and nice progress bar while application loading|
|Stripe subscriptions resource|idea|Restful API and simple react client that implement subscribe to a plan, update credit card and cancel subscription (with an easy way to embed this into Koa 2 web app starter and Koa 2 api starter)|
|Koa.JS 2 api application starter|idea|Simple API starter that already have logging, connection to mongodb and sample resource implementation|
