export const getAllProducts = () => {
    return fetch(process.env.REACT_APP_BACKEND_URL+"/inventory", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getAllDiscounts = () => {
    return fetch(process.env.REACT_APP_BACKEND_URL+"/discount", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
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
