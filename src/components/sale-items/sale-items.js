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
            <div className="products__container">
                <div className="products__header">
                </div>
                {
                    products.map(
                        (product) => {
                            return <ul className="products" key={`product--${product.id}`}>
                                <li className="product" >{product.name}</li>
                                <li className="product price">${product.price}
                                    <button key={`order--${product.id}`} className="order__button">
                                        Purchase
                                    </button>
                                </li>
                            </ul>

                        }
                    )
                }

            </div>

        </>
    )
}