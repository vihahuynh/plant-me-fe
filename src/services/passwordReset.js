import axios from "axios";

const baseUrl = "/api/password-reset";

const sendLink = (object) => {
  return axios.post(baseUrl, object);
};

const updatePassword = (userId, token, object) => {
  return axios.post(`${baseUrl}/${userId}/${token}`, object);
};

const passwordResetService = { sendLink, updatePassword };

export default passwordResetService;
