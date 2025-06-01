import api from "@/services/api";
import { Session } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async (): Promise<Session> => {
      const response = await api.get<Session>('/auth/session', {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 8, // 8 horas
    gcTime: 1000 * 60 * 60 * 24, // 24 horas
    retry: false,
  });
};