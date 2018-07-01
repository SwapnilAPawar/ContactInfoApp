# ContactInfoApp
This is a demo application for maintaining the contacts information. This is solution is built using Repository Pattern in Layered Architecture. I have used repository pattern, Entity Framework using Code First from Database, Web API, SQL Server 2012, Unit of Work, Castle Windsor, Unit Testing using Moq and Angular 6 application using Angular Cli 6 in ASP.NET applications. 
## Getting Started
### Structure
#### ContactInfoApp.Data – Entities
Class Library Project – This project contains the entities creating using Entity Framework using Code First from Database and the migration scripts.
#### ContactInfoApp.Repositories – Repositories and Unit of Work
Class Library Project – This project contains the implementation of the Repository Pattern and Unit of Work. It contains generic repository and repository for individual domain entities. It helps to perform CRUD operations through an interface that exposes domain entities and hides the implementation details of database.
#### ContactInfoApp.Services – Business logics and Interfaces
Class Library Project – This project contains the business logic. Here we fetch data using unit of work and repositories. Also it has model conversion logic and models that are exposed to Web API.
#### ContactInfoApp.Services.UnitTests – Unit tests for Services
Unit Test Project – This project contains the unit tests for the implementation in the ContactInfoApp.Services project.
#### ContactInfoApp.WebAPI – Web API
Web API Project – This project is exposed to the presentation application. It contains the calls to the service methods. It also contains the implementation of IOC using Castle Windsor.
#### ContactInfoApp.WebAPI.UnitTests – Unit tests for Web API
Unit Test Project – This project contains the unit tests for the implementation in the ContactInfoApp.WebAPI project.
#### ContactInfoApp.WebApp – Angular 6
Angular 6 Project – This project is the front end application. Here we have bootstrap, font awesome and ng-bootstrap to build the html. It has Lazy Loading implemented.  It has following structure
```
/dist (created on the fly)
/e2e (contains e2e tests)
/src
	/app
		/_entities (contains models for the entities)
		/_error-handlers (contains global implementation to handle error)
		/_guards (contains auth guard)
		/_Interceptors (contains header interceptors)
		/_services (contains contact, loader, notification and table services )
		/contact (contains route, module and the components for the contact module)
			/contact-add (contains component and html for adding contact)
			/contact-edit (contains component and html for editing contact)
/contact-index (contains component and html for displaying list of contacts)
		/page-not-found
	/assets
		/images
	/environments (contains environmental configurations for development and production)
```	
### Prerequisites
Things required to execute the code
```
1.	npm - 5.6.0
2.	node - v8.10.0
3.	Angular CLI: 6.0.8
4.	Visual Studio 2015/2017
5.	SQL Server and SSDT (currently included database file in API project and connection string refers this file.)
```
### Installing and Running the application
#### Install npm Packages
•	Open command prompt with path to the ContactInfoApp.WebApp.
•	Execute command “npm install” to install npm packages.
#### Dev Builds
•	Open command prompt with path to the ContactInfoApp.WebApp.
•	Execute command “ng build” to build with development environment configuration.
#### Prod Builds
•	Open command prompt with path to the ContactInfoApp.WebApp.
•	Execute command “ng build --prod” to build with production environment configuration.
#### Run Project
•	Open the visual studio. (Note: As the database mdf file is present in project. So if there is access issues related to database, open Visual Studio with run as Administrator privilages.)
•	Open project.
•	Make sure the connection string is correct and pointing to database in ContactInfoApp.WebAPI > App_Data.
•	Build the project and hit F5 to start debugging. It will run API with url http://localhost:38102/ in browser
•	As home page is not created, browser will show HTTP Error 403.14 - Forbidden error page but it is fine.
•	Open command prompt with path to the ContactInfoApp.WebApp.
•	Execute command “ng serve” to run the angular application.
•	Open browser and type http://localhost:4200/contact to run the application in browser.



## Authors

* **Swapnil Pawar** 
