import axios from "axios";

export const axiosInstance = axios.create({
  // send the request to same url with /api if both frontend and backend are deployed in the same domain
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : "/api",

  withCredentials: true, // send the cookies along with the request body
});
