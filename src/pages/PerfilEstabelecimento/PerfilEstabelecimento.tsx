import EditarEstabelecimento from '@/components/EditarEstabelecimento';
import Navbar from '../../components/Navbar/Navbar';
import {
	BandProfileIcon,
	EditIcon,
	FacebookIcon,
	InstagramIcon,
	LocationIcon,
	StarIcon,
	StarOutlineIcon,
	TagIcon,
	TwitterIcon,
} from '../../utils/icons';
import Footer from '../../components/Footer/Footer';

const PerfilEstabelecimento = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			<Navbar />
			
			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Cover Section */}
				<section className="mb-8">
					<div className="relative w-full h-64 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
						<div className="absolute inset-0 bg-black/20"></div>
						<div className="absolute -bottom-6 left-8 w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-2xl shadow-black/20 flex items-center justify-center">
							<BandProfileIcon style={{ width: '3rem', height: '3rem', color: '#1e293b' }} />
						</div>
					</div>
				</section>

				{/* Profile Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-2">
					<div className="mb-4 md:mb-0">
						<h1 className="text-3xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
							Hard Rock Café
						</h1>
					</div>
					<div className="flex flex-wrap gap-3">
						<div>
							<EditarEstabelecimento />
						</div>
					</div>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Photos Section */}
						<section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
							<h2 className="text-xl font-bold text-slate-800 mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
								Fotos
							</h2>
							<div className="rounded-xl overflow-hidden shadow-lg mb-4" style={{ height: '520px' }}>
								<div 
									className="w-full h-full bg-cover bg-center rounded-xl"
									style={{ backgroundImage: 'url(/public/images/hard-rock.png)' }}
								/>
							</div>
							<button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-3">
								<span className="text-xl">+</span>
								Adicionar fotos
							</button>
						</section>

						{/* Description Section */}
						<section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
									Descrição
								</h2>
								<EditIcon style={{ width: '20px', height: '20px', color: '#64748b', cursor: 'pointer' }} />
							</div>
							<p className="text-slate-700 leading-relaxed">
								O Hard Rock Cafe é uma cadeia de restaurantes e entretenimento
								conhecida por sua temática rock 'n' roll, decorada com
								memorabilia de músicos famosos. Oferecendo uma experiência
								única, combina uma atmosfera vibrante com uma variedade de
								pratos clássicos, drinks e música ao vivo. O café também é
								famoso por suas lojas de produtos personalizados, tornando-se um
								destino para fãs de música e cultura pop.
							</p>
						</section>

						{/* Events Section */}
						<section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
									Próximos eventos
								</h2>
								<button className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
									<span className="text-lg">+</span>
									Adicionar evento
								</button>
							</div>
							<div className="space-y-4">
								<div className="flex justify-between items-center p-4 bg-slate-50/60 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-all duration-200">
									<p className="font-medium text-slate-800">Wesley Safadão</p>
									<button className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
										Ver evento
									</button>
								</div>
								<div className="flex justify-between items-center p-4 bg-slate-50/60 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-all duration-200">
									<p className="font-medium text-slate-800">Michael Jackson</p>
									<button className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
										Ver evento
									</button>
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
									Info
								</h2>
								<EditIcon style={{ width: '20px', height: '20px', color: '#64748b', cursor: 'pointer', transition: 'color 0.2s' }} />
							</div>
							<ul className="space-y-4">
								<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
									<TagIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
									<span className="text-slate-700 font-medium">Restaurante</span>
								</li>
								<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
									<LocationIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
									<span className="text-slate-700 font-medium">Localizada em Fortaleza/CE</span>
								</li>
							</ul>
						</section>

						{/* Social Media Section */}
						<section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
							<h2 className="text-xl font-bold text-slate-800 mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
								Redes Sociais
							</h2>
							<ul className="space-y-4">
								<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 hover:bg-slate-100/80 transition-all duration-200 cursor-pointer">
									<TwitterIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
									<span className="text-slate-700 font-medium">Twitter/X</span>
								</li>
								<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 hover:bg-slate-100/80 transition-all duration-200 cursor-pointer">
									<FacebookIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
									<span className="text-slate-700 font-medium">Facebook</span>
								</li>
								<li className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-lg border border-slate-200/40 hover:bg-slate-100/80 transition-all duration-200 cursor-pointer">
									<InstagramIcon style={{ width: '20px', height: '20px', color: '#64748b' }} />
									<span className="text-slate-700 font-medium">Instagram</span>
								</li>
							</ul>
						</section>

						{/* Reviews Section */}
						<section className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
							<h2 className="text-xl font-bold text-slate-800 mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
								Reviews
							</h2>
							<div className="space-y-6">
								<div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200/50">
									<div className="flex gap-1 mb-3">
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarIcon />
									</div>
									<p className="text-slate-700 text-sm leading-relaxed mb-3">
										"Great place to play! Loved the atmosphere and energy of the
										crowd. Definitely recommend getting a gig there."
									</p>
									<span className="text-xs text-slate-500 font-medium">- Nirvana</span>
								</div>
								<div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200/50">
									<div className="flex gap-1 mb-3">
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarOutlineIcon />
									</div>
									<p className="text-slate-700 text-sm leading-relaxed mb-3">
										"The sound system there leaves a little to be desired, but
										otherwise it was a great experience."
									</p>
									<span className="text-xs text-slate-500 font-medium">
										- The Doors
									</span>
								</div>
							</div>
						</section>
						
						<div className="flex justify-center">
							<button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5">
								Avaliar
							</button>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default PerfilEstabelecimento;