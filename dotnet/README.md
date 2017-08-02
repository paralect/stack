# Paralect .NET Service Stack

## Technology Stack

To make collaboration simpler and more efficient we will focus around very specific and concise technology stack, which includes following:

1. .NET Core
2. MongoDB, PostgreSQL

### .NET Service Stack Solutions Ideas

#### Solution Structure
Currently solution consists of 5 projects. 
|Project name|Description|
|:--:|:----|
|Ceres.Data|This project contains interfaces for document repository and entites. As well it contains entities implementations. All entites should implement IEntity interface in order to be used with document repository implementations.|
|Ceres.Data.MongoDb| Implementation of MongoDb document repository.|
|Ceres.Landing| Landing site converted to .NET Core MVC application. Contains landing page itself (with free Boostrap theme), login/register pages and App controller (and page) as foundation for SPA.|
|Ceres.WebApi| .NET Core Web Api. Issues and validates JWT tokens for authentication. Current implementation uses MongoDb user manager (and user store), and will be updated to support DocumentDb user manager and user store.|
|Ceres.Services| Will contain implementations of data services.|

##### Ceres.WebApi configuration and deployment
TODO

##### Ceres.Landing configuration and deployment
TODO

##### Ceres.Data: Entities and document repositories implementation
TODO

#### Priority tasks
|Priority|Description|
|:--:|:----|
|1|JWT authentication (full authentication workflow in Web Api (registration, login, forgot password)|
|2|Landing page (authentication and foundation for working with Web Api)|
|3|MongoDb data service|
|4|DocumentDb data service|

#### Starter apps & common REST resources

|Name|Status|Description|
|:--:|:----:|:----------|
|Landing|idea|Sample landing web site with account pages (Signup, Signin, Sign out, Forgot password, confirmations)|
|.NET Core Web Api starter|idea|Simple API starter that already have logging, connection to databases (DocumentDb or MongoDB in Azure Cosmos DB) and sample resource implementation|

### Service Stack Mainsteam project

This is sample project built based on Service Stack components, which basically what we think an ideal solution to start new project at any given point of a time.
