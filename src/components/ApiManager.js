export const getAllProducts = () => {
    return fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
    .then(response => response.json())
}

export const getNewOrder = (order) => {
    return fetch("http://localhost:8088/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
        .then(res => res.json())
}