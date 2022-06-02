import {makeAutoObservable, runInAction} from "mobx";
import {instance} from "../utils/instance";
import {getHeaders} from "../utils/headers";
import {notificationStore} from "./notificationStore";

class UserStore {
    firstName!: string;
    lastName!: string;
    nickname!: string;
    phone!: string;
    tags!: Array<string>;
    showFirstName!: boolean;
    showLastName!: boolean;
    showPhone!: boolean;
    role!: string;
    authors!: Array<{ id: number, firstName: string, lastName: string, nickname: string }>
    private url: string = "user/";

    constructor() {
        makeAutoObservable(this);
    }

    getUserRole() {
        return this.role;
    }

    async getAuthors(){
        try {
            const res = await instance.get(this.url + "authors", getHeaders());
            if (res.status === 200) {
                runInAction(() => this.authors = res?.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getUserInfo() {
        try {
            const res = await instance.get(this.url + "me", getHeaders());
            if (res.status === 200) {
                const info = res?.data?.me;
                runInAction(() => {
                    Object.assign(this, info);
                    localStorage.setItem("user", JSON.stringify(info));
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateUserTags(tags: string[] | string) {
        try {
            const updatedTags = typeof tags === "string" ? this.tags.includes(tags) ? this.tags.filter(t => t !== tags) : [...this.tags, tags] : tags;
            const res = await instance.put(this.url + "me/tags", updatedTags, getHeaders());
            if (res.status === 204) {
                notificationStore.setSuccess("Your tags was updated");
                runInAction(() => {
                    this.tags = updatedTags;
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateUserInfo(data: {
        firstName: string,
        lastName: string,
        nickname: string,
        phone: string,
        showFirstName: boolean,
        showLastName: boolean,
        showPhone: boolean
    }) {
        try {
            const res = await instance.put(this.url + "me", data, getHeaders())
            if (res.status === 200) {
                notificationStore.setSuccess("Info updated");
                runInAction(() => Object.assign(this, data));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

const userStore = new UserStore();
export {userStore};