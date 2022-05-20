import {makeAutoObservable} from "mobx";
import {instance} from "../utils/instance";

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

    constructor() {
        makeAutoObservable(this);
    }

    async getAuthors() {
        try {
            const res = await instance.get('user/authors',{
                headers: {
                    "token": `${localStorage.getItem("token")}`
                }
            });
            if (res.status === 200) {
                this.authors = res?.data;
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getUserInfo() {
        try {
            const res = await instance.get('user/me', {
                headers: {
                    "token": `${localStorage.getItem("token")}`
                }
            });

            if (res.status === 200) {
                const info = res?.data?.me;
                Object.assign(this, info);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    async updateUserTags(data:Array<string>){
        try {
            const res = await instance.put('user/me/tags',data,{
                headers: {
                    "token": `${localStorage.getItem("token")}`
                }
            });
        }catch (e) {
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
            const res = await instance.put('user/me',data,{
                headers:{
                    "token":`${localStorage.getItem("token")}`
                }
            })
            if(res.status === 200){
                await this.getUserInfo()
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const userStore = new UserStore();