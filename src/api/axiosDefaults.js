import axios from "axios";

axios.defaults.baseURL = "https://drf-api-to-do-it-66c166422b31.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
