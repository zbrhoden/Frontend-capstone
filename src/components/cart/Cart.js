import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from '@material-ui/core/Badge';
// import getNewOrder from '../ApiManager';

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
    //const [checkOut, setCheckout] = React.useState(true);
    // const [order, setOrder] = useState({});
    

    // const createPurchase = () => {
    //     const submittedCart = props.cart.map((cart) => cart )
    //     props.setOrder(submittedCart)
    // }
    console.log("CART CART", props.cart)
    const cartQuantity = props.cart.items.reduce((sum, product)=> sum + product.quantity, 0)


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    const handleCheckout = () => {
        const fullCart = {...props.cart, isCheckedOut: true}
        props.setAppCart(fullCart)
        //setCheckout(checkOut);
    };
    
    function handleIncrementProduct(productId, name, price) {
        let newCart=props.cart.items
        const check_index = newCart.findIndex(item => item.id === productId);{
            newCart[check_index].quantity++;

        const fullCart = {...props.cart, items: newCart}
        props.setAppCart(fullCart)
    }}

    function handleDecrementProduct(productId, name, price) {
        let newCart=props.cart.items
        const check_index = newCart.findIndex(item => item.id === productId);{
            newCart[check_index].quantity--;
        
        if (newCart[check_index].quantity == 0){
            handleDeleteProduct(productId, name, price)

        }}
        const fullCart = {...props.cart, items: newCart}
        props.setAppCart(fullCart)
    }

    function handleDeleteProduct(productId, name, price) {
        let newCart=props.cart.items

        newCart.splice(newCart, 1);

        const fullCart = {...props.cart, items: newCart}
        props.setAppCart(fullCart)
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
                <div style={modalStyle} className={classes.paper}>
                    <h2>Your Cart</h2>
                    
                    {
                    props.cart.items.map(
                        (items) => {
                            return <h3 className="cartCard">
                                <ul className="products" key={`product--${items.id}`}>
                                <ul className="product" >{items.name}</ul>
                                <ul className="product quantity">Quantity: {items.quantity}</ul>
                                <button 
                                    key={`order-${items.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick={() => handleIncrementProduct(items.id, items.name, items.price)}
                                >
                                        +
                                    </button>
                                    <button 
                                    key={`order-${items.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick={() => handleDecrementProduct(items.id, items.name, items.price)}
                                >
                                        -
                                    </button>
                                    <button 
                                    key={`order-${items.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick={() => handleDeleteProduct(items.id, items.name, items.price)}
                                >
                                        x
                                    </button>
                                    <button 
                                    key={`order-${items.id}-${Math.random()}`} 
                                    className="order__button"
                                    onClick= {handleCheckout}
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