import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}apibox`

export const apiBoxList = (data) => {
    return http.post(`${prefixUrl}/apiBoxList`, JSON.stringify(data));
};

export const addApiBox = (data) => {
    return http.post(`${prefixUrl}/addApiBox`, JSON.stringify(data));
};

export const updateApiBox = (data) => {
    return http.post(`${prefixUrl}/updateApiBox`, JSON.stringify(data));
};
