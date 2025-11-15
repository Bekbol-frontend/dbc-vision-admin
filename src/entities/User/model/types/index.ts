export interface IUser {
    access: string;
    is_superuser: boolean;
    refresh: string;
    username: string
}

export interface IUserSchema {
    data: IUser | null;
    accessToken: string | null;
    refreshToken: string | null;
}