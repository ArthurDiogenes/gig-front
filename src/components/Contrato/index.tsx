import { BandProfileType } from '@/pages/BandProfile/BandProfile';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '@/services/api';

export type ContractDTO = {
	eventName: string;
	eventDate: Date;
	startTime: string;
	endTime: string;
	eventType: string;
	budget: number;
	additionalDetails?: string;
	isConfirmed?: boolean;
	requesterId: string;
	providerId: number;
};

const formSchema = z.object({
	eventName: z.string().min(1, {
		message: 'Por favor informe o nome do evento.',
	}),
	data: z.date({
		required_error: 'Por favor selecione uma data.',
	}),
	horarioInicial: z.string().min(1, {
		message: 'Por favor selecione um horário inicial.',
	}),
	horarioFinal: z.string().min(1, {
		message: 'Por favor selecione um horário final.',
	}),
	tipoEvento: z.string().min(1, {
		message: 'Por favor selecione o tipo de evento.',
	}),
	orcamento: z.string().min(1, {
		message: 'Por favor informe o orçamento.',
	}),
	detalhes: z.string().optional(),
	isConfirmed: z.boolean().optional(),
});

export default function HireBandForm({ band }: { band: BandProfileType }) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [open]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			eventName: '',
			data: new Date(),
			horarioInicial: '00:00',
			horarioFinal: '00:00',
			tipoEvento: '',
			orcamento: '0,00',
		},
	});

	const handleOpen = () => {
		const token = sessionStorage.getItem('token');
		if (!token) redirect('/login');
		setOpen(true);
	};

	const { mutate: submitContract } = useMutation({
		mutationFn: async (data: ContractDTO) => {
			// Aqui você pode implementar a lógica para enviar a proposta
			await api.post('/contract', data);
			console.log('Dados enviados:', data);
		},
		onSuccess: () => {
			// Aqui você pode implementar a lógica para lidar com o sucesso do envio
			toast.success('Proposta enviada com sucesso!');
			console.log('Proposta enviada com sucesso!');
		},
		onError: (error) => {
			// Aqui você pode implementar a lógica para lidar com erros
			toast.error('Erro ao enviar proposta. Tente novamente.');
			console.error('Erro ao enviar proposta:', error);
		},
		onSettled: () => {
			// Aqui você pode implementar a lógica para lidar com o estado final
			setOpen(false);
			console.log('Proposta enviada.');
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Transformar os dados para o formato do DTO
		const dtoData = {
			eventName: values.eventName,
			eventDate: values.data,
			startTime: values.horarioInicial,
			endTime: values.horarioFinal,
			eventType: values.tipoEvento,
			budget: Number.parseFloat(
				values.orcamento.replace('.', '').replace(',', '.')
			),
			additionalDetails: values.detalhes,
			isConfirmed: values.isConfirmed,
			requesterId: 'cf6e56dd-4920-4cf3-b493-bcc409e98192', // UUID padrão
			providerId: band.id, // ID da banda
		};

		console.log('Dados do formulário:', values);
		console.log('Dados para envio (DTO):', dtoData);
		submitContract(dtoData);
	}

	const tiposDeEvento = [
		'Show',
		'Festival',
		'Casamento',
		'Aniversário',
		'Evento Corporativo',
		'Outro',
	];

	return (
		<>
			{open && (
				<div
					data-state="open"
					className={cn(
						'fixed overflow-y-auto inset-0 z-50 bg-black/80 backdrop-blur-sm',
						'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
					)}
					style={{ pointerEvents: 'auto' }}
					data-aria-hidden="true"
					aria-hidden="true"
					onClick={() => setOpen(false)}
				/>
			)}
			<Button type='button' onClick={handleOpen}>Contratar</Button>
			<Dialog open={open} onOpenChange={setOpen} modal={false}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle className="text-3xl font-bold">
							Contratar {band.name}
						</DialogTitle>
						<DialogDescription className="text-base text-gray-500">
							Preencha os detalhes abaixo para enviar uma proposta para esta
							banda/músico.
						</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Nome do Evento */}
							<FormField
								control={form.control}
								name="eventName"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="text-lg font-medium">
											Nome do Evento
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Digite o nome do evento"
												className=""
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Data do Evento */}
							<FormField
								control={form.control}
								name="data"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="text-lg font-medium">
											Data do Evento
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														className={cn(
															'pl-3 text-left font-normal ',
															!field.value && 'text-muted-foreground'
														)}
													>
														<CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
														{field.value ? (
															format(field.value, 'PPP', { locale: ptBR })
														) : (
															<span>Selecione uma data</span>
														)}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													initialFocus
													locale={ptBR}
												/>
											</PopoverContent>
										</Popover>
									</FormItem>
								)}
							/>

							{/* Horários */}
							<div className="grid grid-cols-2 gap-4">
								{/* Horário Inicial */}
								<FormField
									control={form.control}
									name="horarioInicial"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg font-medium">
												Horário Inicial
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input {...field} type="time" className=" pl-3" />
												</div>
											</FormControl>
										</FormItem>
									)}
								/>

								{/* Horário Final */}
								<FormField
									control={form.control}
									name="horarioFinal"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg font-medium">
												Horário Final
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input {...field} type="time" className=" pl-3" />
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							{/* Tipo de Evento */}
							<FormField
								control={form.control}
								name="tipoEvento"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg font-medium">
											Tipo de Evento
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="">
													<SelectValue placeholder="Selecione o tipo de evento" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{tiposDeEvento.map((tipo) => (
													<SelectItem key={tipo} value={tipo}>
														{tipo}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							{/* Orçamento */}
							<FormField
								control={form.control}
								name="orcamento"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg font-medium">
											Orçamento (R$)
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className=" border-2 border-purple-200 focus:border-purple-400"
												onChange={(e) => {
													// Formata o valor para moeda
													const value = e.target.value.replace(/\D/g, '');
													const formattedValue = (
														Number(value) / 100
													).toLocaleString('pt-BR', {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													});
													field.onChange(formattedValue);
												}}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Detalhes adicionais */}
							<FormField
								control={form.control}
								name="detalhes"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg font-medium">
											Detalhes adicionais
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Compartilhe mais informações sobre o evento..."
												className="min-h-[120px] resize-none"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full text-lg font-medium"
							>
								Enviar Proposta
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
}
