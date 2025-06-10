import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./EditarBanda.module.css";
import api from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BandProfileIcon } from "@/utils/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/services/users";
import { Contract } from "@/types/contract";

// Add interface for band data
interface BandData {
  id: number;
  bandName: string;
  genre: string;
  city: string;
  description: string;
  userId: {
    id: string;
    role: string;
  };
}

type SidebarOption = "perfil" | "contratos";

const EditarBanda = () => {
  const [activeSection, setActiveSection] = useState<SidebarOption>("perfil");
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [bandName, setBandName] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  const [statusTab, setStatusTab] = useState<
    "pendente" | "aceito" | "recusado"
  >("pendente");

  const queryClient = useQueryClient();
  const user = getUser();

  // Fetch band data
  const { data: bandData } = useQuery<BandData>({
    queryKey: ["band", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not found");
      const response = await api.get<BandData>(`/bands/user/${user.id}`);
      return response.data;
    },
    enabled: !!user?.id,
  });

  // Fetch contracts data
  const { data: contractsData, isLoading: contractsLoading, error: contractsError } = useQuery<Contract[]>({
    queryKey: ["contracts", bandData?.id],
    queryFn: async () => {
      if (!bandData?.id) throw new Error("Band not found");
      const response = await api.get<Contract[]>(`/contract/band/${bandData.id}`);
      return response.data;
    },
    enabled: !!bandData?.id,
  });

  // Mutation for updating contract status
  const updateContractMutation = useMutation({
    mutationFn: async ({ contractId, action }: { contractId: string; action: 'confirm' | 'cancel' }) => {
      const endpoint = action === 'confirm' ? 'confirm' : 'cancel';
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

  // Function to handle contract acceptance
  const handleAcceptContract = (contractId: string) => {
    updateContractMutation.mutate({ contractId, action: 'confirm' });
  };

  // Function to handle contract rejection
  const handleRejectContract = (contractId: string) => {
    updateContractMutation.mutate({ contractId, action: 'cancel' });
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
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleSave = async () => {
    if (!bandData?.id) {
      toast.error("Dados da banda não encontrados");
      return;
    }

    const data = {
      bandName,
      genre,
      city: location,
      description,
      twitter,
      facebook,
      instagram,
    };

    try {
      await api.put(`/bands/${bandData.id}`, data);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar perfil");
      }
    }
  };

  const sidebarOptions = [
    { id: "perfil", label: "Perfil", icon: "👤" },
    { id: "contratos", label: "Contratos", icon: "📋" }
  ];

  const renderPerfilContent = () => (
    <section className={styles.formSection}>
      <section className={styles.imageSection}>
        <div className={styles.carouselUpload}>
          <label htmlFor="carousel-upload" className={styles.carouselButton}>
            Adicionar imagens
          </label>
          <input
            id="carousel-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const filesArray = Array.from(e.target.files).map((file) =>
                  URL.createObjectURL(file)
                );
                setCarouselImages((prev) => [...prev, ...filesArray]);
              }
            }}
            style={{ display: "none" }}
          />
        </div>

        <div className={styles.carouselPreview}>
          {carouselImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Carrossel ${index}`}
              className={styles.carouselImage}
            />
          ))}
        </div>

        <label htmlFor="profile-upload" className={styles.profileImageLabel}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Perfil"
              className={styles.profileImage}
            />
          ) : (
            <BandProfileIcon
              style={{ width: "48px", height: "48px", color: "#000" }}
            />
          )}
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfileImage(URL.createObjectURL(e.target.files[0]));
              }
            }}
            style={{ display: "none" }}
          />
        </label>
      </section>

      <h1 className={styles.title}>Editar Perfil da Banda</h1>
      <p className={styles.subtitle}>
        Preencha as informações do perfil da banda abaixo.
      </p>

      <div className={styles.formGroup}>
        <label>
          Nome da banda:
          <input
            type="text"
            value={bandName}
            onChange={(e) => setBandName(e.target.value)}
            className={styles.input}
            placeholder={bandData?.bandName}
          />
        </label>
        <label>
          Gênero musical:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={styles.input}
            placeholder={bandData?.genre}
          />
        </label>
        <label>
          Localização:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
            placeholder={bandData?.city}
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={styles.textarea}
            placeholder={bandData?.description}
          />
        </label>
        <label>
          Twitter:
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          Facebook:
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          Instagram:
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className={styles.input}
          />
        </label>
      </div>

      <button onClick={handleSave} className={styles.saveButton}>
        Salvar
      </button>
    </section>
  );

  const renderContratosContent = () => {
    const filteredContracts = getFilteredContracts();
    const contractCounts = {
      pendente: contractsData?.filter(c => c.isConfirmed === null).length || 0,
      aceito: contractsData?.filter(c => c.isConfirmed === true).length || 0,
      recusado: contractsData?.filter(c => c.isConfirmed === false).length || 0,
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
                  📅 {formatDate(contract.eventDate)} • {contract.startTime} - {contract.endTime}
                </p>
                <p>
                  📍 {contract.requester.name} - {contract.requester.address}, {contract.requester.city} - CEP {contract.requester.cep}
                </p>
                {contract.additionalDetails && (
                  <p>💬 {contract.additionalDetails}</p>
                )}
                {contract.requester.contact && (
                  <p>📞 Contato: {contract.requester.contact}</p>
                )}
                <p className={styles.valor}>💰 {formatCurrency(contract.budget)}</p>

                {contract.isConfirmed === null && (
                  <div className={styles.cardActions}>
                    <button
                      onClick={() => handleAcceptContract(contract.id)}
                      className={styles.aceitarButton}
                      disabled={updateContractMutation.isPending}
                    >
                      {updateContractMutation.isPending ? "Processando..." : "Aceitar"}
                    </button>
                    <button
                      onClick={() => handleRejectContract(contract.id)}
                      className={styles.recusarButton}
                      disabled={updateContractMutation.isPending}
                    >
                      {updateContractMutation.isPending ? "Processando..." : "Recusar"}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "perfil":
        return renderPerfilContent();
      case "contratos":
        return renderContratosContent();
      default:
        return renderPerfilContent();
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2>Painel da Banda</h2>
            </div>
            <nav className={styles.sidebarNav}>
              {sidebarOptions.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.sidebarOption} ${
                    activeSection === option.id
                      ? styles.sidebarOptionActive
                      : ""
                  }`}
                  onClick={() => setActiveSection(option.id as SidebarOption)}
                >
                  <span className={styles.sidebarOptionIcon}>
                    {option.icon}
                  </span>
                  <span className={styles.sidebarOptionLabel}>
                    {option.label}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className={styles.content}>{renderContent()}</div>
        </div>
      </main>
    </>
  );
};

export default EditarBanda;