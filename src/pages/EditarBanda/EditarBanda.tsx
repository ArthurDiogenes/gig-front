import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './EditarBanda.module.css';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import api from '@/services/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { BandProfileIcon } from '@/utils/icons';

const propostas = [
  {
    id: 1,
    eventName: 'Noite do Pop',
    data: '19/05/2025',
    horario: '20:00 - 23:00',
    tipo: 'Show ao vivo',
    valor: 1500,
    local: 'Bar do Zé',
    cep: '60415-150',
    descricao: 'Apresentação ao vivo com músicas pop atuais e clássicas.',
    endereco: 'Rua das Flores, 123, Centro',
    contato: '(85) 99999-9999',
    status: 'Pendente',
  },
  {
    id: 2,
    eventName: 'Pop & Rock Night',
    data: '04/06/2025',
    horario: '21:00 - 23:30',
    tipo: 'Show acústico',
    valor: 1200,
    local: "Pub Rock'n Beer",
    cep: '60422-200',
    descricao: 'Uma noite especial de pop acústico em um ambiente descontraído.',
    endereco: 'Av. Principal, 456, Bairro Fátima',
    contato: '(85) 98888-8888',
    status: 'Pendente',
  },
];

const EditarBanda = () => {
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [bandName, setBandName] = useState('');
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [terms, setTerms] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');

  const [statusTab, setStatusTab] = useState<'pendentes' | 'aceitas' | 'recusadas'>('pendentes');
  const [propostasEstado, setPropostasEstado] = useState(propostas);

  const handleSave = async () => {
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

    try {
      await api.put(`/bands/${5}`, data);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Tabs defaultValue="perfil" className={styles.tabsContainer}>
          <TabsList className={styles.tabs}>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="contratos">Contratos</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
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
                        const filesArray = Array.from(e.target.files).map(file =>
                          URL.createObjectURL(file)
                        );
                        setCarouselImages(prev => [...prev, ...filesArray]);
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

              <h1 className={styles.title}>Editar Perfil da Banda</h1>
              <p className={styles.subtitle}>Preencha as informações do perfil da banda abaixo.</p>

              <div className={styles.formGroup}>
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
              </div>

              <button onClick={handleSave} className={styles.saveButton}>
                Salvar
              </button>
            </section>
          </TabsContent>

          <TabsContent value="contratos">
            <section className={styles.formSection}>
              <div className={styles.statusTabs}>
                <button
                  className={`${styles.statusTab} ${statusTab === 'pendentes' ? styles.active : ''}`}
                  onClick={() => setStatusTab('pendentes')}
                >
                  Pendentes ({propostasEstado.filter(p => p.status === 'Pendente').length})
                </button>
                <button
                  className={`${styles.statusTab} ${statusTab === 'aceitas' ? styles.active : ''}`}
                  onClick={() => setStatusTab('aceitas')}
                >
                  Aceitas ({propostasEstado.filter(p => p.status === 'Aceita').length})
                </button>
                <button
                  className={`${styles.statusTab} ${statusTab === 'recusadas' ? styles.active : ''}`}
                  onClick={() => setStatusTab('recusadas')}
                >
                  Recusadas ({propostasEstado.filter(p => p.status === 'Recusada').length})
                </button>
              </div>

              <div className={styles.propostasContainer}>
                {propostasEstado
                  .filter(p => {
                    if (statusTab === 'pendentes') return p.status === 'Pendente';
                    if (statusTab === 'aceitas') return p.status === 'Aceita';
                    return p.status === 'Recusada';
                  })
                  .map(p => (
                    <div key={p.id} className={styles.propostaCard}>
                      <div className={styles.cardHeader}>
                        <h3>{p.eventName}</h3>
                        <span className={styles.statusBadge}>{p.status}</span>
                      </div>
                      <p>{p.tipo}</p>
                      <p>📅 {p.data} • {p.horario}</p>
                      <p>📍 {p.local} - {p.endereco} - CEP {p.cep}</p>
                      <p>💬 {p.descricao}</p>
                      <p>📞 Contato: {p.contato}</p>
                      <p className={styles.valor}>💰 R$ {p.valor.toFixed(2)}</p>

                      {p.status === 'Pendente' && (
                        <div className={styles.cardActions}>
                          <button
                            onClick={() =>
                              setPropostasEstado(prev =>
                                prev.map(item =>
                                  item.id === p.id ? { ...item, status: 'Aceita' } : item
                                )
                              )
                            }
                            className={styles.aceitarButton}
                          >
                            Aceitar
                          </button>
                          <button
                            onClick={() =>
                              setPropostasEstado(prev =>
                                prev.map(item =>
                                  item.id === p.id ? { ...item, status: 'Recusada' } : item
                                )
                              )
                            }
                            className={styles.recusarButton}
                          >
                            Recusar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default EditarBanda;
