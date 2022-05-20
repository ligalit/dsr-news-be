import {makeAutoObservable} from "mobx";
import {instance} from "../utils/instance";
import {INews, IUser} from "../interfaces/interface";

class AdminStore{
    users!: IUser[];
    news!: INews[];

    constructor() {
        makeAutoObservable(this)
    }

    async getUsers(){
        try {
            const res = await instance.get('admin/users',{
                headers:{
                    "token":`${localStorage.getItem("token")}`
                }
            });
            this.users = res?.data;
        }catch (e){
            console.log(e);
        }
    }

    async getUserNews(id:number){
        try {
            const res = await instance.get(`admin/user/${id}/news`,{
                headers:{
                    "token":`${localStorage.getItem("token")}`
                }
            });
            this.users = res?.data;
        }catch (e){
            console.log(e);
        }
    }

    async updateUserRole(id:number,role:string){
        try {
            const res = await instance.put(`admin/user/${id}`,{
                role
            },{
                headers:{
                    "token":`${localStorage.getItem("token")}`
                }
            })
        }catch (e) {
            console.log(e);
        }
    }

    async deleteUser(id:number){
        try {
            const res = await instance.delete(`admin/user/${id}`,{
                headers:{
                    "token":`${localStorage.getItem("token")}`
                }
            });
        }catch (e) {
            console.log(e);
        }
    }

    async updateNews(id:number,data:INews){
        try {
            const res = await instance.put(`admin/news/${id}`,data,{
                headers:{
                    "token":`${localStorage.getItem("token")}`
                }
            })
        }catch (e) {
            console.log(e)
        }
    }

    async deleteNews(id:number){
        try {
            const res = await instance.delete(`admin/news/${id}`,{
                headers:{
                    "token":`${localStorage.getItem("token")}`
                }
            })
        }catch (e) {
            console.log(e);
        }
    }

    async updateTags(tags:Array<string>){
        try {
            const res = await instance.put(`admin/news/tags`,{tags},{
                headers:{
                    "token":`${localStorage.getItem("token")}`
                }})
        }catch (e) {
            console.log(e)
        }
    }
}

export const adminStore = new AdminStore();