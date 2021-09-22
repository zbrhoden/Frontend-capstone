import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Products } from './components/sale-items/Products';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './components/nav/NavBar';
import SimpleModal from './components/cart/Cart'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <SimpleModal />
      <Products />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
