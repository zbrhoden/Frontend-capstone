import { useEffect, useState } from "react"
import "./Products.css"
import { getAllProducts } from '../ApiManager'
import Button from '@material-ui/core/Button';


export const Products = (props) => {
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

    function handleAddProductToCart(productId, name, price) {
        let newCart=props.cart.items

        const check_index = newCart.findIndex(item => item.id === productId);
        if (check_index !== -1) {
            //I found the product, increment the quantity
            newCart[check_index].quantity++;

        } else {
            //New product, so add to cart
            newCart.push({...products.find(product => product.id === productId), quantity: 1})
    
        }
        const fullCart = {...props.cart, items: newCart}

        props.setAppCart(fullCart)
    }

    return (

        <>
            <h3>Available Products</h3>
                <div className="products__header">

                </div>
                
                {
                    products.map(
                        (product) => {
                            return<h3 className="cards">
                                <ul className="products" key={`product--${product.id}-${Math.random()}`}>
                                <img className= "product_image" src={product.image}></img>
                                <ul className="product_information">
                                <ul className="product_name" >{product.name}</ul>
                                <ul className="product_price">${product.price}
                                </ul>
                                </ul>
                                <Button variant="contained" spacing={2} 
                                    key={`order-${product.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick={() => handleAddProductToCart(product.id, product.name, product.price)}
                                >
                                        Purchase
                                    </Button>
                            </ul>
                            </h3>
                        }
                    
                    )
                    
                }
                
        </>
    )
}