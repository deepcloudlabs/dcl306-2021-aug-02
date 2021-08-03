import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import Mastermind from "./components/mastermind";
import UserWins from "./components/user-wins";
import UserLoses from "./components/user-loses";
import {Route, BrowserRouter as Router} from "react-router-dom"
// 1. Mastermind --> stateful function component
// 2. Feature: 1 min
const routing = (
    <Router>
        <Route path="/" exact component={Mastermind}></Route>
        <Route path="/wins" component={UserWins}></Route>
        <Route path="/loses" component={UserLoses}></Route>
    </Router>
)
ReactDOM.render(
  <React.StrictMode>
      {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
