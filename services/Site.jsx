import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}site`


export const firstPage = () => {
    return http.post(`${prefixUrl}/firstPage`);
};

export const updateFirstPage = (data) => {
    return http.post(`${prefixUrl}/updateFirstPage`, JSON.stringify(data));
};

