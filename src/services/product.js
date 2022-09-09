import axios from "axios";

const baseUrl = 'http://localhost:3001/api/products'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (formData, token) => {
    console.log(token)
    return axios.post(baseUrl, formData, { headers: { Authorization: `bearer ${token}` } })
}

const productService = { getAll, create }

export default productService