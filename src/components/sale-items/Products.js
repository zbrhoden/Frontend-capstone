import React, { useEffect, useState } from "react"
import "./Products.css"
import { getAllProducts } from '../ApiManager'

export const Products = () => {
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
        let newCart=cart
        const check_index = newCart.findIndex(item => item.id === productId);
        if (check_index !== -1) {
            //I found the product, increment the quantity
            newCart[check_index].quantity++;
            console.log("Quantity updated:", newCart);
        } else {
            //New product, so add to cart
            newCart.push({...products.find(product => product.id === productId), quantity: 1})
            console.log('The product has been added to cart:', newCart);     
        }
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