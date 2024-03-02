import axios from "axios";
export const URL = "https://thekayalab.softbenz.com/api/product/";
const backend = axios.create({
  baseURL: URL,
});
export default backend;
