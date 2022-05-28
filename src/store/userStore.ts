import {makeAutoObservable, runInAction} from "mobx";
import {instance} from "../utils/instance";
import {getHeaders} from "../utils/headers";

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

    getUserRole(){
        return this.role;
    }

    async getAuthors() {
        try {
            const res = await instance.get('user/authors',getHeaders());
            if (res.status === 200) {
                runInAction(() => this.authors = res?.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getUserInfo() {
        try {
            const res = await instance.get('user/me', getHeaders());

            if (res.status === 200) {
                const info = res?.data?.me;
                runInAction(() => Object.assign(this,info));
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    async updateUserTags(data:Array<string>){
        try {
            const res = await instance.put('user/me/tags',data,getHeaders());
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
            const res = await instance.put('user/me',data,getHeaders())
            if(res.status === 200){
                runInAction(() => Object.assign(this,data));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const userStore = new UserStore();