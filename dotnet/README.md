# Paralect .NET Service Stack

## Technology Stack

To make collaboration simpler and more efficient we will focus around very specific and concise technology stack, which includes following:

1. .NET Core
2. MongoDB, PostgreSQL

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
|Config management|idea|Describe a common way and show example of managing configs for different environments|
|Common logger|idea| Should support logging to the File, Logstash, Loggly|
|MongoDB migrations|idea|Steamline MongoDB database migrations process|

#### Starter apps & common REST resources

|Name|Status|Description|
|:--:|:----:|:----------|
|Landing|idea|Sample landing web site with account pages (Signup, Signin, Sign out, Forgot password, confirmations)|
|.NET Core Web Api starter|idea|Simple API starter that already have logging, connection to databases (DocumentDb or MongoDB in Azure Cosmos DB) and sample resource implementation|

### Service Stack Mainsteam project

This is sample project built based on Service Stack components, which basically what we think an ideal solution to start new project at any given point of a time.
