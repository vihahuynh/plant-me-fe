import axios from "axios";

const baseUrl = "http://localhost:3001/api/reviews";

const getAll = (query, sort) => {
  let url = baseUrl;
  if (query?.productId) {
    url = `${url}?product=${query.productId}`;
  }
  return axios.get(url);
};

const create = (newObject, token) => {
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, updateObject) => {
  return axios.put(`${baseUrl}/${id}`, updateObject);
};

const reviewService = { getAll, create, update };

export default reviewService;
