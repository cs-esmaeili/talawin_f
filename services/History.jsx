import http from "./httpServices";
import config from "../config.json";


const prefixUrl = `${config.api}history`

export const historyList = (data) => {
    return http.post(`${prefixUrl}/historyList`, JSON.stringify(data));
};
