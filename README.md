# Angular-Assessment

Thank you for choosing to take our Angular skills test!

Please find instructions on how to complete the test [here](https://discord.gg/DVaYBVUh)

---

# MyExams

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run cy_test` to execute the unit tests via Cypress. (use node version 18)

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## API requests and Service

All the API calls and Authentication maneuvers are found in `AuthService` which is injectable in components and any other service.

## Modules

There are only two modules throughout this app, the `AppModule` module and the `AppRoutingModule`. The app module is for all the declarations and imports and the routing module for all the routing.

## Test App

Cypress 17 requires Node.js version 16.14.0 or higher
Run `npm start` to using web on dev environment
Run `npm run server` to run json server
Run `npm run cy_test` to open cypress & execute the end-to-end tests
Select the .cy.ts files to run the tests
