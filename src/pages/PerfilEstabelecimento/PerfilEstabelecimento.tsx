import Navbar from '../../components/Navbar/Navbar';
import {
	BandProfileIcon,
	EditIcon,
	FacebookIcon,
	InstagramIcon,
	LocationIcon,
	StarIcon,
	StarOutlineIcon,
	TwitterIcon,
	UserIcon,
} from '../../utils/icons';
import styles from './PerfilEstabelecimento.module.css';

const PerfilEstabelecimento = () => {
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
							Hard Rock Café
						</h1>
					</div>
					<div style={{ display: 'flex', marginLeft: 'auto', gap: '16px' }}>
						<button className={`${styles.btn} ${styles['btn-outline']}`}>
							<EditIcon style={{ marginRight: 8 }} />
							Editar
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
							<div
								style={{
									height: '520px',
									backgroundImage: 'url(/public/images/hard-rock.png)',
                  backgroundSize: 'cover',
                  borderRadius: '8px',
								}}
							/>
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
								O Hard Rock Cafe é uma cadeia de restaurantes e entretenimento
								conhecida por sua temática rock 'n' roll, decorada com
								memorabilia de músicos famosos. Oferecendo uma experiência
								única, combina uma atmosfera vibrante com uma variedade de
								pratos clássicos, drinks e música ao vivo. O café também é
								famoso por suas lojas de produtos personalizados, tornando-se um
								destino para fãs de música e cultura pop.
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
							<h2>Próximos eventos</h2>
							<div style={{ marginTop: '8px' }}>
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<p>Wesley Safadão</p>
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
									<p>Michael Jackson</p>
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
										"Great place to play! Loved the atmosphere and energy of the
										crowd. Definitely recommend getting a gig there."
									</p>
									<span style={{ fontSize: 14, color: '#888' }}>- Nirvana</span>
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
										"The sound system there leaves a little to be desired, but
										otherwise it was a great experience."
									</p>
									<span style={{ fontSize: 14, color: '#888' }}>
										- The Doors
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

export default PerfilEstabelecimento;
