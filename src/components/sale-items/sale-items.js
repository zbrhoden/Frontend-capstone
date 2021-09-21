import React, { useEffect, useState } from "react"
import "./sale-items.css"
import { getAllProducts } from '../ApiManager'

export const Items = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(
        () => {
                getAllProducts()
                .then((data) => {
                    setProducts(data)
                })
        },
        []
    )

    function handleAddProductToCart(productId, name, price) {
        console.log('You clicked add.', productId);
        let newCart=cart
        
        //is this item in the cart
        //--loop/find
        //--create a var isFound=true/false
        //if yes, add 1 to quantity
        //if no, add item to cart
        //--use isfound==false


        //--create a cart item
        const cartItem = {
             id: productId,
             name,
             price,
             quantity: 1
        } 
        newCart.push (cartItem)
        //--push item into cart
        console.log('contents of newCart', newCart);

        setCart(newCart)
    }

    return (

        <>
            <h3>Available Products</h3>
                <div className="products__header">
                </div>
                {
                    products.map(
                        (product) => {
                            return <h3 className="card">
                                <ul className="products" key={`product--${product.id}`}>
                                <ul className="product" >{product.name}</ul>
                                <ul className="product price">${product.price}
                                </ul>
                                <button 
                                    key={`order--${product.id}`} 
                                    className="order__button"
                                    onClick={() => handleAddProductToCart(product.id, product.name, product.price)}
                                >
                                        Purchase
                                    </button>
                            </ul>
                            </h3>
                        }
                    
                    )
                    
                }
        </>
    )
}