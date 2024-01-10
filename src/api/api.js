// src/api.js

import axios from "axios";

// const [cookies, setCookie] = useCookies(['g-token','jwt']);

const url = process.env.API_URL;
const token = localStorage.getItem("token");

let headers = {
  "Content-Type": "application/json",
};
if (token) {
  headers["Authorization"] = `Token ${JSON.parse(
    localStorage.getItem("token")
  )}`;
}
// import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: url, // your base API URL here
  timeout: 5000, // optional: set a timeout limit for requests
  headers: headers,
});

// Optional: Add request and response interceptors
instance.interceptors.request.use(
  (request) => {
    // Log every request:
    // If you want to add something like an authorization token to every request:
    // request.headers['Authorization'] = `Token ${localStorage.getItem("token")}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
