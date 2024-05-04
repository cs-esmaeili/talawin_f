import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}file`

export const folderFileList = (data) => {
    return http.post(`${prefixUrl}/folderFileList`, JSON.stringify(data));
};

export const deleteFolder = (data) => {
    return http.post(`${prefixUrl}/deleteFolder`, JSON.stringify(data));
};
export const deleteFile = (data) => {
    return http.post(`${prefixUrl}/deleteFile`, JSON.stringify(data));
};
export const createFolder = (data) => {
    return http.post(`${prefixUrl}/createFolder`, JSON.stringify(data));
};
export const rename = (data) => {
    return http.post(`${prefixUrl}/rename`, JSON.stringify(data));
};

export const saveFile = (data, uploadLisener) => {
    return http.post(`${prefixUrl}/saveFile`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};