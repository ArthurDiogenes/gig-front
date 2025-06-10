import { PickFilledIcon, PickOutlinedIcon } from "@/utils/icons";
import PostComments from "../Comments";
import { Button } from "../ui/button";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PaginatedPost, PostType } from "@/pages/Home/Home";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/services/api";
import { useState } from "react";

export default function Post({
  post,
  isLiked = false,
}: {
  post: PostType;
  isLiked: boolean;
}) {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(isLiked);

  const updatePostInCache = (delta: number, newLiked: boolean) => {
    queryClient.setQueryData(['posts'], (oldData: {
      pages: PaginatedPost[]
      pageParams: number[]
    }) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pages: oldData.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((p: PostType) =>
            p.id === post.id
              ? {
                  ...p,
                  likesCount: p.likesCount + delta,
                }
              : p
          ),
        })),
      };
    });

    setLiked(newLiked);
  };

  const { mutate: likePostMutation } = useMutation({
    mutationFn: async (postId: number) => {
      const response = await api.post(`/likes/${postId}`);
      return response.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      updatePostInCache(1, true);
    },
    onError: (error) => {
      updatePostInCache(-1, false);  // rollback
      if (error instanceof AxiosError) {
        toast.error(
          "Erro ao curtir o post: " +
            (error.response?.data.message || "Erro desconhecido")
        );
      }
      console.error("Erro ao curtir o post:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const { mutate: unlikePostMutation } = useMutation({
    mutationFn: async (postId: number) => {
      const response = await api.delete(`/likes/${postId}`);
      return response.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      updatePostInCache(-1, false);
    },
    onError: (error) => {
      updatePostInCache(1, true);
      if (error instanceof AxiosError) {
        toast.error(
          "Erro ao descurtir o post: " +
            (error.response?.data.message || "Erro desconhecido")
        );
      }
      console.error("Erro ao descurtir o post:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const toggleLike = () => {
    setLiked(!liked);
    if (liked) {
      unlikePostMutation(post.id);
    } else {
      likePostMutation(post.id);
    }
  };
  
  return (
    <div
      key={post.id}
      className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1"
    >
      <div className="flex items-center gap-4 mb-6">
        <UserAvatar
          user={{
            name: post.user?.name ?? "",
            image: post.user.avatar ?? `/placeholder.svg?height=40&width=40`,
          }}
          className="w-10 h-10 ring-2 ring-white shadow-md"
        />
        <div>
          <Link
            to={`/bandas/${post.user.id}`}
            className="text-lg font-semibold text-slate-800 hover:text-slate-600 transition-colors duration-200"
          >
            {post.user?.name}
          </Link>
          <p className="text-sm text-slate-500 font-medium">Há 2 horas</p>
        </div>
      </div>
      <p className="mb-6 text-slate-700 leading-relaxed">{post.content}</p>
      <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
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
      <div className="flex gap-6 pt-4 border-t border-slate-200/60">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-slate-100/80 transition-all duration-200 rounded-lg"
          onClick={toggleLike}
        >
          {liked ? (
            <PickFilledIcon
              style={{
                color: "#ff0047",
              }}
            />
          ) : (
            <PickOutlinedIcon
              style={{
                color: "#ff0047",
              }}
            />
          )}{" "}
          {post.likesCount} curtidas
        </Button>
        <PostComments id={post.id} />
      </div>
    </div>
  );
}
