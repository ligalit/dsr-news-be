import React, {ReactNode} from "react";
import {FormInstance} from "antd";

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
    tags: string[],
    author: number;
    authorFirstName: string,
    authorLastName: string,
    authorNickname: string,
    state: string,
}

export interface INewsModalProps {
    header?: string
    description?: string
    tags?: string[];
    visible: boolean,
    handleModal: () => void,
    onCreate: () => void,
    form: FormInstance<any>,
    form_name: string,
    title: string
}

export interface ILoadingProps {
    isLogging?: boolean;
    role?: string;
}

export interface IAbsoluteButton {
    onClick?: () => void,
    icon: React.ReactNode,
    right: string,
    danger?: boolean
}

export interface INewsPost {
    n: INews,
    onVisible: (isVisible: boolean, id: number) => void;
    handleDelete?: (id: number) => void
}

export interface IGetQueryNews {
    tags?: string | string[],
    noTagsNoNews?: boolean,
    onlyNew?: boolean,
    author?: string,
    header?: string,
    offset?: number,
}

export interface ITagsProps {
    title: string,
    onChange: (tags: string[]) => void,
    mode: "multiple" | "tags" | undefined,
    defaultValue: string[]
}


type TNewsCreate = Omit<INews, "id" | "authorNickname" | "authorLastName" | "authorFirstName">;

export interface INewsCreate extends TNewsCreate {
    publicationDate: string;
}
