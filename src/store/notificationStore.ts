import {makeAutoObservable, runInAction} from "mobx";
import {message} from "antd";

class NotificationStore {
    error?: string = "";
    success?: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setError(e?: string) {
        runInAction(() => {
            this.error = e;
            message.error({
                content: `${this.error}`,
                duration: 1,
            }).then(() => this.error = "");
        });
    }

    setSuccess(e?: string) {
        runInAction(() => {
            this.success = e;
            message.success({
                content: `${this.success}`,
                duration: 1,
            }).then(() => this.success = "");
        });
    }
}

export const notificationStore = new NotificationStore();