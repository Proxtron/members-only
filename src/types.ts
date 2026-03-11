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
    member: boolean
}

declare global {
    namespace Express {
        interface User {
            id: number
            first_name: string,
            last_name: string,
            password: string,
            member: boolean
        }
    }
}