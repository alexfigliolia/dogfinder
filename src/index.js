import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';

ReactDOM.render(
  <App 
  	url='http://localhost:3001/api/dogs'
 	pollInterval={2000} />,
  document.getElementById('root')
);
