import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from '@material-ui/core/Badge';

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
    
    console.log("Cart Props", props)
    const cartQuantity = props.cart.reduce((sum, product)=> sum + product.quantity, 0)
    console.log('Quantity',cartQuantity)

   

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    //counttotalquantity of cart
    
    //import and use material ui badge
    


    return (
        <>
        <div>
            {/* {totalQuantity} */}
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
                    <h2>Simple React Modal</h2>
                    
                    {
                    props.cart.map(
                        (cart) => {
                            return <h3 className="cartCard">
                                <ul className="products" key={`product--${cart.id}`}></ul>
                                <ul className="product" >{cart.name}</ul>
                                <ul className="product quantity">Quantity: {cart.quantity}</ul>
                    </h3>
                    })}
                </div>
            </Modal>
        </div>
        </>
    );
}