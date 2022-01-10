import { useEffect, useState } from "react"
import "./Products.css"
import { getAllProducts } from '../ApiManager'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { indigo, red } from '@material-ui/core/colors'

const greenTheme = createTheme({ palette: { primary: indigo}})


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
                <Grid container columns={{ xs: 4}}>
                {                    
                    products.map(
                        (product, index) => {
                            return<>
                             <Grid item xs={2} sm={4} md={4} key={index-`${Math.random()}`}>
                                <img className= "product_image" src={product.image}></img>
                                <ul className="product_name" >{product.name}: ${product.price}</ul>
                                <MuiThemeProvider theme={greenTheme}>
                                <Button variant="contained" color="primary" spacing={2} 
                                    key={`order-${product.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick={() => handleAddProductToCart(product.id, product.name, product.price)}
                                >
                                        ADD TO CART
                                    </Button>  
                                </MuiThemeProvider>  
                                </Grid>
                                </>
                               
                        }
                    
                    )
                    
                }
                </Grid>
                
        </>
    )
}