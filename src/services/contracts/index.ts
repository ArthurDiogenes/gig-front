import api from "../api";
import { Contract } from "@/types/contract";

export async function getContractsByBand(bandId: number): Promise<Contract[]> {
  const response = await api.get<Contract[]>(`/contract/band/${bandId}`);
  return response.data;
}

export async function confirmContract(contractId: string): Promise<Contract> {
  const response = await api.patch<Contract>(`/contract/confirm/${contractId}`);
  return response.data;
}

export async function cancelContract(contractId: string): Promise<Contract> {
  const response = await api.patch<Contract>(`/contract/cancel/${contractId}`);
  return response.data;
}

export async function getAllContracts(): Promise<Contract[]> {
  const response = await api.get<Contract[]>("/contract");
  return response.data;
}

export async function getContractById(contractId: string): Promise<Contract> {
  const response = await api.get<Contract>(`/contract/${contractId}`);
  return response.data;
}

export async function getContractsByVenue(venueId: string): Promise<Contract[]> {
  const response = await api.get<Contract[]>(`/contract/venue/${venueId}`);
  return response.data;
}