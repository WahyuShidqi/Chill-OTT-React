import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "./apiUrl";

const useFetchData = (endpoint) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!API_URL || API_URL.trim() === "") {
      console.log("No api url has been found");
      setError("No api url has been found!");
      return;
    }
    if (!endpoint) {
      console.log(
        "No endpoint has been found",
        `current endpoint: ${endpoint}`,
      );
      setError("No endpoint has been found!");
      return;
    }
    try {
      setLoading(true);
      const { data: response } = await axios.get(`${API_URL}/${endpoint}`);
      setData(response);
      setError(null);
    } catch (error) {
      setError(`Failed to get data from database :( ${error.message}`);
      console.log("failed to fetch data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);
  return {
    data,
    loading,
    error,
    mutate: fetchData,
  };
};

export default useFetchData;
