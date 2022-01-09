import React from "react"
import { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from '@material-ui/core/Badge';
import {postOrder} from '../ApiManager';
import "./Cart.css"
import { Checkout } from '../checkout/Checkout'
import { getAllDiscounts } from '../ApiManager'



function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 
    const left = 50 
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        position:'absolute',
        overflow:'scroll',
        height:'100%',
        display:'block'
        
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Cart(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [myLastOrder, setMyLastOrder] = React.useState({});
    const [allDiscounts, setAllDiscounts] = React.useState({});
    



    const cartQuantity = props.cart.items.reduce((sum, product)=> sum + product.quantity, 0)
    const cartPrice = props.cart.items.reduce((sum, product)=> sum + (parseFloat(product.price) * product.quantity), 0)
    
    useEffect(
        () => {
                getAllDiscounts()
                .then((data) => {
                    setAllDiscounts(data)
                })
        },
        []
    )

    const handleOpen = () => {
        setOpen(true);
        console.log("cart", props.cart.items)
        console.log("discounts", allDiscounts)
        calculateCart()
        console.log("Calc'd cart", props.cart.items)
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    const calculateCart = () => {
        let newCart = props.cart.items
        for (let i = 0; i < newCart.length; i++) {
            let item = newCart[i]
            item['discountPercentage'] = findDiscount(item);
            item['totalOriginalPrice'] = (parseFloat(item.price) * item.quantity).toFixed(2)
            item['discountPrice'] = (1 - item['discountPercentage']) * parseFloat(item.price)
            item['totalPrice'] = (item['discountPrice'] * item.quantity).toFixed(2)
            item['totalSavings'] = (parseFloat(item['totalOriginalPrice']) - parseFloat(item['totalPrice'])).toFixed(2)
            newCart[i] = item
          
        }
        const fullCart = {...props.cart, items: newCart}
        props.setAppCart(fullCart)
    }

    const findDiscount = (item) => {
        let itemDiscount = 0;
        for (let i = 0; i < allDiscounts.length; i++) {
            const discountItem = allDiscounts[i]
            if(discountItem.inventory.id == item.id){
                //Name of item matches requirement of discount
                if(item.quantity >= discountItem.quantity){
                    //Quantity matches requirement to discount
                    itemDiscount += parseFloat(discountItem.discount_percentage)
                }
            }
        }
        return itemDiscount
    }


    const handleCheckout = () => {
        const fullCart = {...props.cart, isCheckedOut: true}
        props.setAppCart(fullCart)
        //setOpen(false);
        
        const orderDate = new Date()
        const orderDateFormatted = orderDate.toLocaleString("en-US")

        const order = {
            id: Date.now(), 
            order_date: orderDateFormatted,
            items: fullCart.items
        }
        postOrder(order)
        setMyLastOrder(order)
        //handleDeleteProduct(fullCart)
        props.setAppCart({ isCheckedOut: false, items: []})
    };
    


    function handleIncrementProduct(productId, name, price) {
        let newCart=props.cart.items
        const check_index = newCart.findIndex(item => item.id === productId);{
            newCart[check_index].quantity++;

        const fullCart = {...props.cart, items: newCart}
        props.setAppCart(fullCart)
        calculateCart()
    }}



    function handleDecrementProduct(productId, name, price) {
        let newCart=props.cart.items
        const check_index = newCart.findIndex(item => item.id === productId);{
            newCart[check_index].quantity--;
        
        if (newCart[check_index].quantity === 0){
            handleDeleteProduct(productId, name, price)

        }}
        const fullCart = {...props.cart, items: newCart}
        props.setAppCart(fullCart)
        calculateCart()
    }



    function handleDeleteProduct(productId, name, price) {
        let newCart=props.cart.items

        newCart.splice(newCart, 1);

        const fullCart = {...props.cart, items: newCart}
        props.setAppCart(fullCart)
        calculateCart()
    }



    return (
        <>
        <div>

            <Button onClick={() => handleOpen()}>
            <Badge badgeContent={cartQuantity} ><ShoppingCartIcon /></Badge>
                
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                {myLastOrder.total_price > 0 && props.cart.items.length == 0 ? ( 
                    <div style={modalStyle} className={classes.paper}>
                        <h2>Your Order</h2>
                        <Checkout cart={myLastOrder} /> 
                
                 </div>
                ): 
            (
                <div style={modalStyle} className={classes.paper}>
                    <h2>Your Cart</h2>

                    {
                    props.cart.items.map(
                        (items) => {
                            return <h3 className="cartCard">
                                
                                <ul className="products" key={`product--${items.id}-${Math.random()}`}>
                                <img src={items.image} width="130" height="130"></img>
                                <ul className="product" >{items.name}</ul>
                                <ul className="product_quantity">Quantity: {items.quantity}</ul>
                                <ul className="product_price">Item Price: ${items.price}</ul>
                                <ul className="product_total_price">Total Price: ${items.totalPrice}</ul>
                                <Button variant="contained" spacing={2}
                                    key={`order-${items.id}-${Math.random()}`} 
                                    className="cart__button"
                                    onClick={() => handleIncrementProduct(items.id, items.name, items.price)}
                                >
                                        +
                                    </Button>
                                    
                                    <Button variant="contained" spacing={2}
                                    key={`order-${items.id}-${Math.random()}`} 
                                    className="cart__button"
                                    onClick={() => handleDecrementProduct(items.id, items.name, items.price)}
                                >
                                        -
                                    </Button>
                                    <Button variant="contained" spacing={2}
                                    key={`order-${items.id}-${Math.random()}`} 
                                    className="cart__button"
                                    onClick={() => handleDeleteProduct(items.id, items.name, items.price)}
                                >
                                        Delete
                                    </Button>

                                
                                </ul>
                                
                    </h3>
                    
                    })}
                                <Button variant="contained" spacing={2}
                                    key={`order-${Math.random()}`} 
                                    className="order__button"
                                    onClick= {handleCheckout} 
                                >
                                        Submit
                                </Button>
                </div>)}
            </Modal>
        </div>
        </>
    );
}