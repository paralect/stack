# Paralect .NET Service Stack

## Technology Stack

To make collaboration simpler and more efficient we will focus around very specific and concise technology stack, which includes following:

1. .NET Core
2. MongoDB, PostgreSQL

### .NET Service Stack Solutions Ideas

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

### Solution Structure

|Project|Description|
|:--:|:----|
|Ceres.Data|This project contains interfaces for document repository and entites. As well it contains entities implementations. All entites should implement IEntity interface in order to be used with document repository implementations.|
|Ceres.Data.MongoDb| Implementation of MongoDb document repository.|
|Ceres.Landing| Landing site converted to .NET Core MVC application. Contains landing page itself (with free Boostrap theme), login/register pages and App controller (and page) as foundation for SPA.|
|Ceres.WebApi| .NET Core Web Api. Issues and validates JWT tokens for authentication. Current implementation uses MongoDb user manager (and user store), and will be updated to support DocumentDb user manager and user store.|
|Ceres.Services| Will contain implementations of data services.|

### Configuration and deployment

#### MongoDb

##### Azure setup
1. In Azure console add new service -> Databases -> Azure Cosmos DB
2. Enter desired account ID
3. Select MongoDB in API dropdown
4. Select subscription, resource group and location
5. Click 'Create' and wait for provisioning to complete
6. In resources list select created database and go to Settings -> Connection Strings to find connection info

##### Local setup
Follow instructions https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

#### Web Api
TODO

#### Ceres.Landing configuration and deployment
TODO

#### Ceres.Data: Entities and document repositories implementation
TODO