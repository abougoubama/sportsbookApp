# SportsBookApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Sports Betting Bet Slip
This project is a sports betting technical test built with Angular.

The application displays a list of sports matches with their odds and allows the user to select one odd per match, manage a bet slip, and see a potential gain based on the entered stake.

## Features

- Display a list of matches from mock data
- Display odds for each match
- Select one odd per match
- Replace the selected odd for the same match
- Remove a selected odd by clicking on it again
- Display the current bet slip
- Enter a stake
- Compute the potential gain

## Tech stack

- Angular
- TypeScript
- SCSS
- RxJS

- Angular standalone components

## Run the project

Install dependencies:

```bash
npm install
```

## Run the project
npm start

## Run the test

npm test

Architecture choices

The application is split into dedicated components:

MainLayoutComponent: handles the global page layout

MatchListComponent: displays matches and odds

BetSlipComponent: displays selected bets and the summary

A shared service is used to centralize the bet slip state.

Selections are stored by matchId to ensure that only one odd can be selected per match.

Functional assumptions

The application is based on mock data

A user can select multiple matches

Only one odd can be selected per match

The stake is global to the bet slip

The potential gain is calculated from the selected odds and the entered stake

Possible improvements

Add more unit tests

Improve responsive behavior

Connect to a real backend API

Improve accessibility

