import axios from "axios";

const baseUrl = "/api/products";

const getAll = (query) => {
  return axios.get(`${baseUrl}?${query}`);
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

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const productService = { getAll, create, get, update };

export default productService;
