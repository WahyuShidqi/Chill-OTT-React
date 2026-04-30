import axios from "axios";
import API_URL from "./apiUrl.js";

// * ===================== fetch data ==============================

export const fetchData = async (endpoint) => {
  if (!endpoint) {
    // console.log(`endpoint or id is undefined! endpoint: ${endpoint}`);
    throw new Error("endpoint is required!");
  }
  const res = await axios.get(`${API_URL}/${endpoint}`);
  return res.data;
};

// ! fetch from specific endpoint
export const getMovies = () => fetchData("products");

// * ===================== post data ==============================

export const postData = async (endpoint, data) => {
  if (!endpoint || !data) {
    throw new Error("endpoint or data is required");
  }

  const res = await axios.post(`${API_URL}/${endpoint}`, data);
  return res.data;
};

// ! post to specific endpoint

export const postMovie = (data) => postData("products", data);

// * ===================== update data ==============================

const updateData = async (endpoint, id, data) => {
  if (!endpoint || !data) {
    throw new Error("endpoint or data is required");
  }

  const res = await axios.put(`${API_URL}/${endpoint}/${id}`, data);
  return res.data;
};

// ! update to specific endpoint

export const updateMovie = (id, data) => updateData("products", id, data);

//* delete data
export const deleteData = async (endpoint, id) => {
  if (!endpoint || !id) {
    throw new Error("endpoint or id is required!");
  }

  const res = await axios.delete(`${API_URL}/${endpoint}/${id}`);
  return res.data;
};
