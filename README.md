# TodoApp using Angular 7 and Node.js

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Installation

- Install node.js and mongoDB, if not installed already.
- Run `git clone https://github.com/abdatta/todo-app.git` to clone the repo.
- Run `cd todo-app && npm install` to install dependencies for the Angular frontend.
- Run `cd server && npm install` to install dependencies for the Express backend.

## Development server

- Start an instance of mongodb first.
- Run `npm start` to start the dev server. You dont have to start the backend server seperately.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- You can login to the Admin account using username `admin` and password `admin123`.

## Build

- Run `npm run build` to build the entire project. The build artifacts of both the frontend and the backend will be stored in the `dist/` directory.
- After this, simply run `node index.js` inside the `dist/` directory to run the built app.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). These tests are generated by [Angular CLI](https://github.com/angular/angular-cli).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). These tests are also generated by [Angular CLI](https://github.com/angular/angular-cli).

## Further help

To get more help on the project contact me at abdatta@iitk.ac.in.
