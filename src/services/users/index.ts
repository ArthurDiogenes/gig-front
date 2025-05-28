import { User } from "@/types/user";

export const getUser = (): User | undefined => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        return undefined;
    }
    const user: User = JSON.parse(userJson);
    return user;
}