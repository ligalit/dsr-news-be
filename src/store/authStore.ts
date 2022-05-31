import {makeAutoObservable} from "mobx";
import {instance} from "../utils/instance";
import {userStore} from "./userStore";
import {notificationStore} from "./notificationStore";
import {getHeaders} from "../utils/headers";

class AuthStore {
    isLogging: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsLogging() {
        this.isLogging = !this.isLogging;
    }

    async signUp(formData: { login: string, password: string }) {
        try {
            this.setIsLogging();
            const res = await instance.post('auth/signup', formData);
            if (res.status === 201) {
                notificationStore.setSuccess("Successfully signup");
                await this.logIn(formData);
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e);
            notificationStore.setError("Required properties not found/User already exists")
            this.setIsLogging();
        }
    }

    async logIn(formData: { login: string, password: string }) {
        try {
            this.setIsLogging();
            const res = await instance.post('auth/login', formData);
            if (res.status === 200) {
                notificationStore.setSuccess("Successfully login");
                Object.assign(this, formData);
                localStorage.setItem("token", res.data?.token);
                await userStore.getUserInfo();
                await userStore.getAuthors();
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e);
            notificationStore.setError("Wrong login or password");
            this.setIsLogging();
        }
    }

    async logOut() {
        try {
            this.setIsLogging();
            const res = await instance.post('auth/logout', {}, getHeaders());
            if (res.status === 204) {
                notificationStore.setSuccess("Successfully logout");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e);
            notificationStore.setError("User not authorized")
            this.setIsLogging();
        }
    }
}

export const authStore = new AuthStore();