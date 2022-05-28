import { AxiosError } from "axios";
import {makeAutoObservable} from "mobx";
import {instance} from "../utils/instance";
import {userStore} from "./userStore";
import {errorStore} from "./errorStore";
import {getHeaders} from "../utils/headers";

class AuthStore{
    private login!: string;
    private password!:string;
    isLogging:boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    setIsLogging(){
        this.isLogging = !this.isLogging;
    }

    async signUp(formData:{login:string,password:string}){
        try{
            this.setIsLogging();
            const res = await instance.post('auth/signup',formData);
            if(res.status === 201){
                await this.logIn(formData);
                this.setIsLogging();
            }
        }catch (e: AxiosError | any){
            errorStore.setError("Required properties not found/User already exists")
            this.setIsLogging();
        }
    }
    async logIn(formData:{login:string,password:string}){
        try{
            this.setIsLogging();
            const res = await instance.post('auth/login',formData);
            if(res.status === 200){
                Object.assign(this,formData);
                localStorage.setItem("token",res.data?.token);
                await userStore.getUserInfo();
                await userStore.getAuthors();
                this.setIsLogging();
            }
        }catch (e: AxiosError | any){
            errorStore.setError("Wrong login or password")
            this.setIsLogging();
        }
    }
    async logOut(){
        try{
            this.setIsLogging();
            const res = await instance.post('auth/logout',{},getHeaders());
            if(res.status === 204){
                localStorage.removeItem("token");
                this.setIsLogging();
            }
        }catch (e: AxiosError | any){
            errorStore.setError("User not authorized")
            this.setIsLogging();
        }
    }
}

export const authStore = new AuthStore();