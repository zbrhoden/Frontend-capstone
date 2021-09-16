import React from "react"
import { Route } from "react-router-dom"

import UserRoutes from "./UserRoutes.js"
import SearchResults from "./search/SearchResults"


export default () => {
    return (
        <>
            <UserRoutes />

            <Route path="/search">
                <SearchResults />
            </Route>
        </>
    )
}