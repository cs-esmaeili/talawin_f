import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}role`

export const roleList = () => {
    return http.post(`${prefixUrl}/roleList`);
};

export const createRole = (data) => {
    return http.post(`${prefixUrl}/createRole`, JSON.stringify(data));
};
export const deleteRole = (data) => {
    return http.post(`${prefixUrl}/deleteRole`, JSON.stringify(data));
};
