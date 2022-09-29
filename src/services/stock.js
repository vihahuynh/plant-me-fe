import axios from "axios";

const baseUrl = "http://localhost:3001/api/stocks";

const create = (newObject, token) => {
    return axios.post(baseUrl, newObject, { headers: { Authorization: `bearer ${token}` } })
}

const update = (id, updateObject) => {
    return axios.patch(`${baseUrl}/${id}`, updateObject)
}

const remove = (id, token) => {
    return axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: `bearer ${token}` } })
}

const stockSerice = { create, update, remove }

export default stockSerice