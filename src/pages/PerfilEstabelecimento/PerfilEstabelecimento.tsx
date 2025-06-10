import Navbar from '../../components/Navbar/Navbar';
import {
	BandProfileIcon,
	FacebookIcon,
	InstagramIcon,
	LocationIcon,
	TagIcon,
	TwitterIcon,
} from '../../utils/icons';
import Footer from '../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { Phone } from 'lucide-react';

export type VenueProfileType = {
	id: string;
	name: string;
	type: string;
	cep: string;
	city: string;
	description: string;
	address: string;
	contact: string;
	coverPhoto: string | null;
	profilePhoto: string | null;
	twitter: string | null;
	instagram: string | null;
	facebook: string | null;
	user: {
		id: string;
		role: string;
	}
}

const PerfilEstabelecimento = () => {
	const {id} = useParams();

	const { data : venue, isLoading, error } = useQuery({
		queryKey: ['venue', id],
		queryFn: async () => {
			const response = await api.get<VenueProfileType>(`/venues/user/${id}`);
			if (response.status !== 200) {
				throw new Error('Erro ao buscar o estabelecimento');
			}
			return response.data;
		},
	})

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

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
				<Navbar />
				<div className="flex items-center justify-center h-96">
					<p className="text-lg text-red-600">Erro ao carregar estabelecimento</p>
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
						{venue?.coverPhoto ? (
							<img 
								src={venue.coverPhoto} 
								alt="Cover" 
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="absolute inset-0 bg-black/20"></div>
						)}
					</div>
					{/* Fixed profile picture positioning */}
					<div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-2xl shadow-black/20 flex items-center justify-center overflow-hidden">
						{venue?.profilePhoto ? (
							<img 
								src={venue.profilePhoto} 
								alt="Profile" 
								className="w-full h-full object-cover"
							/>
						) : (
							<BandProfileIcon style={{ width: '3rem', height: '3rem', color: '#1e293b' }} />
						)}
					</div>
				</section>

				{/* Profile Header - Added margin-top to account for overlapping profile picture */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-2 mt-16">
					<div className="mb-4 md:mb-0">
						<h1 className="text-3xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
							{venue?.name}
						</h1>
						<p className="text-lg text-slate-600 font-medium">{venue?.type}</p>
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
								{venue?.description || 'Sem descrição disponível.'}
							</p>
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
									<p className="font-medium text-slate-800">Wesley Safadão</p>
									<span className="text-sm text-slate-600">15 de Janeiro</span>
								</div>
								<div className="flex justify-between items-center p-4 bg-slate-50/60 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-all duration-200">
									<p className="font-medium text-slate-800">Michael Jackson</p>
									<span className="text-sm text-slate-600">22 de Janeiro</span>
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
									<TagIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
									<span className="text-slate-700 font-medium">{venue?.type}</span>
								</li>
								<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
									<LocationIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
									<span className="text-slate-700 font-medium">{venue?.city}</span>
								</li>
								{venue?.address && (
									<li className="flex items-start gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
										<LocationIcon style={{ width: '20px', height: '20px', color: '#64748b', marginTop: '2px' }} />
										<span className="text-slate-700 font-medium text-sm">{venue.address}</span>
									</li>
								)}
								{venue?.contact && (
									<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
										<Phone style={{ width: '20px', height: '20px', color: '#64748b' }} />
										<span className="text-slate-700 font-medium">{venue.contact}</span>
									</li>
								)}
							</ul>
						</section>

						{/* Social Media Section */}
						<section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
							<h2 className="text-xl font-bold text-slate-800 mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
								Redes Sociais
							</h2>
							<ul className="space-y-4">
								{venue?.twitter ? (
									<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 hover:bg-slate-100/80 transition-all duration-200">
										<TwitterIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
										<a 
											href={venue.twitter} 
											target="_blank" 
											rel="noopener noreferrer"
											className="text-slate-700 font-medium hover:text-slate-900 transition-colors"
										>
											Twitter/X
										</a>
									</li>
								) : (
									<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 opacity-50">
										<TwitterIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
										<span className="text-slate-500 font-medium">Twitter/X não informado</span>
									</li>
								)}
								{venue?.facebook ? (
									<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 hover:bg-slate-100/80 transition-all duration-200">
										<FacebookIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
										<a 
											href={venue.facebook} 
											target="_blank" 
											rel="noopener noreferrer"
											className="text-slate-700 font-medium hover:text-slate-900 transition-colors"
										>
											Facebook
										</a>
									</li>
								) : (
									<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 opacity-50">
										<FacebookIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
										<span className="text-slate-500 font-medium">Facebook não informado</span>
									</li>
								)}
								{venue?.instagram ? (
									<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 hover:bg-slate-100/80 transition-all duration-200">
										<InstagramIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
										<a 
											href={venue.instagram} 
											target="_blank" 
											rel="noopener noreferrer"
											className="text-slate-700 font-medium hover:text-slate-900 transition-colors"
										>
											Instagram
										</a>
									</li>
								) : (
									<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 opacity-50">
										<InstagramIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
										<span className="text-slate-500 font-medium">Instagram não informado</span>
									</li>
								)}
							</ul>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default PerfilEstabelecimento;