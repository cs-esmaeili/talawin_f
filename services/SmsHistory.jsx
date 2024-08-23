import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}smsHistory`

export const smsHistoryList = (data) => {
    return http.post(`${prefixUrl}/smsHistoryList`, JSON.stringify(data));
};

export const deleteCategory = (data) => {
    return http.post(`${prefixUrl}/deleteCategory`, JSON.stringify(data));
};
