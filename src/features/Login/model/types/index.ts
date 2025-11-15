export interface ILoginSchema {
    loading: boolean;
    error?: string;
}

export interface ILoginFormData {
    username: string;
    password: string;
}