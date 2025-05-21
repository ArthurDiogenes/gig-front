// src/services/search/index.ts
import api from "../api";
import { ResultadoBanda, ResultadoEstabelecimento } from "@/components/ResultadosPesquisa/ResultadosPesquisa";

export type SearchResult = {
  data: (ResultadoBanda | ResultadoEstabelecimento)[];
  total: number;
  page: number;
  lastPage: number;
};

export async function searchBands(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<SearchResult> {
  try {
    const response = await api.get('/bands/pesquisa', {
      params: {
        name: query,
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching bands:', error);
    // Return empty result set on error
    return {
      data: [],
      total: 0,
      page,
      lastPage: 1
    };
  }
}