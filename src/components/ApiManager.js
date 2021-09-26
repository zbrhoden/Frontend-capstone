export const getAllProducts = () => {
    return fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
    .then(response => response.json())
}

export const postOrder = (order) => {
    const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
    }
        
    return fetch(`http://localhost:8088/orders`, fetchOptions)
    .then(response => response.json())
}