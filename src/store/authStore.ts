import { AxiosError } from "axios";
import {makeAutoObservable} from "mobx";
import {instance} from "../utils/instance";
import {userStore} from "./userStore";

class AuthStore{
    private login!: string;
    private password!:string;
    isLogging:boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    setIsLogging(value:boolean){
        this.isLogging = value;
    }

    async signUp(formData:{login:string,password:string}){
        try{
            this.setIsLogging(true);
            const res = await instance.post('auth/signup',formData);
            if(res.status === 201){
                await this.logIn(formData);
                this.setIsLogging(false);
            }
        }catch (e: AxiosError | any){
            console.log(e.response.status);
            this.setIsLogging(false);
        }
    }
    async logIn(formData:{login:string,password:string}){
        try{
            this.setIsLogging(true);
            const res = await instance.post('auth/login',formData);
            if(res.status === 200){
                Object.assign(this,formData);
                localStorage.setItem("token",res.data?.token);
                await userStore.getUserInfo();
                await userStore.getAuthors();
                this.setIsLogging(false);
            }
        }catch (e: AxiosError | any){
            console.log(e.response.status);
            this.setIsLogging(false);
        }
    }
    async logOut(){
        try{
            this.setIsLogging(true);
            const res = await instance.post('auth/logout',{},{
                headers:{
                    'token':`${localStorage.getItem("token")}`
                }
            });
            if(res.status === 204){
                localStorage.removeItem("token");
                this.setIsLogging(false);
            }
        }catch (e: AxiosError | any){
            console.log(e.response.status);
            this.setIsLogging(false);
        }
    }
}

export const authStore = new AuthStore();