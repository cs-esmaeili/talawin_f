import http from "./httpServices";
import config from "../config.json";

export const logInStepOne = (data) => {
    return http.post(`${config.api}logInStepOne`, JSON.stringify(data));
};
export const logInStepTwo = (data) => {
    return http.post(`${config.api}logInStepTwo`, JSON.stringify(data));
};
