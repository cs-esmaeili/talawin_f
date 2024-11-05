import http from "./httpServices";
import config from "../config.json";


const prefixUrl = `${config.api}factor`

export const factorListUser = (data) => {
    return http.post(`${prefixUrl}/factorListUser`, JSON.stringify(data));
};
export const changeFactorStatus = (data) => {
    return http.post(`${prefixUrl}/changeFactorStatus`, JSON.stringify(data));
};