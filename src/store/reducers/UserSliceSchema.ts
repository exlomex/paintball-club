import {JwtPayload} from "jwt-decode";

export enum UserRoles {
    ADMIN =  'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST'
}

export interface UserSliceSchema {
    isAuth: boolean;
    role: UserRoles;
    loginError?: string;
    loginIsLoading: boolean;
    modalIsOpen: boolean,
    currentPlanInfo?: {id: number, title: string, features: string[], price: number}
    activeDate: number
    availibleDatas: string[]
    selectedTime?: number;
    availibleDatasLoading: boolean
}

export interface tokenInfoTypes extends JwtPayload {
    id: number,
    username: string,
    role: UserRoles,
}


