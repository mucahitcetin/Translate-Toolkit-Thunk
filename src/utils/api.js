import axios from "axios";

export const api = axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "30418d35bamsh50070aa98b8accbp1ebf89jsnb5d8639c1cb0",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
    "Content-Type": "application/json",
  },
});
