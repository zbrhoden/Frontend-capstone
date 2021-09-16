import React from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import { NavBar } from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Store.css"


export const Store = () => {
    const { isAuthenticated } = useSimpleAuth()

    return <>
        <Route render={() => {
            if (isAuthenticated()) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login">
            <Login />
        </Route>
    </>
}