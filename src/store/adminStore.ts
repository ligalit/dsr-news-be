import {makeAutoObservable, runInAction} from "mobx";
import {instance} from "../utils/instance";
import {INews, IUser} from "../interfaces/interface";
import {getHeaders} from "../utils/headers";

class AdminStore{
    users: IUser[] = [];
    news!: INews[];

    constructor() {
        makeAutoObservable(this)
    }

    async getUsers(){
        try {
            const res = await instance.get('admin/users',getHeaders());
            if(res.status === 200)
                runInAction(() => this.users = res?.data)
        }catch (e){
            console.log(e);
        }
    }

    async getUserNews(id:number){
        try {
            const res = await instance.get(`admin/user/${id}/news`,getHeaders());
            this.users = res?.data;
        }catch (e){
            console.log(e);
        }
    }

    async updateUserRole(id:number,role:string){
        try {
            const res = await instance.put(`admin/user/${id}`,{
                role
            },getHeaders());
            if(res.status === 204)
                runInAction(() => this.users = this.users.map((u) => u.id === id ? {...u,role} : u))
        }catch (e) {
            console.log(e);
        }
    }

    async deleteUser(id:number){
        try {
            const res = await instance.delete(`admin/user/${id}`,getHeaders());
            if(res.status === 204)
                runInAction(() => this.users = this.users.filter(u => u.id !== id));
        }catch (e) {
            console.log(e);
        }
    }

    async updateNews(id:number,data:INews){
        try {
            const res = await instance.put(`admin/news/${id}`,data,getHeaders())
        }catch (e) {
            console.log(e)
        }
    }

    async deleteNews(id:number){
        try {
            const res = await instance.delete(`admin/news/${id}`,getHeaders())
        }catch (e) {
            console.log(e);
        }
    }

    async updateTags(tags:string[]){
        try {
            const res = await instance.put(`admin/news/tags`,tags,getHeaders())
        }catch (e) {
            console.log(e)
        }
    }
}

export const adminStore = new AdminStore();