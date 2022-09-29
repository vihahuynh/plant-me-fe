import axios from "axios";
const baseUrl = "http://localhost:3001/api/orders";

const getAll = (query, sort, token) => {
  let queryArr = [];
  if (query?.userId) {
    queryArr = queryArr.concat(`user=${query.userId}`);
  }
  const queryStr = queryArr.join("&");
  return axios.get(`${baseUrl}?${queryStr}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const get = (id, token) => {
  return axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const create = (newObject, token) => {
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, updateObject, token) => {
  return axios.patch(`${baseUrl}/${id}`, updateObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const orderService = { getAll, get, create, update };

export default orderService;
