"use client";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { DialogProps } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
              <Label htmlFor="band-search">Titulo do post</Label>
              <div className="relative">
                <Input id="band-search" placeholder="Titulo..." />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Descrição</Label>
              <Textarea
                id="content"
                placeholder="Compartilhe seus pensamentos..."
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
                  <Button type="button" variant="outline" size="sm">
                    Escolher arquivo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => props.onOpenChange?.(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-stone-900 hover:bg-stone-600 cursor-pointer"
            >
              Publicar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
