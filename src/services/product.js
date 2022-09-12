import axios from "axios";

const baseUrl = 'http://localhost:3001/api/products'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject, token) => {
    console.log(token)
    return axios.post(baseUrl, newObject, { headers: { Authorization: `bearer ${token}` } })
}

const productService = { getAll, create }

export default productService