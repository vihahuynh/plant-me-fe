import axios from "axios";

const baseUrl = "/api/carts";

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

const cartService = { get, create, update };

export default cartService;
