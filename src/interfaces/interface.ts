export interface IUser{
    id:number
    firstName:string
    lastName: string
    login: string
    nickname: string
    role: string
    tags: Array<string>
}

export interface INews{
    authorFirstName: string
    authorLastName: string
    authorNickname: string
    description: string
    header: string
    tags: Array<string>
}