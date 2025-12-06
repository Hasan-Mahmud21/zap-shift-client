import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
