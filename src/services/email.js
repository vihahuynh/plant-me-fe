import axios from "axios";

const baseUrl = "/api/email";

const sendEmail = (email) => {
  return axios.post(baseUrl, email);
};

const emailService = { sendEmail };
export default emailService;
