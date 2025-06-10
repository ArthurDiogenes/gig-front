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
import { DialogProps } from '@radix-ui/react-dialog';

const schema = z.object({
	name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
	description: z
		.string()
		.max(250, 'Descrição máxima de 250 caracteres')
		.optional(),
	city: z.string().min(2, 'Cidade obrigatória'),
	type: z.enum(
		['Restaurante', 'Cafeteria', 'Loja', 'Padaria', 'Mercado', 'Outro'],
		{
			required_error: 'Selecione o tipo de estabelecimento',
		}
	),
	profilePhoto: z
		.instanceof(File)
		.optional()
		.or(z.any().refine((v) => typeof v === 'string', { message: '' })),
	coverPhoto: z
		.instanceof(File)
		.optional()
		.or(z.any().refine((v) => typeof v === 'string', { message: '' })),
	socials: z.object({
		instagram: z.string().url('URL inválida').optional().or(z.literal('')),
		facebook: z.string().url('URL inválida').optional().or(z.literal('')),
		linkedin: z.string().url('URL inválida').optional().or(z.literal('')),
		twitter: z.string().url('URL inválida').optional().or(z.literal('')),
	}),
});

type FormData = z.infer<typeof schema>;

const tiposEstabelecimento = [
	'Restaurante',
	'Cafeteria',
	'Loja',
	'Padaria',
	'Mercado',
	'Outro',
];

export default function EditarEstabelecimento({...props }: DialogProps) {
	const [previewProfile, setPreviewProfile] = useState<string | null>(null);
	const [previewCover, setPreviewCover] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		// reset,
		watch,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			socials: {
				instagram: '',
				facebook: '',
				linkedin: '',
				twitter: '',
			},
		},
	});

	const profilePhoto = watch('profilePhoto');
	const coverPhoto = watch('coverPhoto');

	useEffect(() => {
		if (profilePhoto && profilePhoto instanceof File) {
			setPreviewProfile(URL.createObjectURL(profilePhoto));
		} else if (!profilePhoto) {
			setPreviewProfile(null);
		}
	}, [profilePhoto]);

	useEffect(() => {
		if (coverPhoto && coverPhoto instanceof File) {
			setPreviewCover(URL.createObjectURL(coverPhoto));
		} else if (!coverPhoto) {
			setPreviewCover(null);
		}
	}, [coverPhoto]);

	const onSubmit = async (data: FormData) => {
		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('description', data.description || '');
		formData.append('city', data.city);
		formData.append('type', data.type);
		formData.append('socials', JSON.stringify(data.socials));

		if (data.profilePhoto instanceof File) {
			formData.append('profilePhoto', data.profilePhoto);
		}

		if (data.coverPhoto instanceof File) {
			formData.append('coverPhoto', data.coverPhoto);
		}

		for (const [key, value] of formData.entries()) {
			console.log(`${key}:`, value);
		}

		try {
			await api.patch(
				`/venues/cf6e56dd-4920-4cf3-b493-bcc409e98192`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			// reset();
			// setPreviewProfile(null);
			// setPreviewCover(null);
		} catch (error) {
			toast.error('Erro ao atualizar o perfil');
			console.error('Error submitting form:', error);
		}
	};

	// para permitir upload usando input file e registrar no estado react-hook-form
	function handleFileInput(
		event: React.ChangeEvent<HTMLInputElement>,
		field: 'profilePhoto' | 'coverPhoto'
	) {
		const file = event.target.files && event.target.files[0];
		if (file) setValue(field, file, { shouldValidate: true });
	}
	return (
		<Dialog {...props}>
			<DialogTrigger className="bg-black text-white hover:bg-black/80 py-2 px-4 rounded-sm cursor-pointer ">
				Editar estabelecimento
			</DialogTrigger>
			<DialogContent className="h-min px-0">
				<form
					className="bg-white rounded-md shadow-lg px-8 py-10 mt-8 mb-10 flex flex-col gap-8"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h2 className="text-2xl font-bold mb-2 text-primary flex items-center gap-2">
						<StoreIcon className="w-6 h-6 text-purple-500" />
						Cadastrar Estabelecimento
					</h2>

					{/* Foto de capa */}
					<div>
						<Label className="mb-1 block">Foto de Capa</Label>
						<div className="flex items-center gap-4">
							<label className="relative cursor-pointer group">
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={(e) => handleFileInput(e, 'coverPhoto')}
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
								<span className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-md text-xs shadow opacity-0 group-hover:opacity-100 transition">
									Selecionar capa
								</span>
							</label>
							{errors.coverPhoto && (
								<span className="text-sm text-red-500">
									{errors.coverPhoto.message}
								</span>
							)}
						</div>
					</div>

					{/* Foto de perfil */}
					<div>
						<Label className="mb-1 block">Foto de Perfil</Label>
						<div className="flex items-center gap-4">
							<label className="relative cursor-pointer group">
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={(e) => handleFileInput(e, 'profilePhoto')}
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
								<span className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs shadow opacity-0 group-hover:opacity-100 transition">
									Selecionar perfil
								</span>
							</label>
							{errors.profilePhoto && (
								<span className="text-sm text-red-500">
									{errors.profilePhoto.message}
								</span>
							)}
						</div>
					</div>

					{/* Nome */}
					<div>
						<Label htmlFor="nome">Nome do estabelecimento</Label>
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

					{/* Descrição */}
					<div>
						<Label htmlFor="descricao">Descrição</Label>
						<Input
							id="descricao"
							{...register('description')}
							placeholder="Uma breve descrição do local"
							className="mt-2"
							maxLength={250}
						/>
						{errors.description && (
							<p className="text-sm text-red-500 mt-1">
								{errors.description.message}
							</p>
						)}
					</div>

					{/* Cidade */}
					<div>
						<Label htmlFor="cidade" className="flex gap-1 items-center">
							<MapPinIcon className="w-4 h-4 text-purple-400" />
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

					{/* Tipo de Estabelecimento */}
					<div>
						<Label htmlFor="type">Tipo de estabelecimento</Label>
						<Select
							onValueChange={(v) =>
								setValue('type', v as FormData['type'], {
									shouldValidate: true,
								})
							}
						>
							<SelectTrigger className={errors.type ? 'border-red-400' : ''}>
								<SelectValue placeholder="Selecione o tipo..." />
							</SelectTrigger>
							<SelectContent className="z-50 bg-white">
								{tiposEstabelecimento.map((tp) => (
									<SelectItem key={tp} value={tp}>
										{tp}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.type && (
							<p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
						)}
					</div>

					{/* Redes sociais */}
					<div>
						<Label>Redes Sociais</Label>
						<div className="mt-2 grid gap-2">
							{/* <SocialLinksInput register={register} errors={errors} /> */}
						</div>
					</div>

					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => props.onOpenChange?.(false)}
							className="w-full bg-primary text-white mt-6 hover:bg-purple-700 transition font-semibold text-lg py-4"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="w-full bg-primary text-white mt-6 hover:bg-purple-700 transition font-semibold text-lg py-4"
						>
							Salvar
						</button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
