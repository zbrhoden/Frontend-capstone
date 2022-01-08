import "./Checkout.css"


export const Checkout = (props) => {
        const cartQuantity = props.cart.items.reduce((sum, product)=> sum + product.quantity, 0)
        const cartPrice = props.cart.items.reduce((sum, product)=> sum + (parseFloat(product.price) * product.quantity), 0)

        const isCheckedOut = props.cart.isCheckedOut;

console.log(props)

        return (
          <div>
            <b>{ `Thank you for purchasing ${cartQuantity} products totaling $${cartPrice.toFixed(2)}`}</b>

          </div>
        )
      
    }