import api from "@/services/api";
import { Contract } from "@/types/contract";
import { useQuery } from "@tanstack/react-query";

export function useContractsData() {
  const contracts = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const response = await api.get<Contract[]>("/contract");
      return response.data;
    },
  });

  return contracts;
}
