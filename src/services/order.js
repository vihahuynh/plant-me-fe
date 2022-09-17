import axios from "axios";
const baseUrl = "http://localhost:3001/api/orders";

const getAll = () => {
  return axios.get(baseUrl);
};

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (newObject, token) => {
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const orderService = { getAll, get, create };

export default orderService;
