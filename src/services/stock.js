import axios from "axios";

const baseUrl = "http://localhost:3001/api/stocks";

const getAll = (query) => {
  let queryArr = [];
  if (query?.color) queryArr.push(`color=${query.color}`);
  if (query?.size) queryArr.push(`size=${query.size}`);
  if (query?.productId) queryArr.push(`product=${query.productId}`);
  const queryStr = queryArr.join("&").replace("#", "%23");
  return axios.get(`${baseUrl}?${queryStr}`);
};

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (newObject, token) => {
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, updateObject) => {
  return axios.patch(`${baseUrl}/${id}`, updateObject);
};

const remove = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const stockSerice = { getAll, get, create, update, remove };

export default stockSerice;
