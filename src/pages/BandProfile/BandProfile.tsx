import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  BandProfileIcon,
  FacebookIcon,
  InstagramIcon,
  LocationIcon,
  MusicIcon,
  TwitterIcon,
  UserIcon,
} from "../../utils/icons";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { capitalize } from "lodash";
import { Contract } from "@/types/contract";
import Review from "@/components/Review/Review";
import Footer from "@/components/Footer/Footer";
import ViewReview from "@/components/Review/View";
import { Button } from "@/components/ui/button";
import HireBandForm from "@/components/Contrato";

export type UserType = {
  id: string;
  role: string;
};

export type BandProfileType = {
  id: number;
  bandName: string;
  city: string;
  contact?: string;
  genre: string;
  members: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  description: string;
  createdAt: string;
  userId: UserType;
  coverPicture?: string;
  profilePicture?: string;
};

const BandProfile = () => {
  const { id } = useParams();

  const {
    data: band,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["band", id],
    queryFn: async () => {
      const response = await api.get<BandProfileType>(`/bands/user/${id}`);
      return response.data;
    },
  });

  // Fetch contracts and filter for accepted ones
  const { data: acceptedContracts, isLoading: contractsLoading } = useQuery({
    queryKey: ["contracts", "accepted", band?.id],
    queryFn: async () => {
      if (!band?.id) return [];

      try {
        const response = await api.get<Contract[]>(`/contract/band/${band.id}`);

        // Filter only accepted contracts (isConfirmed === true)
        const acceptedContracts = response.data.filter(
          (contract) => contract.isConfirmed === true
        );

        // Sort by event date (most recent first)
        const sortedContracts = acceptedContracts.sort(
          (a, b) =>
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );

        console.log("All contracts:", response.data);
        console.log("Accepted contracts:", acceptedContracts);

        return sortedContracts;
      } catch (error) {
        console.error("Error fetching contracts:", error);
        return [];
      }
    },
    enabled: !!band?.id,
  });

  const isBand = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}").role === "band"
    : false;

  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}").id
    : null;

  const owner = band?.userId.id === userId;

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Check if event is upcoming
  const isUpcomingEvent = (eventDate: string) => {
    return new Date(eventDate) >= new Date();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !band) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-red-600">Erro ao carregar banda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Cover Section */}
        <section className="mb-8 relative">
          {band.coverPicture ? (
            <img
              src={band.coverPicture}
              alt={`${band.bandName} cover`}
              className="w-full h-64 object-cover rounded-2xl shadow-2xl shadow-black/20"
            />
          ) : (
            <div className="relative w-full h-64 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          )}
          {/* Fixed profile picture positioning */}
          {band.profilePicture ? (
            <img
              src={band.profilePicture}
              alt={`${band.bandName} profile`}
              className="absolute -bottom-12 left-8 w-24 h-24 rounded-2xl border-4 border-white shadow-2xl shadow-black/20 object-cover"
            />
          ) : (
            <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-2xl shadow-black/20 flex items-center justify-center overflow-hidden">
              <BandProfileIcon
                style={{ width: "3rem", height: "3rem", color: "#1e293b" }}
              />
            </div>
          )}
        </section>

        {/* Profile Header - Added margin-top to account for overlapping profile picture */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-2 mt-16">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {band.bandName}
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              {capitalize(band.genre)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {isBand && owner ? (
              <Link to={`/meu-perfil`}>
                <Button
                  variant={"outline"}
                  className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Editar perfil
                </Button>
              </Link>
            ) : (
              <HireBandForm band={band} />
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Section */}
            <section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Descrição
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {band.description || "Sem descrição disponível."}
              </p>
            </section>

            {/* Events Section */}
            <section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Próximos Eventos
                </h2>
                {acceptedContracts && acceptedContracts.length > 0 && (
                  <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {acceptedContracts.length} evento
                    {acceptedContracts.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {contractsLoading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500">Carregando eventos...</p>
                  </div>
                ) : acceptedContracts && acceptedContracts.length > 0 ? (
                  acceptedContracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="flex justify-between items-center p-4 bg-slate-50/60 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-all duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-slate-800">
                            {contract.eventName}
                          </p>
                          {isUpcomingEvent(contract.eventDate) ? (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Próximo
                            </span>
                          ) : (
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                              Realizado
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          📍 {contract.requester.name} -{" "}
                          {contract.requester.city}
                        </p>
                        <p className="text-sm text-slate-600">
                          🕐 {contract.startTime} - {contract.endTime}
                        </p>
                        <p className="text-sm text-slate-600">
                          🎭 {contract.eventType}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-slate-700 bg-slate-200/60 px-3 py-1 rounded-lg">
                          {formatDate(contract.eventDate)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        🎵
                      </div>
                      <p className="text-slate-500 font-medium">
                        Nenhum evento confirmado
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        Os eventos aceitos aparecerão aqui
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Section */}
            <section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Informações
                </h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
                  <UserIcon
                    style={{ width: "20px", height: "20px", color: "#64748b" }}
                  />
                  <span className="text-slate-700 font-medium">
                    {band.members || "Carreira solo"}
                  </span>
                </li>
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
                  <LocationIcon
                    style={{ width: "20px", height: "20px", color: "#64748b" }}
                  />
                  <span className="text-slate-700 font-medium">
                    Localizada em {band.city}
                  </span>
                </li>
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
                  <MusicIcon
                    style={{ width: "20px", height: "20px", color: "#64748b" }}
                  />
                  <span className="text-slate-700 font-medium">
                    {capitalize(band.genre)}
                  </span>
                </li>
              </ul>
            </section>

            {/* Social Media Section */}
            <section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
              <h2 className="text-xl font-bold text-slate-800 mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Redes Sociais
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 opacity-50">
                  <TwitterIcon
                    style={{ width: "20px", height: "20px", color: "#64748b" }}
                  />
                  <span className="text-slate-500 font-medium">
                    {band.twitter ? (
                      <a
                        href={band.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Twitter
                      </a>
                    ) : (
                      "Twitter não informado"
                    )}
                  </span>
                </li>
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 opacity-50">
                  <FacebookIcon
                    style={{ width: "20px", height: "20px", color: "#64748b" }}
                  />
                  <span className="text-slate-500 font-medium">
                    {band.facebook ? (
                      <a
                        href={band.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Facebook
                      </a>
                    ) : (
                      "Facebook não informado"
                    )}
                  </span>
                </li>
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 opacity-50">
                  <InstagramIcon
                    style={{ width: "20px", height: "20px", color: "#64748b" }}
                  />
                  <span className="text-slate-500 font-medium">
                    {band.instagram ? (
                      <a
                        href={band.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Instagram
                      </a>
                    ) : (
                      "Instagram não informado"
                    )}
                  </span>
                </li>
              </ul>
            </section>

            {/* Reviews Section */}
            <ViewReview id={id || ""} />

            {/* Review Button for non-band users */}
            {!isBand && (
              <div className="flex justify-center">
                <Review band={band} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BandProfile;
