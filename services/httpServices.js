import { getCookie } from 'cookies-next';
import axios from "axios";

const token = getCookie('token');
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.data.meessage === "token expired" || error.response.data.meessage === "token is wrong") {
        return Promise.reject(error);
    }
    if (error.response.data.meessage === "permission denid") {
        return Promise.reject(error);
    }
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedErrors) {
        console.log("مشکلی در ارتباط با سرور پیش آمد دوباره تلاش کنید");
    }
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    axios: axios,
};
