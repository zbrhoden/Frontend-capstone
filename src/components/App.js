import React, { useState} from 'react';
import { Products } from './products/Products';
import { NavBar } from './nav/NavBar';



export const App = () => {
  const [appCart, setAppCart] = useState([])
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
    </>

}
