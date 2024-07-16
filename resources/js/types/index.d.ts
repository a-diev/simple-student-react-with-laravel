export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface IStudent {
    id: string
    firstName: string
    lastName: string
    email: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
