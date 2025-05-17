import { FormEvent } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './EditarBanda.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/services/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const EditarBanda = () => {
	
	// Função de salvar
	const updateBand = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Pega os dados do formulário
		const formData = new FormData(e.currentTarget);	
		const data = Object.fromEntries(formData.entries());

		// Realiza a requisição.
		try {
			await api.put(`/bands/${5}`, data);
			toast.success('Perfil atualizado com sucesso!')
		} catch (error) {
			if(error instanceof AxiosError) {
				toast.error(error.response?.data.errors);
			}
		}
	};

	return (
		<>
			<Navbar />
			<Tabs defaultValue="perfil">
				<TabsList>
					<TabsTrigger value="perfil">Perfil</TabsTrigger>
					<TabsTrigger value="contratos">Contratos</TabsTrigger>
				</TabsList>
				<TabsContent value="perfil">
					{/* <section className={styles.imageSection}>
						<div className={styles.carouselUpload}>
							<label
								htmlFor="carousel-upload"
								className={styles.carouselButton}
							>
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
								style={{ display: 'none' }}
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

						<label
							htmlFor="profile-upload"
							className={styles.profileImageLabel}
						>
							{profileImage ? (
								<img
									src={profileImage}
									alt="Perfil"
									className={styles.profileImage}
								/>
							) : (
								<BandProfileIcon
									style={{ width: '48px', height: '48px', color: '#000' }}
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
								style={{ display: 'none' }}
							/>
						</label>
					</section> */}

					<form onSubmit={updateBand} className={styles.formSection}>
						<h1 className={styles.title}>Editar Perfil da Banda</h1>
						<p className={styles.subtitle}>
							Preencha as informações do perfil da banda abaixo.
						</p>
						<div className={styles.formGroup}>
							<label>
								Nome da banda:
								<input name="bandName" className={styles.input} />
							</label>
							<label>
								Gênero musical:
								<input name="genre" className={styles.input} />
							</label>
							<label>
								Cidade:
								<input name="city" className={styles.input} />
							</label>
							<label>
								Descrição:
								<textarea
									name="description"
									rows={4}
									className={styles.textarea}
								/>
							</label>
							<label>
								Twitter:
								<input name="twitter" className={styles.input} />
							</label>
							<label>
								Facebook:
								<input name='facebook' type="text" className={styles.input} />
							</label>
							<label>
								Instagram:
								<input name='instagram' type="text" className={styles.input} />
							</label>
						</div>

						<button className={styles.saveButton}>Salvar</button>
					</form>
				</TabsContent>
				<TabsContent value="contratos"></TabsContent>
			</Tabs>
		</>
	);
};

export default EditarBanda;
