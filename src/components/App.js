import React, { useState} from 'react';
import { Products } from './products/Products';
import { NavBar } from './nav/NavBar';
import { Checkout } from './checkout/Checkout'
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Route, Redirect } from "react-router-dom";

export const App = () => {
  const defaultCart = { isCheckedOut: false, items: []}
  const [appCart, setAppCart] = useState(defaultCart) //replace [] with defaultCart
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function handleAddProductToAppCart(myCart) {

    setAppCart(myCart)
    forceUpdate()
  }
 

  return (
    <>
        <Route
            render={() => {
                if (localStorage.getItem("token")) {
                    return (
                        <>
                          <NavBar setAppCart={handleAddProductToAppCart} cart={appCart} />
                          <Products setAppCart={handleAddProductToAppCart} cart={appCart} />
                          {/* <Checkout setAppCart={handleAddProductToAppCart} cart={appCart} />  */}
                        </>
                    );
                // } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
  
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
  
    </>
  )
}
