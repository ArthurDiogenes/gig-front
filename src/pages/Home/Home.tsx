import { Link, useNavigate } from "react-router";
import Footer from "../../components/Footer/Footer.tsx";
import { BandCard } from "@/components/BandCardComponent/BandCardComponent.tsx";
import { Button } from "@/components/ui/button.tsx";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar.tsx";
import HomeNavbar from "@/components/Navbar/HomeNavbar.tsx";
import GenreSelector from "@/components/GenreSelector/GenreSelector.tsx";
import api from "@/services/api.ts";
import {
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useMemo, useRef } from "react";
import useIntersectObserver from "@/hooks/useIntersectObserver.tsx";
import PostsError from "./Error.tsx";
import EmptyPosts from "./Empty.tsx";
import { useSession } from "@/hooks/useSession.tsx";
import Post from "@/components/Post/index.tsx";
import { getUser } from "@/services/users/index.ts";

export type PostType = {
  id: number;
  content: string;
  imageUrl: string;
  createdAt: string;
  likesCount: number;
  user: {
    id: number;
    name: string;
  };
  isLiked: boolean;
  commentsCount: number;
};

export type PaginatedPost = {
  posts: PostType[];
  page: number;
  hasNextPage: boolean;
  totalPages: number;
  limit: number;
};

type FeaturedBand = {
  averageRating: number;
  bandId: number;
  bandName: string;
  userId: string;
};

export default function Home() {
  const navigate = useNavigate();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const user = getUser();

  const {
    data,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedPost>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<PaginatedPost>(`/posts?page=${pageParam}`);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedPost): number | undefined =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  const { data: session } = useSession();

  const { data: featuredBands } = useQuery({
    queryKey: ["featuredBands"],
    queryFn: async () => {
      const response = await api.get<FeaturedBand[]>("/bands/featured");
      return response.data;
    },
  });


  useIntersectObserver({
    target: sentinelRef as React.RefObject<HTMLElement>,
    hasNextPage: hasNextPage,
    fetchNextPage: fetchNextPage,
  });

  const groupedPosts = useMemo(() => {
    return data?.pages.reduce((acc: PostType[], page) => {
      return [...acc, ...page.posts];
    }, []);
  }, [data?.pages]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <HomeNavbar />

      <main className="container grid grid-cols-1 gap-8 px-6 py-8 mx-auto md:grid-cols-3 lg:grid-cols-4 flex-1 max-w-7xl">
        <div className="hidden md:block">
          {/* Perfil */}
          <div className="sticky top-[94px] space-y-6">
            {user ? (
              <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1">
                <h2 className="mb-6 text-lg text-slate-800 font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Seu Perfil
                </h2>
                <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-slate-50/80 to-slate-100/80 rounded-xl border border-slate-200/50">
                  <UserAvatar
                    user={{
                      name: user.name,
                      image:
                        user.avatar ?? "/placeholder.svg?height=48&width=48",
                    }}
                    className="w-12 h-12 ring-2 ring-white shadow-lg"
                  />
                  <div>
                    <p className="font-semibold text-slate-800">{user.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center mb-6">
                  <div className="p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
                    <p className="font-bold text-lg text-slate-800">245</p>
                    <p className="text-xs text-slate-600 font-medium">
                      Seguidores
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50/60 rounded-lg border border-slate-200/40">
                    <p className="font-bold text-lg text-slate-800">123</p>
                    <p className="text-xs text-slate-600 font-medium">
                      Seguindo
                    </p>
                  </div>
                </div>
                <Link
                  to={
                    user.role === "band"
                      ? `bandas/${user.id}`
                      : `perfil-estabelecimento`
                  }
                >
                  <Button className="w-full bg-black hover:bg-stone-900 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5">
                    Ver perfil
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1">
                <h2 className="mb-4 text-lg font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Faça login para uma melhor experiência
                </h2>
                <p className="mb-6 text-sm text-slate-600 leading-relaxed">
                  Acesse sua conta para visualizar seu perfil e interagir com a
                  comunidade.
                </p>
                <Link to="/login">
                  <Button className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="col-span-1 space-y-8 md:col-span-2 h-full">
          <div className="space-y-8">
            {isFetching && !data ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5"
                >
                  <Skeleton className="w-full h-[200px] mb-4 rounded-xl" />
                </div>
              ))
            ) : isError ? (
              <PostsError />
            ) : groupedPosts?.length === 0 ? (
              <EmptyPosts />
            ) : (
              groupedPosts?.map((post) => (
                <Post 
                  key={post.id}
                  post={post}
                  isLiked={session ? session.likedPosts.includes(post.id) : false} />
              ))
            )}
            {/* Sentinela para o scroll infinito */}
            {hasNextPage && <div ref={sentinelRef} className="h-[1px]" />}

            {isFetchingNextPage && (
              <div className="flex flex-col space-y-4">
                <div className="w-full p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5">
                  <Skeleton className="w-full h-[200px] rounded-xl" />
                </div>
                <div className="w-full p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5">
                  <Skeleton className="w-full h-[200px] rounded-xl" />
                </div>
                <div className="w-full p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5">
                  <Skeleton className="w-full h-[200px] rounded-xl" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bandas Populares */}
        <div className="hidden lg:block">
          <div className="sticky top-[94px] space-y-6">
            <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1">
              <h2 className="!mt-0 !mb-6 text-lg text-slate-800 font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Bandas populares
              </h2>
              <div className="space-y-4">
                {featuredBands?.map((band) => (
                  <BandCard
                    key={band.bandId}
                    band={{
                      id: band.userId,
                      title: band.bandName,
                      image: "/placeholder.svg?height=200&width=150",
                      rating: band.averageRating,
                    }}
                    compact
                  />
                ))}
              </div>
              <Button
                asChild
                className="w-full mt-6 bg-black hover:bg-stone-900 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
              >
                <Link to="/pesquisa">Ver mais bandas</Link>
              </Button>
            </div>

            <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1">
              <h2 className="!mt-0 !mb-6 text-lg text-slate-800 font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
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
