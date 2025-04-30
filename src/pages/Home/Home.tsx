import { Link, useNavigate } from 'react-router';
import Footer from '../../components/Footer/Footer.tsx';
import { MovieCard } from '@/components/MovieCard/MovieCard.tsx';
import { Button } from '@/components/ui/button.tsx';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Search } from 'lucide-react';
import CreatePost from '@/components/CreatePost/CreatePost.tsx';
import GenreSelector from '@/components/GenreSelector/GenreSelector.tsx';


export default function Home() {

    const navigate = useNavigate();

    return (
            <div className="min-h-screen bg-background">
                <header className="sticky top-0 z-10 bg-background border-b">
                    <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                        <Link to="/" className="text-xl font-bold text-rose-600">
                            <img src='/images/logo-gig 2.svg' alt='Gig Logo' className="h-[30px] w-auto ml-4" />
                        </Link>
                        <div className="relative w-full max-w-md mx-4">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Buscar bandas..." className="pl-8" />
                        </div>
                        <div className="flex items-center gap-4">
                            <CreatePost />
                            <Link to="/perfil" className="cursor-pointer">
                                <UserAvatar
                                    user={{
                                        name: 'Xand Avião',
                                        image: '/placeholder.svg?height=32&width=32',
                                    }}
                                    className="w-8 h-8"
                                />
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="container grid grid-cols-1 gap-6 px-4 py-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
                    <div className="hidden md:block">
                        <div className="sticky top-20 space-y-4">
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
                                <Button className="w-full mt-4 bg-stone-900 hover:bg-stone-700 cursor-pointer">
                                    <Link to="/perfil">Ver perfil</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 space-y-6 md:col-span-2">

                        <div className="space-y-6">
                            {[1, 2].map((post) => (
                                <div key={post} className="p-4 bg-card border rounded-lg shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <UserAvatar
                                            user={{
                                                name: `Usuário ${post}`,
                                                image: `/placeholder.svg?height=40&width=40`,
                                            }}
                                            className="w-10 h-10"
                                        />
                                        <div>
                                            <p className="font-medium">Carlos Mendes</p>
                                            <p className="text-xs text-muted-foreground">Há 2 horas</p>
                                        </div>
                                    </div>
                                    <p className="mb-4">
                                        Show no Allianz Park foi incrível! A energia da banda estava contagiante e a
                                        plateia vibrou do início ao fim. Mal posso esperar para o próximo show!
                                        A iluminação e os efeitos visuais estavam de tirar o fôlego.
                                    </p>
                                    <div className="mb-4 overflow-hidden rounded-lg">
                                        <img
                                            src="/placeholder.svg?height=300&width=600"
                                            alt="Foto do post"
                                            className="object-cover w-full h-64"
                                            width={600}
                                            height={300}
                                        />
                                    </div>
                                    <div className="flex gap-4 mb-4">
                                        <Button variant="ghost" size="sm">
                                            ❤️ 42 curtidas
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            💬 18 comentários
                                        </Button>
                                    </div>
                                    <div className="pt-4 mt-4 border-t">
                                        <div className="mb-4 space-y-4">
                                            <div className="flex gap-2">
                                                <UserAvatar
                                                    user={{
                                                        name: 'Comentarista',
                                                        image: '/placeholder.svg?height=32&width=32',
                                                    }}
                                                    className="w-8 h-8"
                                                />
                                                <div className="flex-1 p-2 bg-muted rounded-lg">
                                                    <p className="text-sm text-muted-foreground font-medium">
                                                        Ana Souza
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Concordo totalmente! A trilha sonora do Hans Zimmer é
                                                        simplesmente perfeita.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <UserAvatar
                                                user={{
                                                    name: 'Você',
                                                    image: '/placeholder.svg?height=32&width=32',
                                                }}
                                                className="w-8 h-8"
                                            />
                                            <Input
                                                placeholder="Escreva um comentário..."
                                                className="flex-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="sticky top-20 space-y-4">
                            <div className="p-4 bg-card border rounded-lg shadow">
                                <h2 className="!mt-0 !mb-4 text-lg text-card-foreground font-semibold">
                                    Bandas populares
                                </h2>
                                <div className="space-y-4">
                                    {[1, 2].map(() => (
                                        <MovieCard
                                            key={1}
                                            movie={{
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
                                <Button asChild className="w-full mt-4 bg-stone-900 hover:bg-stone-700" >
                                    <Link to="/bandas">Ver mais bandas</Link>
                                </Button>
                            </div>

                            <div className="p-4 py-2 bg-card border rounded-lg shadow">
                                <h2 className="!mt-0 !mb-4 text-lg text-card-foreground font-semibold">
                                    Categorias
                                </h2>
                                <GenreSelector onGenreSelect={(genero) => navigate(`/genero/${genero.toLowerCase()}`)} />
                            </div>
                        </div>
                    </div>
                </main>
            <Footer />
            </div>
    );
}
