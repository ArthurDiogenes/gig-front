import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CameraIcon, ImageIcon, MapPinIcon, StoreIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const schema = z.object({
	name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
	description: z
		.string()
		.max(250, 'Descrição máxima de 250 caracteres')
		.optional(),
	city: z.string().min(2, 'Cidade obrigatória'),
	type: z.enum(
		['Restaurante', 'Bar', 'Casa de show', 'Pub', 'Cafeteria', 'Outro'],
		{
			required_error: 'Selecione o tipo de estabelecimento',
		}
	),
	twitter: z.string().optional().or(z.literal('')),
	instagram: z.string().optional().or(z.literal('')),
	facebook: z.string().optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

const tiposEstabelecimento = [
	'Restaurante',
	'Bar', 
	'Casa de show',
	'Pub',
	'Cafeteria',
	'Outro',
];

type VenueData = {
	id: string;
	name: string;
	type: string;
	city: string;
	description?: string;
	twitter?: string;
	instagram?: string;
	facebook?: string;
};

interface EditarEstabelecimentoProps {
	venue: VenueData;
}

export default function EditarEstabelecimento({ venue }: EditarEstabelecimentoProps) {
	const [open, setOpen] = useState(false);
	const [previewProfile, setPreviewProfile] = useState<string | null>(null);
	const [previewCover, setPreviewCover] = useState<string | null>(null);
	const [profileFile, setProfileFile] = useState<File | null>(null);
	const [coverFile, setCoverFile] = useState<File | null>(null);
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
		watch,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: venue.name || '',
			description: venue.description || '',
			city: venue.city || '',
			type: venue.type as FormData['type'] || 'Restaurante',
			twitter: venue.twitter || '',
			instagram: venue.instagram || '',
			facebook: venue.facebook || '',
		},
	});

	// Reset form when venue data changes
	useEffect(() => {
		reset({
			name: venue.name || '',
			description: venue.description || '',
			city: venue.city || '',
			type: venue.type as FormData['type'] || 'Restaurante',
			twitter: venue.twitter || '',
			instagram: venue.instagram || '',
			facebook: venue.facebook || '',
		});
	}, [venue, reset]);

	const updateVenueMutation = useMutation({
		mutationFn: async (data: FormData) => {
			const formData = new FormData();

			// Add text fields
			formData.append('name', data.name);
			formData.append('description', data.description || '');
			formData.append('city', data.city);
			formData.append('type', data.type);
			formData.append('twitter', data.twitter || '');
			formData.append('instagram', data.instagram || '');
			formData.append('facebook', data.facebook || '');

			// Add files if selected
			if (profileFile) {
				formData.append('profilePhoto', profileFile);
			}
			if (coverFile) {
				formData.append('coverPhoto', coverFile);
			}

			const response = await api.patch(`/venues/${venue.id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return response.data;
		},
		onSuccess: () => {
			toast.success('Perfil atualizado com sucesso!');
			setOpen(false);
			// Invalidate and refetch venue data
			queryClient.invalidateQueries({ queryKey: ['venue'] });
			// Reset file states
			setProfileFile(null);
			setCoverFile(null);
			setPreviewProfile(null);
			setPreviewCover(null);
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			console.error('Error updating venue:', error);
			toast.error('Erro ao atualizar o perfil. Tente novamente.');
		},
	});

	const onSubmit = (data: FormData) => {
		updateVenueMutation.mutate(data);
	};

	// Handle profile photo upload
	function handleProfileFileInput(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (file) {
			setProfileFile(file);
			setPreviewProfile(URL.createObjectURL(file));
		}
	}

	// Handle cover photo upload  
	function handleCoverFileInput(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (file) {
			setCoverFile(file);
			setPreviewCover(URL.createObjectURL(file));
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-black text-white hover:bg-black/80">
					Editar estabelecimento
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
							<StoreIcon className="w-6 h-6 text-blue-500" />
							Editar Estabelecimento
						</h2>
					</div>

					{/* Cover Photo */}
					<div>
						<Label className="mb-2 block font-semibold">Foto de Capa</Label>
						<div className="flex items-center gap-4">
							<label className="relative cursor-pointer group">
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleCoverFileInput}
								/>
								<div className="w-40 h-20 bg-gray-200 rounded-md flex items-center justify-center border border-gray-300 overflow-hidden hover:opacity-80 transition-all shadow-sm">
									{previewCover ? (
										<img
											src={previewCover}
											alt="Capa"
											className="object-cover w-full h-full"
										/>
									) : (
										<CameraIcon className="w-8 h-8 text-gray-400" />
									)}
								</div>
								<span className="absolute -bottom-8 left-0 bg-white px-2 py-1 rounded-md text-xs shadow opacity-0 group-hover:opacity-100 transition text-center whitespace-nowrap">
									Selecionar capa
								</span>
							</label>
						</div>
					</div>

					{/* Profile Photo */}
					<div>
						<Label className="mb-2 block font-semibold">Foto de Perfil</Label>
						<div className="flex items-center gap-4">
							<label className="relative cursor-pointer group">
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleProfileFileInput}
								/>
								<div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300 overflow-hidden hover:opacity-80 transition-all shadow-sm">
									{previewProfile ? (
										<img
											src={previewProfile}
											alt="Perfil"
											className="object-cover w-full h-full"
										/>
									) : (
										<ImageIcon className="w-8 h-8 text-gray-400" />
									)}
								</div>
								<span className="absolute -bottom-8 left-0 bg-white px-2 py-1 rounded text-xs shadow opacity-0 group-hover:opacity-100 transition text-center whitespace-nowrap">
									Selecionar perfil
								</span>
							</label>
						</div>
					</div>

					{/* Name */}
					<div>
						<Label htmlFor="nome" className="font-semibold">Nome do estabelecimento</Label>
						<Input
							id="nome"
							{...register('name')}
							placeholder="Ex: Padaria Estrela"
							className="mt-2"
						/>
						{errors.name && (
							<p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
						)}
					</div>

					{/* Description */}
					<div>
						<Label htmlFor="descricao" className="font-semibold">Descrição</Label>
						<Textarea
							id="descricao"
							{...register('description')}
							placeholder="Uma breve descrição do local"
							className="mt-2"
							maxLength={250}
							rows={3}
						/>
						<p className="text-xs text-gray-500 mt-1">
							{watch('description')?.length || 0}/250 caracteres
						</p>
						{errors.description && (
							<p className="text-sm text-red-500 mt-1">
								{errors.description.message}
							</p>
						)}
					</div>

					{/* City */}
					<div>
						<Label htmlFor="cidade" className="flex gap-1 items-center font-semibold">
							<MapPinIcon className="w-4 h-4 text-blue-400" />
							Cidade
						</Label>
						<Input
							id="cidade"
							{...register('city')}
							placeholder="Ex: São Paulo"
							className="mt-2"
						/>
						{errors.city && (
							<p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
						)}
					</div>

					{/* Type */}
					<div>
						<Label htmlFor="type" className="font-semibold">Tipo de estabelecimento</Label>
						<Select
							value={watch('type')}
							onValueChange={(value) =>
								setValue('type', value as FormData['type'], {
									shouldValidate: true,
								})
							}
						>
							<SelectTrigger className={`mt-2 ${errors.type ? 'border-red-400' : ''}`}>
								<SelectValue placeholder="Selecione o tipo..." />
							</SelectTrigger>
							<SelectContent>
								{tiposEstabelecimento.map((tipo) => (
									<SelectItem key={tipo} value={tipo}>
										{tipo}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.type && (
							<p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
						)}
					</div>

					{/* Social Media */}
					<div className="space-y-4">
						<Label className="font-semibold">Redes Sociais</Label>
						
						<div>
							<Label htmlFor="twitter" className="text-sm">Twitter/X</Label>
							<Input
								id="twitter"
								{...register('twitter')}
								placeholder="https://twitter.com/seu_perfil"
								className="mt-1"
							/>
						</div>

						<div>
							<Label htmlFor="instagram" className="text-sm">Instagram</Label>
							<Input
								id="instagram"
								{...register('instagram')}
								placeholder="https://instagram.com/seu_perfil"
								className="mt-1"
							/>
						</div>

						<div>
							<Label htmlFor="facebook" className="text-sm">Facebook</Label>
							<Input
								id="facebook"
								{...register('facebook')}
								placeholder="https://facebook.com/seu_perfil"
								className="mt-1"
							/>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-4 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
							className="flex-1"
							disabled={updateVenueMutation.isPending}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
							disabled={updateVenueMutation.isPending}
						>
							{updateVenueMutation.isPending ? 'Salvando...' : 'Salvar'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}