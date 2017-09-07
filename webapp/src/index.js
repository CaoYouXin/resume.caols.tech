import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configStore } from './stores';

import App from "./App";

ReactDOM.render(<Provider store={configStore()}>
  <Router>
    <App />
  </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
