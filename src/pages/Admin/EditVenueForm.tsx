import { useState, useEffect, FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CameraIcon, Save, Loader2, Image as ImageIcon, LinkIcon } from 'lucide-react';

import api from '@/services/api';
import { getUser } from '@/services/users';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Tipo atualizado para corresponder à entidade Venue
type VenueData = {
  name: string;
  type: string;
  cep: string;
  city: string;
  description?: string;
  address?: string;
  contact?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  profilePhoto?: string;
  coverPhoto?: string;
};

export default function EditVenueForm() {
  const queryClient = useQueryClient();
  const user = getUser();
  
  // Estados renomeados e adicionados para corresponder a VenueData
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);

  const [previewCoverPhoto, setPreviewCoverPhoto] = useState<string | null>(null);
  const [previewProfilePhoto, setPreviewProfilePhoto] = useState<string | null>(null);

  const { data: venueData, isLoading: isLoadingData } = useQuery<VenueData>({
    queryKey: ['venue-details', user?.id], // Chave da query consistente
    queryFn: async () => {
      const { data } = await api.get(`/venues/user/${user?.id}`);
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (venueData) {
      setName(venueData.name ?? '');
      setType(venueData.type ?? '');
      setCity(venueData.city ?? '');
      setAddress(venueData.address ?? '');
      setCep(venueData.cep ?? '');
      setDescription(venueData.description ?? '');
      setContact(venueData.contact ?? '');
      setTwitter(venueData.twitter ?? '');
      setInstagram(venueData.instagram ?? '');
      setFacebook(venueData.facebook ?? '');
      setPreviewProfilePhoto(venueData.profilePhoto ?? null);
      setPreviewCoverPhoto(venueData.coverPhoto ?? null);
    }
  }, [venueData]);

  const { mutate: updateProfile, isPending: isSaving } = useMutation({
    mutationFn: async (formDataToSubmit: FormData) => {
      if (!formDataToSubmit.entries().next().value) {
        toast.info("Nenhuma alteração para salvar.");
        return;
      }
      await api.patch(`/venues/user/${user?.id}`, formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      // Invalida a query correta para buscar os dados atualizados
      queryClient.invalidateQueries({ queryKey: ['venue-details', user?.id] });
    },
    onError: (error) => {
      toast.error('Ocorreu um erro ao atualizar o perfil.');
      console.error(error);
    }
  });
  
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (isLoadingData || !venueData) return;
    
    const formData = new FormData();

    // Compara cada campo e adiciona ao FormData se mudou, usando os nomes da entidade Venue
    if (name !== (venueData.name ?? '')) formData.append('name', name);
    if (type !== (venueData.type ?? '')) formData.append('type', type);
    if (city !== (venueData.city ?? '')) formData.append('city', city);
    if (address !== (venueData.address ?? '')) formData.append('address', address);
    if (cep !== (venueData.cep ?? '')) formData.append('cep', cep);
    if (description !== (venueData.description ?? '')) formData.append('description', description);
    if (contact !== (venueData.contact ?? '')) formData.append('contact', contact);
    if (twitter !== (venueData.twitter ?? '')) formData.append('twitter', twitter);
    if (instagram !== (venueData.instagram ?? '')) formData.append('instagram', instagram);
    if (facebook !== (venueData.facebook ?? '')) formData.append('facebook', facebook);

    // Adiciona os arquivos de imagem com os nomes corretos
    if (profilePhotoFile) formData.append('profilePhoto', profilePhotoFile);
    if (coverPhotoFile) formData.append('coverPhoto', coverPhotoFile);
    
    updateProfile(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePhoto' | 'coverPhoto') => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === 'profilePhoto') {
        setProfilePhotoFile(file);
        setPreviewProfilePhoto(URL.createObjectURL(file));
      } else {
        setCoverPhotoFile(file);
        setPreviewCoverPhoto(URL.createObjectURL(file));
      }
    }
  };

  if (isLoadingData) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="p-4 md:p-8">
        <form onSubmit={handleSave} className="mx-auto w-full max-w-4xl">
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <label htmlFor="coverPhoto" className="group relative block h-[180px] cursor-pointer bg-slate-200 md:h-[250px]">
                  <input id="coverPhoto" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e, 'coverPhoto')} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <CameraIcon className="h-8 w-8 text-white" />
                    <span className="mt-2 font-semibold text-white">Alterar foto de capa</span>
                  </div>
                  {previewCoverPhoto ? <img src={previewCoverPhoto} alt="Foto de capa" className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gradient-to-r from-slate-300 to-slate-200"></div>}
                </label>
                <div className="absolute -bottom-12 left-4 md:left-8 h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white bg-white shadow-lg">
                   <label htmlFor="profilePhoto" className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-full">
                      <input id="profilePhoto" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e, 'profilePhoto')} />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <CameraIcon className="h-6 w-6 text-white" />
                      </div>
                      {previewProfilePhoto ? <img src={previewProfilePhoto} alt="Foto de perfil" className="h-full w-full object-cover"/> : <div className="flex h-full w-full items-center justify-center bg-slate-200"><ImageIcon className="h-10 w-10 text-slate-400"/></div>}
                   </label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-8 pt-16 md:px-8">
              <CardTitle className="text-3xl font-bold">{venueData?.name || 'Nome do Estabelecimento'}</CardTitle>
              <CardDescription className="text-base text-slate-500">{venueData?.type || 'Tipo de Estabelecimento'}</CardDescription>
              
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Nome do Estabelecimento</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="venueType">Tipo (Ex: Bar, Casa de Show, Teatro)</Label>
                  <Input id="venueType" value={type} onChange={e => setType(e.target.value)} className="mt-2" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" value={address} onChange={e => setAddress(e.target.value)} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" value={city} onChange={e => setCity(e.target.value)} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" value={cep} onChange={e => setCep(e.target.value)} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="contact">Contato (Telefone ou Email)</Label>
                    <Input id="contact" value={contact} onChange={e => setContact(e.target.value)} className="mt-2" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={5} className="mt-2" />
                </div>
              </div>

              <div className='mt-8'>
                <h3 className='text-lg font-semibold'>Redes Sociais e Contato</h3>
                <div className='mt-4 grid grid-cols-1 gap-6'>
                    <div className='relative'>
                        <Label htmlFor='instagram'>Instagram</Label>
                        <LinkIcon className='absolute left-3 top-10 h-4 w-4 text-slate-400'/>
                        <Input id='instagram' value={instagram} onChange={e => setInstagram(e.target.value)} className="mt-2 pl-10" placeholder='@seu_estabelecimento' />
                    </div>
                     <div className='relative'>
                        <Label htmlFor='facebook'>Facebook</Label>
                        <LinkIcon className='absolute left-3 top-10 h-4 w-4 text-slate-400'/>
                        <Input id='facebook' value={facebook} onChange={e => setFacebook(e.target.value)} className="mt-2 pl-10" placeholder='seu.estabelecimento' />
                    </div>
                     <div className='relative'>
                        <Label htmlFor='twitter'>Twitter / X</Label>
                        <LinkIcon className='absolute left-3 top-10 h-4 w-4 text-slate-400'/>
                        <Input id='twitter' value={twitter} onChange={e => setTwitter(e.target.value)} className="mt-2 pl-10" placeholder='@seu_estabelecimento' />
                    </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-slate-50 px-6 py-4 md:px-8">
              <Button type="submit" disabled={isSaving || isLoadingData} className="ml-auto">
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}