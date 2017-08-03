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
1. In Azure portal add new service -> Databases -> Azure Cosmos DB
2. Enter desired account ID
3. Select MongoDB in API dropdown
4. Select subscription, resource group and location
5. Click 'Create' and wait for database provisioning to complete
6. In resources list select created database and go to Settings -> Connection Strings to find connection info

##### Local setup
[Installation instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

#### Web Api
1. In Azure portal add new service -> Web + Mobile -> Web App
2. Enter App name, select subscription and resource group
3. Select or create App service plan and location
4. Click 'Create' and wait for App provisioning to complete
5. In Web Api appsettings.json under CorsSettings set allowed origins URLs (URL can be found in Azure portal in web app/web site overview)
6. In Web Api appsettings.json under MongoDbConfiguration set MongoDB connection string (see MongoDb configuration section) and database name
7. Right-click on Ceres.WebApi project -> Publish
8. Select 'Microsoft Azure App Service'
9. Sign in to your Microsoft account
10. Click 'Change Type' and select 'API App'
11. Select subscription.
12. Select existing resource group or click 'New' and enter resource group name.
13. Select existing App service plan or click 'New' and create new plan.
14. Publish application
15. Verify application deployed correctly
16. Publish profile will be created under project Properties -> PublishProfiles and can be used for future deployments

#### Ceres.Landing configuration and deployment
TODO

#### Ceres.Data: Entities and document repositories implementation
TODO