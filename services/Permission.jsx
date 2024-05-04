import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}permission`

export const togglePermission = (data) => {
    return http.post(`${prefixUrl}/togglePermission`, JSON.stringify(data));
};
