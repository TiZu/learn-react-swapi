# learn-react-swapi

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

**Read carefully and don't skip the "Available Scripts" part below!**

You may clone and or fork this repository.\
If you decide to clone this repository please create a feature branch hence the main branch is protected and can only be updated via reviewed pull requests.

### Tooling

#### Package Manager

This repository uses [yarn](https://yarnpkg.com/) as its primary package manager.\
To install yarn you can use the command:

`npm install -g yarn`

#### Extensions

The project includes settings for VSCode which enable debugging, linting and formatting.

Thereform the following extensions are recommended to use:

- [Editor Config](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Project Structure

#### React App

The project comes with an empty react app located in the `src` folder.\
Make use of the included folders to organize your source code!

#### Mock Api

The project includes a development api which will run concurrently to provide data while development is in progress.\
The sources for the api are included in the folder `tools/mocks/api`.

### Debugging

There are two debug configurations available:

#### `Debug /w Chrome`

Use this if you prefer to start the development server on your own using the script `yarn start`.

#### `Run & Debug /w Chrome`

This configuration will launch the script `yarn start` within VSCode.\
Once the development server is running Chrome opens up automatically.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Will simultaniously run `start:api` and `start:app`.\
Once the development servers are running you can browse:

- the app: [http://localhost:3000](http://localhost:3000)
- the api: [http://localhost:4000](http://localhost:4000) (or the port specified in your `.env` file.)

See below for further descriptions.

### `yarn start:api`

Runs the development api on the port specified via `.env` file property `API_PORT`.\
If no port was specified the api will run on port `4000`.

**Important:** This will reset the database to it's initial state everytime this script runs.

### `yarn start:app`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn clean`

Safely deletes any build artifacts created by `yarn build`.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
