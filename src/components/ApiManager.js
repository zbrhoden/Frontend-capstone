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
    return fetch(process.env.REACT_APP_BACKEND_URL+"/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(order)
    })
        .then(res => res.json())
}
