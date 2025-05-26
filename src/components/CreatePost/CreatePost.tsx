"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingIcon } from "@/utils/icons";
import { createPost } from "@/services/posts";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";
import { User } from "@/types/user";
import { getUser } from "@/services/users";

export default function CreatePost() {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const content = formData.get("content") as string;

      if (!content) {
        toast.warning("Conteúdo do post não pode ser vazio.");
        return;
      }

      const user: User = getUser();
      formData.append("authorId", user.id);

      await createPost(formData);
    },
    onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
      toast.success("Post criado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar o post. Tente novamente.");
      console.error(error);
    },
    onSettled: () => {
      setFile(null);
      setPreview(null);
      setOpen(false);
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
      alert("Por favor, selecione uma imagem válida.");
    }
  }

  const closeDialog = () => {
    setFile(null);
    setPreview(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Postar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => createPostMutation(e)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Textarea
                id="content"
                name="content"
                placeholder="Compartilhe seus pensamentos..."
                rows={4}
                className="resize-none h-24 placeholder:text-gray-700"
              />
            </div>

            <div className="grid gap-2">
              <div className="h-[200px] my-4 relative border border-dashed rounded-md">
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="image"
                  className=" relative z-10 cursor-pointer h-full opacity-0"
                  onChange={handleFileChange}
                  multiple={false}
                />
                <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  {file ? (
                    <img
                      src={preview || ""}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <Upload className="w-8 h-8 opacity-50 mb-4" />
                      <span className="text-sm text-center text-gray-700 px-2">
                        Arraste ou clique aqui para adicionar uma imagem. O
                        arquivo deve estar no formato .png, .jpg ou .jpeg.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              disabled={isPending}
              onClick={() => closeDialog()}
            >
              Cancelar
            </Button>
            <Button
              className="bg-stone-900 hover:bg-stone-600 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? <LoadingIcon /> : "Publicar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
