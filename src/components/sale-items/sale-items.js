import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./sale-items.css"
import { getAllProducts } from '../ApiManager'

export const Items = () => {
    const [products, setProducts] = useState([])
    const history = useHistory()
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
                    <div>Name</div>
                    <div>Type</div>
                    <div>Price</div>
                </div>
                {
                    products.map(
                        (product) => {
                            return <ul className="products" key={`product--${product.id}`}>
                                <li className="product" >{product.name}</li>
                                <li className="product price">${product.price}
                                    <button key={`order--${product.id}`} className="order__button"
                                        onClick={() => {
                                            createPurchase(product.id)
                                        }}>
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