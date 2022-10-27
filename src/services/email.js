import axios from "axios";

const baseUrl = 'http://localhost:3001/api/email'

const sendEmail = (email) => {
    return axios.post(baseUrl, email)
}

const emailService = { sendEmail }
export default emailService