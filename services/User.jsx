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
export const searchUser = (data) => {
    return http.post(`${prefixUrl}/searchUser`, JSON.stringify(data));
};
export const securityCheck = (data) => {
    return http.post(`${prefixUrl}/securityCheck`, JSON.stringify(data));
};
export const buyProducts = (data) => {
    return http.post(`${prefixUrl}/buyProducts`, JSON.stringify(data));
};
export const sellProducts = (data) => {
    return http.post(`${prefixUrl}/sellProducts`, JSON.stringify(data));
};
export const boxProducts = (data) => {
    return http.post(`${prefixUrl}/boxProducts`, JSON.stringify(data));
};
export const sellBoxProducts = (data) => {
    return http.post(`${prefixUrl}/sellBoxProducts`, JSON.stringify(data));
};

