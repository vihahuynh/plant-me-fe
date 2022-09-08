import axios from "axios";

const baseUrl = 'http://localhost:3001/api/login'

const login = (data) => {
    return axios.post(baseUrl, data)
}

const loginService = { login }

export default loginService