import "./NavBar.css"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export const NavBar = () => {


    return (
        <nav className="NavbarItems">
            <h1 className="NavBar-brand">Blake's Groceries</h1>
            <div className="menu-item">Contact Us</div>
            <div className="menu-item">User Profile</div>
            <ShoppingCartIcon />

        </nav>
    )
}
