export interface UserSignUpBody {
    first_name: string,
    last_name: string,
    password: string,
    confirm_password: string
}

export interface UserAddInterface {
    first_name: string,
    last_name: string,
    password: string
}

export interface User {
    id: number
    first_name: string,
    last_name: string,
    password: string,
    member: boolean,
    admin: boolean
}

export interface MessageDetail {
    id: number, 
    poster_id: number,
    poster_first_name: string,
    poster_last_name: string,
    title: string, 
    message: string,
    timestamp: string,
}

declare global {
    namespace Express {
        interface User {
            id: number
            first_name: string,
            last_name: string,
            password: string,
            member: boolean,
            admin: boolean
        }
    }
}