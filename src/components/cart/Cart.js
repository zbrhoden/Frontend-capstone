import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from '@material-ui/core/Badge';
import getNewOrder from '../ApiManager';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
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
    const [order, setOrder] = useState({});
    
    console.log("Cart Props", props)
    const cartQuantity = props.cart.reduce((sum, product)=> sum + product.quantity, 0)
    console.log('Quantity',cartQuantity)

   

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   

    
    function handleIncrementProduct(productId, name, price) {
        let newCart=props.cart
        const check_index = newCart.findIndex(item => item.id === productId);{
            newCart[check_index].quantity++;
   
        props.setAppCart(newCart)
    }}

    function handleDecrementProduct(productId, name, price) {
        let newCart=props.cart
        const check_index = newCart.findIndex(item => item.id === productId);{
            console.log("INDEX", check_index)
            newCart[check_index].quantity--;
        
        if (newCart[check_index].quantity == 0){
            handleDeleteProduct(productId, name, price)

        }}
        props.setAppCart(newCart)
    }

    function handleDeleteProduct(productId, name, price) {
        let newCart=props.cart

        newCart.splice(newCart, 1);

        props.setAppCart(newCart)
    }


    // const createPurchase = (id) => {
    //     const newPurchase = {
    //         customerId: parseInt(localStorage.getItem("Purchased Cart")),
    //         productId: id
    //     }
    //     getNewOrder(newPurchase)
    //         .then(() => {
    //             history.push(Order)
    //         })
    // }


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
                <div style={modalStyle} className={classes.paper}>
                    <h2>Your Cart</h2>
                    
                    {
                    props.cart.map(
                        (cart) => {
                            return <h3 className="cartCard">
                                <ul className="products" key={`product--${cart.id}`}>
                                <ul className="product" >{cart.name}</ul>
                                <ul className="product quantity">Quantity: {cart.quantity}</ul>
                                <button 
                                    key={`order-${cart.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick={() => handleIncrementProduct(cart.id, cart.name, cart.price)}
                                >
                                        +
                                    </button>
                                    <button 
                                    key={`order-${cart.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick={() => handleDecrementProduct(cart.id, cart.name, cart.price)}
                                >
                                        -
                                    </button>
                                    <button 
                                    key={`order-${cart.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick={() => handleDeleteProduct(cart.id, cart.name, cart.price)}
                                >
                                        x
                                    </button>
                                    <button 
                                    key={`order-${cart.id}-${Math.random()}`} 
                                    className="order__button"
                                    // onClick={}
                                >
                                        Submit
                                    </button>
                                </ul>
                    </h3>
                    
                    })}
                </div>
            </Modal>
        </div>
        </>
    );
}