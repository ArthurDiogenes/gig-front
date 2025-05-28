import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import api from "@/services/api";
import { Post } from "@/types/post";
import { getUser } from "@/services/users";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MessageSquareIcon } from "lucide-react";
import CommentForm from "./form";
import Comment from "./comment-item";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function PostComments({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const user = getUser();

  const { mutate: addCommentMutation, isPending } = useMutation({
    mutationFn: async (comment: string) => {
      await api.post(`/comments`, {
        comment,
        userId: user.id,
        postId: id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", id],
      });
    },
    onError: (error: AxiosError) => {
      toast.error("Erro ao adicionar comentário. Tente novamente mais tarde.");
      console.error("Erro ao adicionar comentário:", error);
    },
  });

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await api.get<Post>(`/posts/${id}`);
      return data;
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          💬 {post?.comments.length} comentários
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <Card className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquareIcon className="w-5 h-5 text-blue-600" />
              Comentários ({post?.comments.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <CommentForm onSubmit={addCommentMutation} isSubmitting={isPending} />

            {post?.comments && post.comments.length > 0 ? (
              <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                {post.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    author={comment.user}
                    content={comment.comment}
                    createdAt={comment.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquareIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Ainda não há comentários.</p>
                <p className="text-sm">Seja o primeiro a comentar!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
