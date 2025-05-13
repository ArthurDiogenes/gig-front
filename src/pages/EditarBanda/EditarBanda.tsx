import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { BandProfileIcon } from '../../utils/icons';
import styles from './EditarBanda.module.css';

const EditarBanda= () => {
	const [coverImage, setCoverImage] = useState<string | null>(null);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const [bandName, setBandName] = useState('');
	const [genre, setGenre] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [twitter, setTwitter] = useState('');
	const [facebook, setFacebook] = useState('');
	const [instagram, setInstagram] = useState('');

	const handleSave = () => {
		const data = {
			bandName,
			genre,
			location,
			description,
			twitter,
			facebook,
			instagram,
			coverImage,
			profileImage,
		};

		console.log('Dados salvos:', data);
		alert('Perfil salvo com sucesso!');
	};

	return (
		<>
			<Navbar />
			<main style={{ maxWidth: 1720, margin: '0 auto', paddingTop: 16 }}>
				{/* Uploads de imagem */}
				<section style={{ height: '300px', position: 'relative' }}>
					<label htmlFor="cover-upload" style={{
						cursor: 'pointer',
						backgroundColor: '#000',
						height: '244px',
						width: '100%',
						borderRadius: '16px 16px 0 0',
						marginBottom: '16px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#fff',
						position: 'relative',
						overflow: 'hidden',
					}}>
						{coverImage ? (
							<img src={coverImage} alt="Capa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
						) : (
							<p>Clique para adicionar imagem de capa</p>
						)}
						<input
							id="cover-upload"
							type="file"
							accept="image/*"
							onChange={(e) => {
								if (e.target.files && e.target.files[0]) {
									setCoverImage(URL.createObjectURL(e.target.files[0]));
								}
							}}
							style={{ display: 'none' }}
						/>
					</label>

					<label htmlFor="profile-upload" style={{
						border: '1px solid #999',
						height: '96px',
						width: '96px',
						backgroundColor: '#fff',
						borderRadius: '50%',
						position: 'absolute',
						top: '244px',
						left: '16px',
						transform: 'translateY(-50%)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						overflow: 'hidden',
						cursor: 'pointer',
					}}>
						{profileImage ? (
							<img src={profileImage} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

				{/* Formulário */}
				<section style={{
					backgroundColor: '#fff',
					border: '1px solid #ccc',
					borderRadius: 8,
					padding: 24,
					marginTop: 32
				}}>
					<h1 style={{ fontSize: 24, marginBottom: 16 }}>Editar Perfil da Banda</h1>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
						<label>
							Nome da banda:
							<input
								type="text"
								value={bandName}
								onChange={(e) => setBandName(e.target.value)}
								className={styles.input}
							/>
						</label>

						<label>
							Gênero musical:
							<input
								type="text"
								value={genre}
								onChange={(e) => setGenre(e.target.value)}
								className={styles.input}
							/>
						</label>

						<label>
							Localização:
							<input
								type="text"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								className={styles.input}
							/>
						</label>

						<label>
							Descrição:
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={4}
								className={styles.textarea}
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

						<div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
							<button onClick={handleSave} className={`${styles.btn} ${styles['btn-default']}`}>
								Salvar
							</button>
							<button className={`${styles.btn} ${styles['btn-outline']}`}>
								Cancelar
							</button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default EditarBanda;
