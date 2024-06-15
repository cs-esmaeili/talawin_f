import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}product`

export const productList = (data) => {
    return http.post(`${prefixUrl}/productList`, JSON.stringify(data));
};

export const createProduct = (data) => {
    return http.post(`${prefixUrl}/createProduct`, JSON.stringify(data));
};

export const updateProduct = (data) => {
    return http.post(`${prefixUrl}/updateProduct`, JSON.stringify(data));
};