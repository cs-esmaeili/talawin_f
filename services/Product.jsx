import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}product`

export const productList = (data) => {
    return http.post(`${prefixUrl}/productList`, JSON.stringify(data));
};