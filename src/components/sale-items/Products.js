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
            const check_index = newCart.findIndex(item => item.productId === productId);
                if (check_index !== -1) {
                    newCart[check_index].quantity++;
                } else {
                    newCart.push({...products.find(p => p.id === productId), quantity: 1})
                    console.log('The product has been added to cart:', newCart);
                
            }
        //is this item in the cart
        //--loop/find
        //--create a var isFound=true/false
        //if yes, add 1 to quantity
        //if no, add item to cart
        //--use isfound==false
        //--create a cart item
        //--push item into cart

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