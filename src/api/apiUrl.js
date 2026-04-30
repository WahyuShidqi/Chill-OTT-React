import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL || API_URL.trim() === "") {
  console.warn("your api is not defined in .env file");
} else {
  console.log(`API has been loaded succesfully`);
}

export default API_URL;
