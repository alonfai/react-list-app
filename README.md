# Crypto Demo App

This project was based on the [Create React App](https://github.com/facebook/create-react-app) template.

It consists of building a two screens app used to explore prices of various cryptocurrencies available on the exchange platform. It uses React to render all UI, together with the following essentials:

- Typescript 4.x+
- ESLint + Prettier for coding standard and formatting
- React-Router for defining different routes of the app
- [Chakra UI](https://chakra-ui.com/) for rendering accessible components
- [date-fns](https://date-fns.org/) for date manipulation
- [React-Query](https://react-query.tanstack.com/) for caching/fetching data from remote API

The project uses environment variables to define the different API endpoints inside `.env`:

- REACT_APP_API_BASE
- REACT_APP_API_EXCHANGE_DOMAIN


## Pre requirements

Have NPM or yarn on your machine and execute the following.

```js
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yan coverage`

Launches the test runner in the interactive watch mode and an integrated coverage reporter.

### `yan lint`

Executes ESLint on all files inside the `src` folder

### `yan lint:fix`

Executes ESLint with auto fix problems on all files inside the `src` folder

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This command will remove the single build dependency from your project.
