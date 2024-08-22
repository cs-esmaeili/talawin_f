import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}smsTemplate`

export const smsTemplateList = () => {
    return http.post(`${prefixUrl}/SmsTemplateList`);
};
export const deleteSmsTemplate = (data) => {
    return http.post(`${prefixUrl}/deleteSmsTemplate`, JSON.stringify(data));
};
export const createSmsTemplate = (data) => {
    return http.post(`${prefixUrl}/createSmsTemplate`, JSON.stringify(data));
};

export const sendSmsToUser = (data) => {
    return http.post(`${prefixUrl}/sendSmsToUser`, JSON.stringify(data));
};