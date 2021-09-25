import React, { useState} from 'react';
import { Products } from './products/Products';
import { NavBar } from './nav/NavBar';
import { Checkout } from './checkout/Checkout'


export const App = () => {
  const defaultCart = { isCheckedOut: false, items: []}
  const [appCart, setAppCart] = useState(defaultCart) //replace [] with defaultCart
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function handleAddProductToAppCart(myCart) {
    console.log('APP Cart', myCart)
    setAppCart(myCart)
    forceUpdate()
  }
 

    return <>
    <NavBar setAppCart={handleAddProductToAppCart} cart={appCart} />
    <Products setAppCart={handleAddProductToAppCart} cart={appCart} />
    <Checkout setAppCart={handleAddProductToAppCart} cart={appCart} />
    </>

}
