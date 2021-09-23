import React, { useState, useEffect } from 'react';
import { Products } from './products/Products';
import { NavBar } from './nav/NavBar';



export const App = () => {
  const [cart, setCart] = useState([])
  function handleAddProductToAppCart(myCart) {
    console.log('appCart', myCart)
    setCart(myCart)
  }
    return <>
    <NavBar setAppCart={handleAddProductToAppCart} cart={cart}/>
    <Products setAppCart={handleAddProductToAppCart} cart={cart} />
    </>

}
