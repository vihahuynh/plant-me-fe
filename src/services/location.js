import axios from "axios";

const baseUrl = "https://provinces.open-api.vn/api/";

const getAll = () => {
  return axios.get(baseUrl);
};

const locationService = { getAll };
export default locationService;
