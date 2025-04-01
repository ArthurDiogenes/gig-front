import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import Navbar from '../../components/Navbar/Navbar';
import {
	BandProfileIcon,
	FacebookIcon,
	InstagramIcon,
	LocationIcon,
	MusicIcon,
	StarIcon,
	StarOutlineIcon,
	TwitterIcon,
	UserIcon,
} from '../../utils/icons';
import styles from './BandProfile.module.css';

const BandProfile = () => {
	return (
		<>
			<Navbar />
			<main style={{ maxWidth: 1720, margin: '0 auto', paddingTop: 16 }}>
				<section
					style={{
						height: '300px',
					}}
				>
					<div
						className={styles.imgContainer}
						style={{
							backgroundColor: '#000',
							height: '244px',
							width: '100%',
							borderRadius: '16px 16px 0 0',
							marginBottom: '16px',
							position: 'relative',
						}}
					>
						<div
							style={{
								border: '1px solid #999',
								height: '96px',
								width: '96px',
								backgroundColor: '#fff',
								borderRadius: '50%',
								position: 'absolute',
								top: '100%',
								transform: 'translateY(-50%)',
								left: '16px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<BandProfileIcon
								style={{
									width: '48px',
									height: '48px',
									color: '#000',
								}}
							/>
						</div>
					</div>
				</section>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						position: 'relative',
					}}
				>
					<div>
						<h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
							The Melodic Mavericks
						</h1>
						<p style={{ color: '#666' }}>Alternative Rock Band</p>
					</div>
					<div style={{ display: 'flex', marginLeft: 'auto', gap: '16px' }}>
						<button className={`${styles.btn} ${styles['btn-outline']}`}>
							Mensagem
						</button>
						<button className={`${styles.btn} ${styles['btn-default']}`}>
							Seguir
						</button>
					</div>
				</div>
				<div className={styles.sectionContainer}>
					<div
						style={{
							flex: 3,
						}}
					>
						<section
							style={{
								border: '1px solid #ddd',
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
							}}
						>
							<h2>Fotos</h2>
							<ImageCarousel />
						</section>

						<section
							style={{
								border: '1px solid #ddd',
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
							}}
						>
							<h2>Descrição</h2>
							<p style={{ color: '#555' }}>
								The Melodic Mavericks é uma banda que mistura rock, jazz e folk,
								criando melodias complexas e emocionantes. Suas músicas trazem
								variações dinâmicas e letras profundas que exploram temas
								pessoais e sociais. Com esse estilo único, se destacam como
								pioneiros na música contemporânea.
							</p>
						</section>

						<section
							style={{
								border: '1px solid #ddd',
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
							}}
						>
							<h2>Nossas músicas</h2>
							<div style={{ marginTop: '8px' }}>
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<p>Caminhos Cruzados</p>
									<button className={`${styles.btn} ${styles['btn-outline']}`}>
										Play
									</button>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginTop: '8px',
									}}
								>
									<p>Ecos do Amanhecer</p>
									<button className={`${styles.btn} ${styles['btn-outline']}`}>
										Play
									</button>
								</div>
							</div>
						</section>

						<section
							style={{
								border: '1px solid #ddd',
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
							}}
						>
							<h2>Próximos eventos</h2>
							<div style={{ marginTop: '8px' }}>
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<p>Rock in Rio</p>
									<button className={`${styles.btn} ${styles['btn-default']}`}>
										Ver evento
									</button>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginTop: '8px',
									}}
								>
									<p>Lollapalooza</p>
									<button className={`${styles.btn} ${styles['btn-default']}`}>
										Ver evento
									</button>
								</div>
							</div>
						</section>
					</div>
					<div
						style={{
							flex: 2,
						}}
					>
						<section
							style={{
								border: '1px solid #ddd',
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
							}}
						>
							<h2>Info</h2>
							<ul
								style={{
									listStyle: 'none',
									padding: '16px',
								}}
							>
								<li
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '16px',
									}}
								>
									<UserIcon
										style={{
											width: '16px',
											height: '16px',
											color: '#000',
										}}
									/>
									<span>4 membros</span>
								</li>
								<li
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '16px',
										margin: '16px 0',
									}}
								>
									<LocationIcon
										style={{
											width: '20px',
											height: '20px',
											color: '#000',
										}}
									/>
									<span>Localizada em Fortaleza/CE</span>
								</li>
								<li
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '16px',
									}}
								>
									<MusicIcon
										style={{
											width: '20px',
											height: '20px',
											color: '#000',
										}}
									/>
									<span>Pop Music e Death Metal</span>
								</li>
							</ul>
						</section>

						<section
							style={{
								border: '1px solid #ddd',
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
							}}
						>
							<h2>Redes Sociais</h2>
							<ul
								style={{
									listStyle: 'none',
									padding: '16px',
								}}
							>
								<li
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '16px',
									}}
								>
									<TwitterIcon
										style={{
											width: '16px',
											height: '16px',
											color: '#000',
										}}
									/>
									<span>Twitter/X</span>
								</li>
								<li
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '16px',
										margin: '16px 0',
									}}
								>
									<FacebookIcon
										style={{
											width: '20px',
											height: '20px',
											color: '#000',
										}}
									/>
									<span>Facebook</span>
								</li>
								<li
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '16px',
									}}
								>
									<InstagramIcon
										style={{
											width: '20px',
											height: '20px',
											color: '#000',
										}}
									/>
									<span>Instagram</span>
								</li>
							</ul>
						</section>

						<section
							style={{
								border: '1px solid #ddd',
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
							}}
						>
							<h2>Reviews</h2>
							<div style={{ marginTop: '8px' }}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'start',
									}}
								>
									<div style={{ display: 'flex', gap: 2 }}>
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarIcon />
									</div>
									<p style={{ color: '#555', margin: '8px 0 16px 0' }}>
										"The Melodic Mavericks brought the house down! Their energy
										was contagious."
									</p>
									<span style={{ fontSize: 14, color: '#888' }}>
										- Rock City Venue
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'start',
										marginTop: '48px',
									}}
								>
									<div style={{ display: 'flex', gap: 2 }}>
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarOutlineIcon />
									</div>
									<p style={{ color: '#555', margin: '8px 0 16px 0' }}>
										"Great band with a unique sound. They were professional and easy to work with."
									</p>
									<span style={{ fontSize: 14, color: '#888' }}>
										- Soundwave Festival
									</span>
								</div>
							</div>
						</section>
						<button
							style={{ placeSelf: 'end', marginTop: 16 }}
							className={`${styles.btn} ${styles['btn-default']}`}
						>
							Avaliar
						</button>
					</div>
				</div>
			</main>
		</>
	);
};

export default BandProfile;
