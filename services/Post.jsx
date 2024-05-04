import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}post`

export const createPost = (data) => {
    return http.post(`${prefixUrl}/createPost`, JSON.stringify(data));
};

export const postList = (data) => {
    return http.post(`${prefixUrl}/postList`, JSON.stringify(data));
};

export const deletePost = (data) => {
    return http.post(`${prefixUrl}/deletePost`, JSON.stringify(data));
};

export const updatePost = (data) => {
    return http.post(`${prefixUrl}/updatePost`, JSON.stringify(data));
};

export const getPost = (data) => {
    return http.post(`${prefixUrl}/getPost`, JSON.stringify(data));
};
