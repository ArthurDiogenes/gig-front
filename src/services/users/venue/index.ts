import api from "@/services/api";

export type Venue = {
    id: string;
    name: string;
    location: string;
    capacity: number;
}

export async function getVenue(id: string): Promise<Venue> {
    const response = await api.get<Venue>(`/venues/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}