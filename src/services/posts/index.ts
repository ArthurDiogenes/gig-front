import api from "../api";

export async function createPost(data: FormData): Promise<void> {
    await api.post("/posts", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}