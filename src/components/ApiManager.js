export const getAllProducts = () => {
    return fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
    .then(response => response.json())
}
