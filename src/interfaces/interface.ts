import {ReactNode} from "react";

export interface IUser {
    id: number
    firstName: string
    lastName: string
    login: string
    nickname: string
    role: string
    tags: Array<string>
}

export interface IUserProps {
    u: Omit<IUser, "login" | "tags">,
    handleChange: (id: number, value: string) => void;
    handleDelete: (id: number) => void;
    children: ReactNode;
}

export interface INews {
    id: number,
    header: string,
    description: string,
    authorFirstName: string,
    authorLastName: string,
    authorNickname: string,
    tags: string[],
    state: string,
}

type TNewsCreate = Omit<INews, "id" | "authorNickname" | "authorLastName" | "authorFirstName">;

export interface INewsCreate extends TNewsCreate {
    publicationDate: string;
}
