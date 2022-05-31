import {makeAutoObservable, runInAction} from "mobx";
import {instance} from "../utils/instance";
import {getHeaders} from "../utils/headers";
import {IGetQueryNews, INews, INewsCreate} from "../interfaces/interface";
import {notificationStore} from "./notificationStore";

class NewsStore {
    news: INews[] = [];
    totalNewsCount: number = 0;
    viewedNews: number[] = [];
    newsTags: string[] = [];
    isLogging: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsLogging() {
        this.isLogging = !this.isLogging;
    }

    setNews(news: INews[]) {
        this.news = news;
    }

    setReadNews(newsId: number) {
        if (!this.viewedNews.includes(newsId) && this.news.find(n => n.id === newsId)?.state !== "draft") {
            this.viewedNews = [...this.viewedNews, newsId];
            this.readNews(this.viewedNews);
        }
    }

    setNewsTags(tags: string[]) {
        this.newsTags = tags;
    }

    async createNews(data: INewsCreate) {
        try {
            this.setIsLogging();
            const res = await instance.post("news", data, getHeaders());
            if (res.status === 201) {
                notificationStore.setSuccess("News was created");
                runInAction(() => {
                    this.getAllNews()
                });
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e)
            this.setIsLogging();
        }
    }

    async updateNews(id: number, data: INews) {
        try {
            this.setIsLogging();
            const res = await instance.put(`news/${id}`, data, getHeaders())
            if (res.status === 204) {
                notificationStore.setSuccess("News was updated");
                runInAction(() => {
                    const updatedNews = newsStore.news.map((n) => n.id === id ? {...n, ...data} : n);
                    newsStore.setNews(updatedNews);
                })
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e);
            this.setIsLogging();
        }
    }

    async deleteNews(id: number) {
        try {
            this.setIsLogging();
            const res = await instance.delete(`news/${id}`, getHeaders());
            if (res.status === 204) {
                notificationStore.setSuccess("News was deleted");
                runInAction(() => newsStore.setNews(newsStore.news.filter((n) => n.id !== id)));
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e);
            this.setIsLogging();
        }
    }

    async readNews(news: number[]) {
        try {
            const res = await instance.post("news/read", {
                ids: news
            }, getHeaders());
        } catch (e) {
            console.log(e)
        }
    }

    async getQueryNews({
                           tags = [],
                           noTagsNoNews = false,
                           onlyNew = false,
                           author = "",
                           header = "",
                           offset = 0,
                       }: IGetQueryNews) {
        try {
            this.setIsLogging();
            const res = await instance.get(
                `news?tags=${tags}&author=${author}&offset=${offset}&limit=10`
                , getHeaders());
            const newsList = res.data?.news?.list;
            if (res.status === 200) {
                runInAction(() => {
                    this.news = newsList;
                    this.totalNewsCount = res?.data?.news.total;
                });
                this.setIsLogging();
            }
        } catch (e) {
            this.setIsLogging();
        }
    }

    async getMyNews() {
        try {
            this.setIsLogging();
            const res = await instance.get("news/my", getHeaders());
            if (res.status === 200) {
                runInAction(() => newsStore.setNews(res.data));
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e);
            this.setIsLogging();
        }
    }

    async getAllNews() {
        try {
            this.setIsLogging();
            const res = await instance.get("news/all", getHeaders())
            if (res.status === 200) {
                runInAction(() => {
                    this.setNews(res?.data);
                });
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e);
            this.setIsLogging()
        }
    }

    async getNewsTags() {
        try {
            this.setIsLogging();
            const res = await instance.get("news/tags", getHeaders())
            if (res.status === 200) {
                runInAction(() => this.setNewsTags(res.data));
                this.setIsLogging();
            }
        } catch (e) {
            console.log(e);
            this.setIsLogging();
        }
    }
}


export const newsStore = new NewsStore();