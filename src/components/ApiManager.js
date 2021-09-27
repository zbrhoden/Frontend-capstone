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

export const checkUserEmail = (userEmail) => {
    return fetch(`http://localhost:8088/customers?email=${userEmail}`)
        .then(res => res.json())
}

export const createNewUser = (user) => {
    return fetch("http://localhost:8088/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getCustomers = () => {
    return fetch("http://localhost:8088/customers")
        .then(res => res.json())
}