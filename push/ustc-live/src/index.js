import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import 'antd/dist/antd.css';
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
window.addEventListener('onunhandledRejection', error => {
  console.log('unhandledRejection', error);
});

