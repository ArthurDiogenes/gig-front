import { Link, useNavigate } from 'react-router';
import Footer from '../../components/Footer/Footer.tsx';
import { BandCard } from '@/components/BandCardComponent/BandCardComponent.tsx';
import { Button } from '@/components/ui/button.tsx';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import HomeNavbar from '@/components/Navbar/HomeNavbar.tsx';
import GenreSelector from '@/components/GenreSelector/GenreSelector.tsx';
import api from '@/services/api.ts';
import { useQuery } from '@tanstack/react-query';

type Post = {
	id: number;
	content: string;
	image_file: string;
	createdAt: string;
	likes: number;
	author: {
		id: number;
		bandName: string;
	};
  comments_count: number;
};

type PaginatedPost = {
  posts: Post[];
  page: number;
  limit: number;
  total: number;
}

export default function Home() {
	const navigate = useNavigate();

	const { data, isError, isFetching } = useQuery<PaginatedPost>({
		queryKey: ['posts'],
		queryFn: async () => {
			const { data } = await api.get('/posts');
			return data;
		},
	});

	if (isFetching) return <div>Loading...</div>;

	if (isError) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-background">
				<p className="text-red-500">Erro ao carregar os posts.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<HomeNavbar />

			<main className="container grid grid-cols-1 gap-6 px-4 py-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
				<div className="hidden md:block">
					<div className="sticky top-[94px] space-y-4">
						<div className="p-4 bg-card border rounded-lg shadow">
							<h2 className="!mt-0 !mb-4 text-lg text-card-foreg font-semibold">
								Seu Perfil
							</h2>
							<div className="flex items-center gap-3 mb-4">
								<UserAvatar
									user={{
										name: 'Xand Aviao',
										image: '/placeholder.svg?height=48&width=48',
									}}
									className="w-12 h-12"
								/>
								<div>
									<p className="font-medium !m-0">Xand Avião</p>
									<p className="text-sm text-muted-foreground">@xandaviao</p>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-2 text-center">
								<div>
									<p className="font-medium">245</p>
									<p className="text-xs text-muted-foreground">Seguidores</p>
								</div>
								<div>
									<p className="font-medium">123</p>
									<p className="text-xs text-muted-foreground">Seguindo</p>
								</div>
							</div>
							<Link to="/perfil">
								<Button className="w-full mt-4 bg-stone-900 hover:bg-stone-700 cursor-pointer">
									Ver perfil
								</Button>
							</Link>
						</div>
					</div>
				</div>

				<div className="col-span-1 space-y-6 md:col-span-2">
					<div className="space-y-6">
						{data?.posts.map((post) => (
							<div
								key={post.id}
								className="p-4 bg-card border rounded-lg shadow"
							>
								<div className="flex items-center gap-3 mb-4">
									<UserAvatar
										user={{
											name: post.author.bandName,
											image: `/placeholder.svg?height=40&width=40`,
										}}
										className="w-10 h-10"
									/>
									<div>
										<p className="text-lg font-medium">{post.author.bandName}</p>
										<p className="text-sm text-muted-foreground">Há 2 horas</p>
									</div>
								</div>
								<p className="mb-4">
									{post.content}
								</p>
								<div className="mb-4 overflow-hidden rounded-lg">
									{post.image_file && (
										<img
											src="/placeholder.svg?height=300&width=600"
											alt="Foto do post"
											className="object-cover w-full h-64"
											width={600}
											height={300}
										/>
									)}
								</div>
								<div className="flex gap-4 mb-4">
									<Button variant="ghost" size="sm">
                  🎸 {post.likes} curtidas
									</Button>
									<Button variant="ghost" size="sm">
										💬 {post.comments_count} comentários
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="hidden lg:block">
					<div className="sticky top-[94px] space-y-4">
						<div className="p-4 bg-card border rounded-lg shadow">
							<h2 className="!mt-0 !mb-4 text-lg text-card-foreground font-semibold">
								Bandas populares
							</h2>
							<div className="space-y-4">
								{[1, 2].map((banda) => (
									<BandCard
										key={banda}
										band={{
											id: 1,
											title: 'Banda Exemplo',
											image: '/placeholder.svg?height=200&width=150',
											year: '2001',
											rating: 4.5,
										}}
										compact
									/>
								))}
							</div>
							<Button
								asChild
								className="w-full mt-4 bg-stone-900 hover:bg-stone-700"
							>
								<Link to="/pesquisa">Ver mais bandas</Link>
							</Button>
						</div>

						<div className="p-4 py-2 bg-card border rounded-lg shadow">
							<h2 className="!mt-0 !mb-4 text-lg text-card-foreground font-semibold">
								Categorias
							</h2>
							<GenreSelector
								onGenreSelect={(genero) =>
									navigate(`/genero/${genero.toLowerCase()}`)
								}
							/>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
