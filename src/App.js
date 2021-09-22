import React from 'react';
import { Products } from './components/products/Products';
import { NavBar } from './components/nav/NavBar';
import SimpleModal from './components/cart/Cart'


export const App = () => {
    
    return <>
      <NavBar />
      <SimpleModal />
      <Products />
    </>

}