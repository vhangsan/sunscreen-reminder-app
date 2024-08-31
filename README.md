# Sun Safe Alert 🌞
Sun Safe Alert is a React-based web application designed to helps users stay safe from harmful sunrays by providing real-time UV index data, weather conditions, and personalized alerts for sunscreen application. Enter a ZIP code to get the latest UV information.

## Features
* Real-time UV index: fetch current UV index based on user-inputted ZIP code
* Weather information: see temperature and weather conditions in your area
* Alerts: receive alerts when the UV is high to protect your skin
* ZIP Code Search: enter 5-digit U.S. ZIP code to retrieve UV and weather data for that location

## Set Up and Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites
* install Node.js and npm on local machine
* API keys for [OpenCageData](https://opencagedata.com/api#quickstart) and [OpenUV](https://www.openuv.io/dashboard)

### Starting the App

To start project directory, run:

### `npm start`

This will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building the App

### `npm run build`

This will create a `build` directory that correctly bundles React in production mode and optimizes the build for the best performance.

## Usage
1. Enter ZIP Code: type in valid 5-digit U.S. ZIP code in search bar
2. Retrieve Information: the app fetches and displays the geolocation, temperature, weather conditions, and current time & date for the entered location
3. Alerts: if the UV index is above 2, an alert will prompt users to apply sunscreen

## Future Refinements
* initialize the page with the user's current location based on the browser's geolocation
* provide real-time alerts on mobile devices to remind users to apply sunscreen every 2 hours based on UV index information