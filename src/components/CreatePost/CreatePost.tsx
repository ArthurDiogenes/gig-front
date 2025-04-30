'use client';
import { Film, Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { DialogProps } from '@radix-ui/react-dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function CreatePost({ ...props }: DialogProps) {
	return (
		<Dialog {...props}>
			<DialogTrigger asChild>
				<Button className="px-4 py-2 text-white bg-stone-900 rounded hover:bg-stone-700 cursor-pointer">
          Postar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar Post</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<form className="space-y-6">
					<div className="space-y-4">
						<div className="grid gap-2">
							<Label htmlFor="movie-search">Buscar filme</Label>
							<div className="relative">
								<Input
									id="movie-search"
									placeholder="Digite o nome do filme..."
								/>
								<div className="absolute right-0 top-0 h-full flex items-center pr-3">
									<Film className="w-5 h-5 text-card-foreground" />
								</div>
							</div>
						</div>

						<div className="grid gap-2">
							<Label>Filme selecionado</Label>
							<div className="flex items-start p-3 border rounded-lg">
								<div className="w-16 h-24 bg-muted rounded mr-3 flex-shrink-0"></div>
								<div className="flex-1">
									<div className="flex justify-between">
										<h3 className="font-medium">Duna: Parte 2</h3>
										<Button variant="ghost" size="icon" className="h-6 w-6">
											<X className="h-4 w-4" />
										</Button>
									</div>
									<p className="text-sm text-gray-500">
										2024 • Ficção científica • Denis Villeneuve
									</p>
								</div>
							</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="rating">Avaliação</Label>
							<Select defaultValue="5">
								<SelectTrigger>
									<SelectValue placeholder="Selecione uma avaliação" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1">1 estrela</SelectItem>
									<SelectItem value="2">2 estrelas</SelectItem>
									<SelectItem value="3">3 estrelas</SelectItem>
									<SelectItem value="4">4 estrelas</SelectItem>
									<SelectItem value="5">5 estrelas</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="content">Sua opinião sobre o filme</Label>
							<Textarea
								id="content"
								placeholder="Compartilhe seus pensamentos sobre o filme..."
								rows={6}
							/>
						</div>

						<div className="grid gap-2">
							<Label>Adicionar imagem (opcional)</Label>
							<div className="border border-dashed rounded-lg p-8 text-center">
								<div className="flex flex-col items-center">
									<Upload className="w-8 h-8 text-gray-400 mb-2" />
									<p className="text-sm text-gray-500 mb-2">
										Arraste uma imagem ou clique para fazer upload
									</p>
									<Button type='button' variant="outline" size="sm">
										Escolher arquivo
									</Button>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-end space-x-2">
						<Button type='button' variant="outline" onClick={() => props.onOpenChange?.(false)} >
              Cancelar
						</Button>
						<Button type='submit' className="bg-rose-500 hover:bg-rose-600 cursor-pointer">
							Publicar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
