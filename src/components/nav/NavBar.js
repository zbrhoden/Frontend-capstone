import "./NavBar.css"
import Cart from '../cart/Cart'
import { Link } from "react-router-dom"

export const NavBar = (props) => {

    return (
        <nav className="NavbarItems">
            <h1 className="NavBar-brand">Blake's Groceries</h1>
            <div className="menu-item"></div>
            <div className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                            () => {
                                localStorage.removeItem("customer")
                            }
                        }>
                        Logout
                </Link>
            </div>
            <Cart setAppCart={props.setAppCart} cart={props.cart} />
            
        </nav>
    )
}
