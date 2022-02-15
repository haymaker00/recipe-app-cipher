import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';                             //imported index.css
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';                      //installed font roboto and imported it
import Home from "./App/App";



ReactDOM.render(
  <Home/>,                                       //rendered the home component
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
