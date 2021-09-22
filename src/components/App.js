import React, { useState, useEffect } from 'react';
import { Products } from './products/Products';
import { NavBar } from './nav/NavBar';
import handleAddToCart from './products/Products'

export const App = () => {
    
    return <>
      <NavBar />
      <Products />
    </>

}