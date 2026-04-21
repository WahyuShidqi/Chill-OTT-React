import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

if (API_URL) {
  console.log(`API has been loaded succesfully`);
}

if (!API_URL) {
  console.warn("your api is not defined in .env file");
}

export default API_URL;
