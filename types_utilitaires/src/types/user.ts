export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
}

export type UserPreview = Pick<User, "id" | "name" | "avatar">;
