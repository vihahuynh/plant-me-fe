import axios from "axios";

const baseUrl = "http://localhost:3001/api/notification";

const getAll = (query, sort, token) => {
  let queryArr = [];
  if (query?.userId) {
    queryArr = queryArr.concat(`user=${query.userId}`);
  }
  if (query?.orderId) {
    queryArr = queryArr.concat(`order=${query.orderId}`);
  }
  const queryStr = queryArr.join("&");
  return axios.get(`${baseUrl}?${queryStr}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, newObject, token) => {
  return axios.patch(`${baseUrl}/${id}`, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const notificationService = { getAll, update };

export default notificationService;
