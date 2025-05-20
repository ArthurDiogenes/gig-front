import api from "../api";

type CreatePostDto = {
    content: string;
    author: string;
}

export async function createPost(data: CreatePostDto): Promise<void> {
    await api.post("/posts", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}