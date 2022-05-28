import {makeAutoObservable, runInAction} from "mobx";
import {instance} from "../utils/instance";
import {getHeaders} from "../utils/headers";
import {INews, INewsCreate} from "../interfaces/interface";

class NewsStore {
    news: INews[] = [];
    newsTags: string[] = [];
    isLogging: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsLogging() {
        this.isLogging = !this.isLogging;
    }

    async createNews(data: INewsCreate) {
        try {
            this.setIsLogging();
            const res = await instance.post('news', data, getHeaders());
            if (res.status === 204)
                await runInAction(() => this.getAllNews());
            this.setIsLogging();
        } catch (e) {
            console.log(e)
        }
    }

    async getAllNews() {
        try {
            this.setIsLogging();
            const res = await instance.get('news/all', getHeaders())
            if (res.status === 200)
                runInAction(() => this.news = res?.data)
            this.setIsLogging()
        } catch (e) {
            console.log(e);
            this.setIsLogging()
        }
    }

    async getNewsTags() {
        try {
            this.setIsLogging();
            const res = await instance.get('news/tags', getHeaders())
            if (res.status === 200)
                runInAction(() => this.newsTags = res.data)
            this.setIsLogging();
        } catch (e) {
            console.log(e);
            this.setIsLogging();
        }
    }
}


export const newsStore = new NewsStore();