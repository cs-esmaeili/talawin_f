import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}user`

export const registerPure = (data) => {
    return http.post(`${prefixUrl}/registerPure`, JSON.stringify(data));
};

export const updateRegisterPure = (data) => {
    return http.post(`${prefixUrl}/updateRegisterPure`, JSON.stringify(data));
};

export const userList = (data) => {
    return http.post(`${prefixUrl}/userList`, JSON.stringify(data));
};
export const userPermissions = () => {
    return http.post(`${prefixUrl}/userPermissions`);
};

