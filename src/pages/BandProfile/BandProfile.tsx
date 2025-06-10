import { Link, useParams } from "react-router-dom";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
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
import { Button } from "@/components/ui/button";
import HireBandForm from "@/components/Contrato";
import Review from "@/components/Review/Review";
import Footer from "@/components/Footer/Footer";
import ViewReview from "@/components/Review/View";

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
  description: string;
  createdAt: string;
  userId: UserType;
};

const BandProfile = () => {
  const { id } = useParams();

  const { data: band, isLoading, error } = useQuery({
    queryKey: ["band", id],
    queryFn: async () => {
      const response = await api.get<BandProfileType>(`/bands/user/${id}`);
      return response.data;
    },
  });

  const isBand = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}").role === "band"
    : false;

  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}").id
    : null;

  const owner = band?.userId.id === userId;

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
          <div className="relative w-full h-64 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          {/* Fixed profile picture positioning */}
          <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-2xl shadow-black/20 flex items-center justify-center overflow-hidden">
            <BandProfileIcon style={{ width: '3rem', height: '3rem', color: '#1e293b' }} />
          </div>
        </section>

        {/* Profile Header - Added margin-top to account for overlapping profile picture */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-2 mt-16">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {band.bandName}
            </h1>
            <p className="text-lg text-slate-600 font-medium">{capitalize(band.genre)}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {isBand && owner ? (
              <Link to={`/meu-perfil`}>
                <Button variant={"outline"} className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
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
            {/* Photos Section */}
            <section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Fotos
                </h2>
              </div>
              <ImageCarousel />
            </section>

            {/* Description Section */}
            <section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Descrição
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {band.description || 'Sem descrição disponível.'}
              </p>
            </section>

            {/* Songs Section */}
            <section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Nossas músicas
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50/60 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-all duration-200">
                  <p className="font-medium text-slate-800">Caminhos Cruzados</p>
                  <Button size="sm" className="bg-black text-white hover:bg-gray-900">
                    Play
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50/60 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-all duration-200">
                  <p className="font-medium text-slate-800">Ecos do Amanhecer</p>
                  <Button size="sm" className="bg-black text-white hover:bg-gray-900">
                    Play
                  </Button>
                </div>
              </div>
            </section>

            {/* Events Section */}
            <section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Próximos eventos
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50/60 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-all duration-200">
                  <p className="font-medium text-slate-800">Rock in Rio</p>
                  <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    Ver evento
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50/60 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-all duration-200">
                  <p className="font-medium text-slate-800">Lollapalooza</p>
                  <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    Ver evento
                  </Button>
                </div>
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
                  <UserIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
                  <span className="text-slate-700 font-medium">4 membros</span>
                </li>
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
                  <LocationIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
                  <span className="text-slate-700 font-medium">Localizada em {band.city}</span>
                </li>
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
                  <MusicIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
                  <span className="text-slate-700 font-medium">{capitalize(band.genre)}</span>
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
                  <TwitterIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
                  <span className="text-slate-500 font-medium">Twitter/X não informado</span>
                </li>
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 opacity-50">
                  <FacebookIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
                  <span className="text-slate-500 font-medium">Facebook não informado</span>
                </li>
                <li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 opacity-50">
                  <InstagramIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
                  <span className="text-slate-500 font-medium">Instagram não informado</span>
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