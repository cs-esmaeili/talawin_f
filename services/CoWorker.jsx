import http from "./httpServices";
import config from "../config.json";


const prefixUrl = `${config.api}coWorker`

export const executeTrade = (data) => {
    return http.post(`${prefixUrl}/executeTrade`, JSON.stringify(data));
};