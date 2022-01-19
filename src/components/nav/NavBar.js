import "./NavBar.css"
import Cart from '../cart/Cart'
import { Link } from "react-router-dom"
import { getAllOrders } from "../ApiManager"


export const NavBar = (props) => {

    return (
        <nav className="NavbarItems">
            <h1 className="NavBar-brand">Blake's Groceries</h1>
            <div className="menu-item"
                onClick={
                    () => {
                        
                    }
                }
            
            >    
                Order List</div>
            <div className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                            () => {
                                localStorage.removeItem("token")
                            }
                        }>
                        Logout
                </Link>
            </div>
            <Cart setAppCart={props.setAppCart} cart={props.cart} />
            
        </nav>
    )
}
