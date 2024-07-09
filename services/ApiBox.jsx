import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}apibox`

export const apiBoxList = (data) => {
    return http.post(`${prefixUrl}/apiBoxList`, JSON.stringify(data));
};
