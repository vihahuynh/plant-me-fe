import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const getAll = () => {
    return axios.get(baseUrl)
}

const userService = { getAll, create }
export default userService