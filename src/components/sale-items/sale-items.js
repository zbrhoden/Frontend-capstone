import React, { useEffect, useState } from "react"
import "./sale-items.css"
import { getAllProducts } from '../ApiManager'

export const Items = () => {
    const [products, setProducts] = useState([])
    useEffect(
        () => {
                getAllProducts()
                .then((data) => {
                    setProducts(data)
                })
        },
        []
    )

    return (

        <>
            <h3>Available Products</h3>
                <div className="products__header">
                </div>
                {
                    products.map(
                        (product) => {
                            return <h3 className="products__container">
                                <ul className="products" key={`product--${product.id}`}>
                                <ul className="product" >{product.name}</ul>
                                <ul className="product price">${product.price}
                                </ul>
                                <button key={`order--${product.id}`} className="order__button">
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