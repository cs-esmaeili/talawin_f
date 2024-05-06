import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}product`

export const productList = () => {
    return http.get(`${prefixUrl}/productList`);
};