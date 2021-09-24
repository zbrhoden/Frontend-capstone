
import "./NavBar.css"
import Cart from '../cart/Cart'


export const NavBar = (props) => {
    return (
        <nav className="NavbarItems">
            <h1 className="NavBar-brand">Blake's Groceries</h1>
            <div className="menu-item">Contact Us</div>
            <div className="menu-item">User Profile</div>
            <Cart setAppCart={props.setAppCart} cart={props.cart} />

        </nav>
    )
}
