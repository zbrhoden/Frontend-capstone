import React from "react"
import "./Checkout.css"


export const Checkout = (props) => {
    
        const isCheckedOut = props.cart.isCheckedOut;
        return (
          <div>
            The user is <b>{isCheckedOut ? 'currently' : 'not'}</b> checked out.
          </div>
        )
      
    }