import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./NavBar.css"



export const NavBar = () => {
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth()
    const history = useHistory()

    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top onTop">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/"> Ryleigh's Grocery <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <Link onClick={() => {
                                        logout()
                                    }} className="nav-link" to="/login">Logout {getCurrentUser().name}</Link>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}