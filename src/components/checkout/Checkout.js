import React from "react"
import "./Checkout.css"


export const Checkout = (props) => {
        const cartQuantity = props.cart.items.reduce((sum, product)=> sum + product.quantity, 0)
        const cartPrice = props.cart.items.reduce((sum, product)=> sum + (parseFloat(product.price) * product.quantity), 0)

        const isCheckedOut = props.cart.isCheckedOut;

        console.log("CHECKOUT CART", props.cart.items)
        console.log("TOTAL QUANTITY", cartQuantity)
        console.log("TOTAL PRICE", cartPrice)


        return (
          <div>
            <b>{isCheckedOut ? `The user is checked out with ${cartQuantity}` : ''}</b>

          </div>
        )
      
    }