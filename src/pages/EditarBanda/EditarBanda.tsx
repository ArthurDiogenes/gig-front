import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { BandProfileIcon } from '../../utils/icons';
import styles from './EditarBanda.module.css';

const EditarBanda = () => {
	// Estados para imagens
	const [carouselImages, setCarouselImages] = useState<string[]>([]);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	// Estado da aba ativa
	const [tab, setTab] = useState<'perfil' | 'termos'>('perfil');

	// Estados do formulário de perfil
	const [bandName, setBandName] = useState('');
	const [genre, setGenre] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [terms, setTerms] = useState('');
	const [twitter, setTwitter] = useState('');
	const [facebook, setFacebook] = useState('');
	const [instagram, setInstagram] = useState('');
	const [aceitouTermos, setAceitouTermos] = useState(false);

	// Função de salvar (mock)
	const handleSave = () => {
		const data = {
			bandName,
			genre,
			location,
			description,
			terms,
			twitter,
			facebook,
			instagram,
			carouselImages,
			profileImage,
		};

		console.log('Dados salvos:', data);
		alert('Perfil salvo com sucesso!');
	};

	return (
		<>
			<Navbar />
			<main className={styles.main}>
				{/* Upload de imagens */}
				<section className={styles.imageSection}>
					{/* Upload de imagens do carrossel */}
					<div className={styles.carouselUpload}>
						<label htmlFor="carousel-upload" className={styles.carouselButton}>
							Adicionar imagens do carrossel
						</label>
						<input
							id="carousel-upload"
							type="file"
							accept="image/*"
							multiple
							onChange={(e) => {
								if (e.target.files) {
									const filesArray = Array.from(e.target.files).map(file =>
										URL.createObjectURL(file)
									);
									setCarouselImages(prev => [...prev, ...filesArray]);
								}
							}}
							style={{ display: 'none' }}
						/>
					</div>

					{/* Visualização das imagens */}
					<div className={styles.carouselPreview}>
						{carouselImages.map((src, index) => (
							<img key={index} src={src} alt={`Carrossel ${index}`} className={styles.carouselImage} />
						))}
					</div>

					{/* Upload da imagem de perfil */}
					<label htmlFor="profile-upload" className={styles.profileImageLabel}>
						{profileImage ? (
							<img src={profileImage} alt="Perfil" className={styles.profileImage} />
						) : (
							<BandProfileIcon style={{ width: '48px', height: '48px', color: '#000' }} />
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
							style={{ display: 'none' }}
						/>
					</label>
				</section>

				{/* Tabs de navegação */}
				<div className={styles.tabsContainer}>
					<div className={styles.tabs}>
						<button
							onClick={() => setTab('perfil')}
							className={`${styles.tab} ${tab === 'perfil' ? styles.active : ''}`}
						>
							Perfil
						</button>
						<button
							onClick={() => setTab('termos')}
							className={`${styles.tab} ${tab === 'termos' ? styles.active : ''}`}
						>
							Termos
						</button>
					</div>
				</div>

				{/* ======================================== */}
				{/* ========== SEÇÃO: PERFIL DA BANDA ====== */}
				{/* ======================================== */}
				{tab === 'perfil' ? (
					<section className={styles.formSection}>
						<h1 className={styles.title}>Editar Perfil da Banda</h1>
						<p className={styles.subtitle}>Preencha as informações do perfil da banda abaixo.</p>
						<div className={styles.formGroup}>
							<label>
								Nome da banda:
								<input type="text" value={bandName} onChange={(e) => setBandName(e.target.value)} className={styles.input} />
							</label>
							<label>
								Gênero musical:
								<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className={styles.input} />
							</label>
							<label>
								Localização:
								<input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={styles.input} />
							</label>
							<label>
								Descrição:
								<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={styles.textarea} />
							</label>
							<label>
								Twitter:
								<input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className={styles.input} />
							</label>
							<label>
								Facebook:
								<input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} className={styles.input} />
							</label>
							<label>
								Instagram:
								<input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className={styles.input} />
							</label>
						</div>

						<button onClick={handleSave} className={styles.saveButton}>
							Salvar
						</button>
					</section>

				// =========================================
				// ========== SEÇÃO: TERMOS DE USO =========
				// =========================================
				) : (
					<section className={styles.formSection}>
						<h1 className={styles.title}>Termos e Condições de Uso do Gig</h1>
						<div className={styles.termosTexto}>
							<h2>1. Introdução</h2>
							<p>Bem-vindo ao Gig! ...</p>
							<section>
								<h2>2. Definições</h2>
								<p>Para melhor compreensão ...</p>
								<ul>
									<li><strong>Gig</strong>: Plataforma digital para contratação de bandas.</li>
									<li><strong>Usuário</strong>: ...</li>
									<li><strong>Contratante</strong>: ...</li>
									<li><strong>Banda</strong>: ...</li>
									<li><strong>Evento</strong>: ...</li>
								</ul>
							</section>
							<section>
								<h2>3. Cadastro e Elegibilidade</h2>
								<p>3.1. Para utilizar o Gig ...</p>
							</section>
							<section>
								<h2>4. Funcionamento da Plataforma</h2>
								<p>4.1. O Gig atua apenas como ...</p>
							</section>
							<section>
								<h2>5. Obrigações dos Usuários</h2>
								<p>5.1. Os contratantes devem ...</p>
							</section>
							<section>
								<h2>6. Limitação de Responsabilidade</h2>
								<p>6.1. O Gig não é responsável ...</p>
							</section>
							<section>
								<h2>7. Privacidade e Dados Pessoais</h2>
								<p>7.1. O Gig coleta e processa ...</p>
							</section>
							<section>
								<h2>8. Alterações nos Termos</h2>
								<p>8.1. O Gig pode modificar ...</p>
							</section>
							<section>
								<h2>9. Disposições Finais</h2>
								<p>9.1. Qualquer questão não prevista ...</p>
							</section>
						</div>
					</section>
				)}
			</main>
		</>
	);
};

export default EditarBanda;
