import axios from "axios";

const baseUrl = "http://localhost:3001/api/reviews";

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject, token) => {
    return axios.post(baseUrl, newObject, {
        headers: { Authorization: `bearer ${token}` },
    });
};

const reviewService = { getAll, create }

export default reviewService