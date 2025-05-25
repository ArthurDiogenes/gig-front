import { Link, useNavigate } from "react-router";
import Footer from "../../components/Footer/Footer.tsx";
import { BandCard } from "@/components/BandCardComponent/BandCardComponent.tsx";
import { Button } from "@/components/ui/button.tsx";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar.tsx";
import HomeNavbar from "@/components/Navbar/HomeNavbar.tsx";
import GenreSelector from "@/components/GenreSelector/GenreSelector.tsx";
import api from "@/services/api.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useMemo, useRef } from "react";
import useIntersectObserver from "@/hooks/useIntersectObserver.tsx";
import PostsError from "./Error.tsx";

type Post = {
  id: number;
  content: string;
  imageUrl: string;
  createdAt: string;
  likes: number;
  author: {
    id: number;
    bandName: string;
  };
  commentsCount: number;
};

export type PaginatedPost = {
  posts: Post[];
  page: number;
  hasNextPage: boolean;
  totalPages: number;
  limit: number;
};

export default function Home() {
  const navigate = useNavigate();
  const sentinelRef = useRef<HTMLDivElement>(null);

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await api.get<PaginatedPost>(`/posts?page=${pageParam}`);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedPost): number | undefined =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  useIntersectObserver({
    target: sentinelRef as React.RefObject<HTMLElement>,
    hasNextPage: hasNextPage,
    fetchNextPage: fetchNextPage,
  });

  const groupedPosts = useMemo(() => {
    return data?.pages.reduce((acc: Post[], page) => {
      return [...acc, ...page.posts];
    }, []);
  }, [data?.pages]);

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />

      <main className="container grid grid-cols-1 gap-6 px-4 py-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
        <div className="hidden md:block">
          {/* Perfil */}
          <div className="sticky top-[94px] space-y-4">
            <div className="p-4 bg-card border rounded-lg shadow">
              <h2 className="!mt-0 !mb-4 text-lg text-card-foreg font-semibold">
                Seu Perfil
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <UserAvatar
                  user={{
                    name: "Xand Aviao",
                    image: "/placeholder.svg?height=48&width=48",
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
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="col-span-1 space-y-6 md:col-span-2">
          <div className="space-y-6">
            {isFetching && !data
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-[200px] mb-4" />
                ))
              : isError ? (
                <PostsError />
              ) : (
                groupedPosts?.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-card border rounded-lg shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <UserAvatar
                        user={{
                          name: post.author?.bandName ?? "",
                          image: `/placeholder.svg?height=40&width=40`,
                        }}
                        className="w-10 h-10"
                      />
                      <div>
                        <p className="text-lg font-medium">
                          {post.author?.bandName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Há 2 horas
                        </p>
                      </div>
                    </div>
                    <p className="mb-4">{post.content}</p>
                    <div className="mb-4 overflow-hidden rounded-lg">
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt={`Imagem do post ${post.id}`}
                          className="object-cover w-full h-auto"
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
                        💬 {post.commentsCount} comentários
                      </Button>
                    </div>
                  </div>
                ))
              )}
            {/* Sentinela para o scroll infinito */}
            {hasNextPage && <div ref={sentinelRef} className="h-[1px]" />}
       
            {isFetchingNextPage && (
              <div className="flex flex-col">
                <Skeleton className="w-full h-[200px]" />
                <Skeleton className="w-full h-[200px] my-4" />
                <Skeleton className="w-full h-[200px]" />
              </div>
            )}
          </div>
        </div>

        {/* Bandas Populares */}
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
                      title: "Banda Exemplo",
                      image: "/placeholder.svg?height=200&width=150",
                      year: "2001",
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
