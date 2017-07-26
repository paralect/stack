# Paralect .NET Service Stack

## Technology Stack

To make collaboration simpler and more efficient we will focus around very specific and concise technology stack, which includes following:

1. .NET Core
2. MongoDB, PostgreSQL

### .NET Service Stack Solutions Ideas

#### Priority tasks
|:--:|:----|
|Landing page (authentication and foundation for working with Web Api)|
|JWT authentication (full authentication workflow in Web Api (registration, login, forgot password)|
|MongoDb data service|
|DocumentDb data service|

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
