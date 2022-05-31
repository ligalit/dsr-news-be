import axios from "axios";
import {notificationStore} from "../store/notificationStore";

export const instance = axios.create({
    baseURL: "http://localhost:3000/",
})

instance.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    switch (error.response.status) {
        case 401:
            return notificationStore.setError("Unauthorized");
        case 403:
            return notificationStore.setError("Action not allowed for current role");
        case 404:
            return notificationStore.setError("User not found");
    }
    return Promise.reject(error);
});