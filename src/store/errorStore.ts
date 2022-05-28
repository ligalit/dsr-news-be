import {makeAutoObservable, runInAction} from "mobx";
import {message} from "antd";

class ErrorStore{
    error:string = "";
    constructor() {
        makeAutoObservable(this);
    }
    setError(e:string){
        runInAction(() => {
            this.error = e
            message.error({
                content: `${this.error}`,
            }).then(r => this.error = "");
        });
     }
}

export const errorStore = new ErrorStore();