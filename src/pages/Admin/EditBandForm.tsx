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

type BandData = {
  bandName: string;
  genre: string;
  city: string;
  description?: string;
  contact?: string;
  members?: number;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  profilePicture?: string;
  coverPicture?: string;
};

export default function EditBandForm() {
  const queryClient = useQueryClient();
  const user = getUser();
  
  const [bandName, setBandName] = useState('');
  const [genre, setGenre] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [members, setMembers] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [coverPictureFile, setCoverPictureFile] = useState<File | null>(null);

  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);

  const { data: bandData, isLoading: isLoadingData } = useQuery<BandData>({
    queryKey: ['band-details', user?.id],
    queryFn: async () => {
      const { data } = await api.get(`/bands/user/${user?.id}`);
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (bandData) {
      setBandName(bandData.bandName ?? '');
      setGenre(bandData.genre ?? '');
      setCity(bandData.city ?? '');
      setDescription(bandData.description ?? '');
      setContact(bandData.contact ?? '');
      setMembers(bandData.members?.toString() ?? '');
      setTwitter(bandData.twitter ?? '');
      setInstagram(bandData.instagram ?? '');
      setFacebook(bandData.facebook ?? '');
      setPreviewProfile(bandData.profilePicture ?? null);
      setPreviewCover(bandData.coverPicture ?? null);
    }
  }, [bandData]);

  const { mutate: updateProfile, isPending: isSaving } = useMutation({
    mutationFn: async (formDataToSubmit: FormData) => {
      if (!formDataToSubmit.entries().next().value) {
        toast.info("Nenhuma alteração para salvar.");
        return;
      }
      await api.patch(`/bands/user/${user?.id}`, formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['band-details', user?.id] });
    },
    onError: (error) => {
      toast.error('Ocorreu um erro ao atualizar o perfil.');
      console.error(error);
    }
  });
  
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (isLoadingData || !bandData) return;
    
    const formData = new FormData();

    // Compara cada campo e adiciona ao FormData se mudou
    if (bandName !== (bandData.bandName ?? '')) formData.append('bandName', bandName);
    if (genre !== (bandData.genre ?? '')) formData.append('genre', genre);
    if (city !== (bandData.city ?? '')) formData.append('city', city);
    if (description !== (bandData.description ?? '')) formData.append('description', description);
    if (contact !== (bandData.contact ?? '')) formData.append('contact', contact);
    if (twitter !== (bandData.twitter ?? '')) formData.append('twitter', twitter);
    if (instagram !== (bandData.instagram ?? '')) formData.append('instagram', instagram);
    if (facebook !== (bandData.facebook ?? '')) formData.append('facebook', facebook);

    // CORREÇÃO: Trata o campo 'members' de forma especial
    const originalMembers = bandData.members?.toString() ?? '';
    if (members !== originalMembers) {
        // Envia o valor de 'members' como está (string), para o backend converter
        formData.append('members', members);
    }

    if (profilePictureFile) formData.append('profilePicture', profilePictureFile);
    if (coverPictureFile) formData.append('coverPicture', coverPictureFile);
    
    updateProfile(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePicture' | 'coverPicture') => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === 'profilePicture') {
        setProfilePictureFile(file);
        setPreviewProfile(URL.createObjectURL(file));
      } else {
        setCoverPictureFile(file);
        setPreviewCover(URL.createObjectURL(file));
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
                <label htmlFor="coverPicture" className="group relative block h-[180px] cursor-pointer bg-slate-200 md:h-[250px]">
                  <input id="coverPicture" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e, 'coverPicture')} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <CameraIcon className="h-8 w-8 text-white" />
                    <span className="mt-2 font-semibold text-white">Alterar foto de capa</span>
                  </div>
                  {previewCover ? <img src={previewCover} alt="Foto de capa" className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gradient-to-r from-slate-300 to-slate-200"></div>}
                </label>
                <div className="absolute -bottom-12 left-4 md:left-8 h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white bg-white shadow-lg">
                   <label htmlFor="profilePicture" className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-full">
                      <input id="profilePicture" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e, 'profilePicture')} />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <CameraIcon className="h-6 w-6 text-white" />
                      </div>
                      {previewProfile ? <img src={previewProfile} alt="Foto de perfil" className="h-full w-full object-cover"/> : <div className="flex h-full w-full items-center justify-center bg-slate-200"><ImageIcon className="h-10 w-10 text-slate-400"/></div>}
                   </label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-8 pt-16 md:px-8">
              <CardTitle className="text-3xl font-bold">{bandData?.bandName || 'Nome da Banda'}</CardTitle>
              <CardDescription className="text-base text-slate-500">{bandData?.genre || 'Gênero'}</CardDescription>
              
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="bandName">Nome da Banda</Label>
                  <Input id="bandName" value={bandName} onChange={e => setBandName(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="genre">Gênero Musical</Label>
                  <Input id="genre" value={genre} onChange={e => setGenre(e.target.value)} className="mt-2" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" value={city} onChange={e => setCity(e.target.value)} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="contact">Contato (Telefone ou Email)</Label>
                    <Input id="contact" value={contact} onChange={e => setContact(e.target.value)} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="members">Nº de Membros</Label>
                    <Input id="members" type="number" min="0" value={members} onChange={e => setMembers(e.target.value)} className="mt-2" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={5} className="mt-2" />
                </div>
              </div>

              <div className='mt-8'>
                <h3 className='text-lg font-semibold'>Redes Sociais</h3>
                <div className='mt-4 grid grid-cols-1 gap-6'>
                    <div className='relative'>
                        <Label htmlFor='instagram'>Instagram</Label>
                        <LinkIcon className='absolute left-3 top-10 h-4 w-4 text-slate-400'/>
                        <Input id='instagram' value={instagram} onChange={e => setInstagram(e.target.value)} className="mt-2 pl-10" placeholder='@suabanda' />
                    </div>
                     <div className='relative'>
                        <Label htmlFor='facebook'>Facebook</Label>
                        <LinkIcon className='absolute left-3 top-10 h-4 w-4 text-slate-400'/>
                        <Input id='facebook' value={facebook} onChange={e => setFacebook(e.target.value)} className="mt-2 pl-10" placeholder='suabanda' />
                    </div>
                     <div className='relative'>
                        <Label htmlFor='twitter'>Twitter / X</Label>
                        <LinkIcon className='absolute left-3 top-10 h-4 w-4 text-slate-400'/>
                        <Input id='twitter' value={twitter} onChange={e => setTwitter(e.target.value)} className="mt-2 pl-10" placeholder='@suabanda' />
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