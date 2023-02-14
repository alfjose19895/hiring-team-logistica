import axios from "axios";
import global from "./env"

export default axios.create({
  baseURL: global.Url,
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  }
});