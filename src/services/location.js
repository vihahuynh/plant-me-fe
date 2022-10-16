import axios from "axios";

const baseUrl = "https://provinces.open-api.vn/api/";

const getProvinces = () => {
  return axios.get(baseUrl);
};

const getDistricts = (code) => {
  return axios.get(`${baseUrl}p/${code}?depth=2`);
};

const getWards = (code) => {
  return axios.get(`${baseUrl}d/${code}?depth=2`);
};

const locationService = { getProvinces, getDistricts, getWards };
export default locationService;
