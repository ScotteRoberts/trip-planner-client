import React from 'react';
import ReactDOM from 'react-dom';
import './common/styling/index.css';
import App from './components/app';

import { getAppStorage } from './common/tokens/appStorage';

// Grab state from local storage
const token = getAppStorage();

// TODO: Transform this if needed.
const appState = token;

ReactDOM.render(<App store={appState} />, document.getElementById('root'));
