import { useQuery } from "@tanstack/react-query";
import { getContractsByBand, getAllContracts } from "@/services/contracts";

export function useContractsByBand(bandId?: number) {
  return useQuery({
    queryKey: ["contracts", "band", bandId],
    queryFn: () => getContractsByBand(bandId!),
    enabled: !!bandId,
  });
}

export function useContractsData() {
  return useQuery({
    queryKey: ["contracts"],
    queryFn: getAllContracts,
  });
}