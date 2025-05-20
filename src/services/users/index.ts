import { User } from "@/types/user";

export const getUser = (): User => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        throw new Error('User not found in local storage');
    }
    const user: User = JSON.parse(userJson);
    return user;
}