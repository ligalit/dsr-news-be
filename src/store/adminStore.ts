import {makeAutoObservable, runInAction} from "mobx";
import {instance} from "../utils/instance";
import {getHeaders} from "../utils/headers";
import {newsStore} from "./newsStore";
import {notificationStore} from "./notificationStore";
import {INews, IUser} from "../interfaces/interface";
import {AxiosError} from "axios";

class AdminStore {
    users: IUser[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    async getUsers() {
        try {
            const res = await instance.get('admin/users', getHeaders());
            if (res.status === 200) {
                notificationStore.setSuccess("User's list - for admins only")
                runInAction(() => this.users = res?.data)
            }
        } catch (err) {
            const e = err as AxiosError;
            notificationStore.setError(e?.response?.statusText)
        }
    }

    async getUserNews(id: number) {
        try {
            const res = await instance.get(`admin/user/${id}/news`, getHeaders());
            if (res.status === 200) {
                runInAction(() => newsStore.setNews(res.data));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateUserRole(id: number, role: string) {
        try {
            const res = await instance.put(`admin/user/${id}`, {
                role
            }, getHeaders());
            if (res.status === 204) {
                notificationStore.setSuccess("User role was updated");
                runInAction(() => this.users = this.users.map((u) => u.id === id ? {...u, role} : u))
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUser(id: number) {
        try {
            const res = await instance.delete(`admin/user/${id}`, getHeaders());
            if (res.status === 204) {
                notificationStore.setSuccess("User was deleted");
                runInAction(() => this.users = this.users.filter(u => u.id !== id));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateNews(id: number, data: INews) {
        try {
            const res = await instance.put(`admin/news/${id}`, data, getHeaders())
            if (res.status === 204) {
                notificationStore.setSuccess("News was updated");
                runInAction(() => {
                    const updatedNews = newsStore.news.map((n) => n.id === id ? {...n, ...data} : n);
                    newsStore.setNews(updatedNews);
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async deleteNews(id: number) {
        try {
            const res = await instance.delete(`admin/news/${id}`, getHeaders());
            if (res.status === 204) {
                notificationStore.setSuccess("News was deleted");
                runInAction(() => newsStore.setNews(newsStore.news.filter((n) => n.id !== id)));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateTags(tags: string[]) {
        try {
            const res = await instance.put(`admin/news/tags`, tags, getHeaders())
            if (res.status === 204) {
                notificationStore.setSuccess("TagsSelect Updated");
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const adminStore = new AdminStore();