import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./EditarBanda.module.css";
import api from "@/services/api";
import { Contract } from "@/types/contract";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";


interface VenueData {
  id: number;
  name: string;
  type: string;
  city: string;
  description: string;
  user: {
    id: string;
    role: string;
  };

}

export default function VenueContracts({ id }: { id: string }) {
  const queryClient = useQueryClient();
  // Mutation for updating contract status

  const [statusTab, setStatusTab] = useState<
    "pendente" | "aceito" | "recusado"
  >("pendente");

  const updateContractMutation = useMutation({
    mutationFn: async ({
      contractId,
      action,
    }: {
      contractId: string;
      action: "confirm" | "cancel";
    }) => {
      const endpoint = action === "confirm" ? "confirm" : "cancel";
      const response = await api.patch(`/contract/${endpoint}/${contractId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Status do contrato atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
    onError: (error: AxiosError) => {
      toast.error("Erro ao atualizar status do contrato");
      console.error("Error updating contract:", error);
    },
  });

  // Function to handle contract rejection
  const handleRejectContract = (contractId: string) => {
    updateContractMutation.mutate({ contractId, action: "cancel" });
  };

  // Filter contracts by status
  const getFilteredContracts = () => {
    if (!contractsData) return [];

    return contractsData.filter((contract) => {
      if (statusTab === "pendente") return contract.isConfirmed === null;
      if (statusTab === "aceito") return contract.isConfirmed === true;
      if (statusTab === "recusado") return contract.isConfirmed === false;
      return false;
    });
  };

  // Format currency
  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numValue);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  // Fetch venue data
  const { data: venueData } = useQuery<VenueData>({
    queryKey: ["venue", id],
    queryFn: async () => {
      if (!id) throw new Error("User not found");
      const response = await api.get<VenueData>(`/venues/user/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  console.log("Venue Data:", venueData);

  // Fetch contracts data
  const {
    data: contractsData,
    isLoading: contractsLoading,
    error: contractsError,
  } = useQuery<Contract[]>({
    queryKey: ["contracts", venueData?.id],
    queryFn: async () => {
      if (!venueData?.id) throw new Error("Venue not found");
      const response = await api.get<Contract[]>(
        `/contract/venue/${venueData.id}`
      );
      return response.data;
    },
    enabled: !!venueData?.id,
  });

  console.log(contractsData)

  const filteredContracts = getFilteredContracts();
  const contractCounts = {
    pendente: contractsData?.filter((c) => c.isConfirmed === null).length || 0,
    aceito: contractsData?.filter((c) => c.isConfirmed === true).length || 0,
    recusado: contractsData?.filter((c) => c.isConfirmed === false).length || 0,
  };

  if (contractsLoading) {
    return (
      <section className={styles.formSection}>
        <div className={styles.placeholderContent}>
          <div className={styles.placeholderBox}>
            <p>Carregando contratos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (contractsError) {
    return (
      <section className={styles.formSection}>
        <div className={styles.placeholderContent}>
          <div className={styles.placeholderBox}>
            <p>Erro ao carregar contratos.</p>
            <p>Tente novamente mais tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formSection}>
      <div className={styles.statusTabs}>
        <button
          className={`${styles.statusTab} ${
            statusTab === "pendente" ? styles.active : ""
          }`}
          onClick={() => setStatusTab("pendente")}
        >
          Pendente ({contractCounts.pendente})
        </button>
        <button
          className={`${styles.statusTab} ${
            statusTab === "aceito" ? styles.active : ""
          }`}
          onClick={() => setStatusTab("aceito")}
        >
          Aceito ({contractCounts.aceito})
        </button>
        <button
          className={`${styles.statusTab} ${
            statusTab === "recusado" ? styles.active : ""
          }`}
          onClick={() => setStatusTab("recusado")}
        >
          Recusado ({contractCounts.recusado})
        </button>
      </div>

      <div className={styles.propostasContainer}>
        {filteredContracts.length === 0 ? (
          <div className={styles.placeholderContent}>
            <div className={styles.placeholderBox}>
              <p>Nenhum contrato {statusTab} encontrado.</p>
            </div>
          </div>
        ) : (
          filteredContracts.map((contract) => (
            <div key={contract.id} className={styles.propostaCard}>
              <div className={styles.cardHeader}>
                <h3>{contract.eventName}</h3>
                <span className={styles.statusBadge}>
                  {contract.isConfirmed === null
                    ? "Pendente"
                    : contract.isConfirmed
                    ? "Aceita"
                    : "Recusada"}
                </span>
              </div>
              <p>{contract.eventType}</p>
              <p>
                📅 {formatDate(contract.eventDate)} • {contract.startTime} -{" "}
                {contract.endTime}
              </p>
              <p>
                📍 {contract.provider.bandName} - {contract.provider.city}
              </p>
              {contract.additionalDetails && (
                <p>💬 {contract.additionalDetails}</p>
              )}
              {contract.provider.contact && (
                <p>📞 Contato: {contract.provider.contact}</p>
              )}
              <p className={styles.valor}>
                💰 {formatCurrency(contract.budget)}
              </p>

              {contract.isConfirmed === null && (
                <div className={styles.cardActions}>
                  <button
                    onClick={() => handleRejectContract(contract.id)}
                    className={styles.recusarButton}
                    disabled={updateContractMutation.isPending}
                  >
                    {updateContractMutation.isPending
                      ? "Processando..."
                      : "Cancelar"}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
