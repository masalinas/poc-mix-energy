# Description

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0. This project represente a portal where analize the REE data offer from  public API **apidatos.ree.es**

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Compile image for amd64 architecture

`$ docker buildx build --platform linux/amd64 -t ofertoio/poc-mix-energy-amd64:1.1.0 .`

![Mix Dashboard](./images/dashboard.png "Mix Dashboard")

## Some links

- [REE API](https://www.ree.es/es/datos/apidatos) 