import axios from "axios";

const baseUrl = "http://localhost:3001/api/reviews";

const getAll = (query, sort) => {
  let queryArr = [];
  if (query?.productId) {
    queryArr = queryArr.concat(`product=${query.productId}`);
  }
  if (query?.userId) {
    queryArr = queryArr.concat(`user=${query.userId}`);
  }
  const queryStr = queryArr.join("&");
  return axios.get(`${baseUrl}?${queryStr}`);
};

const create = (newObject, token) => {
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, updateObject) => {
  return axios.patch(`${baseUrl}/${id}`, updateObject);
};

const reviewService = { getAll, create, update };

export default reviewService;
