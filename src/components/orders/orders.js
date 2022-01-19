import React, { useState, useEffect } from "react"
import { DataGrid} from '@mui/x-data-grid'
import { getAllOrders } from "../ApiManager"


export const OrderList = () => {
    const [order, setOrder] = useState([])
    const [orderRows, setRows] = useState([])


    const orderFetcher = () => {
        getAllOrders()
            .then(data => setOrder(data))
    }

    useEffect(() => {
        orderFetcher()
    }, [])

    const createOrderRows = () => {
        getAllOrders()
        .then(data => {
            const rows = []
            for (const row of data) {
                
                const rowObject = {
                    id: row.id,
                    col1: row.order_date,
                    col2: row.items.totalPrice,
                    col3: row.items.quantity
                }
            
                rows.push(rowObject)
            }
            setRows(rows)
        })
    }

    useEffect(() => {
        orderFetcher()
        createOrderRows()
    }, [])


    const columns= [
        { field: "id", hide: true },
        { field: "col1", headerName: "Order Date", width: 150 },
        {field: "col2", headerName: "Total Price", width: 150 },
        {field: "col3", headerName: "Total Quantity", width: 150 },
    ]



        return (
            <article className="orders">
                <header className="orderss_header">
                    <h1> Orders </h1>
                    <div style={{ height: 300, width: "100%" }}>
                    <DataGrid rows={orderRows} columns={columns} />
                    </div>
                </header>
            </article>
        )
    }