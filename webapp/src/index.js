import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configStore } from './stores';

ReactDOM.render(<Provider store={configStore()}>
  <Router>
    <App />
  </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
