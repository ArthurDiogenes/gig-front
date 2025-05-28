import { BandProfileType } from "@/pages/BandProfile/BandProfile";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@/services/api";
import { Rating } from "../ui/rating";

export type ReviewDto = {
  comment: string;
  rating: number;
  bandId: number;
  venueId: string;
};

const formSchema = z.object({
  comment: z.string().min(1, {
    message: "Por favor informe o comentário.",
  }),
  rating: z.number().min(1).max(5),
  bandId: z.number().min(1),
  venueId: z.string().uuid(),
});

export default function Review({ band }: { band: BandProfileType }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      rating: 5,
      bandId: band.id,
      venueId: "",
    },
  });

  const handleOpen = () => {
    const token = sessionStorage.getItem("token");
    if (!token) redirect("/login");
    setOpen(true);
  };

  const { mutate: submitContract } = useMutation({
    mutationFn: async (data: ReviewDto) => {
      // Aqui você pode implementar a lógica para enviar a proposta
      await api.post("/reviews", data);
      console.log("Dados enviados:", data);
    },
    onSuccess: () => {
      // Aqui você pode implementar a lógica para lidar com o sucesso do envio
      toast.success("Avaliação enviada com sucesso!");
      console.log("Avaliação enviada com sucesso!");
    },
    onError: (error) => {
      // Aqui você pode implementar a lógica para lidar com erros
      toast.error("Erro ao enviar avaliação. Tente novamente.");
      console.error("Erro ao enviar avaliação:", error);
    },
    onSettled: () => {
      // Aqui você pode implementar a lógica para lidar com o estado final
      setOpen(false);
      console.log("Avaliação enviada.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Transformar os dados para o formato do DTO
    const dtoData = {
      comment: values.comment,
      rating: values.rating,
      bandId: values.bandId,
      venueId: values.venueId,
    };

    console.log("Dados do formulário:", values);
    console.log("Dados para envio (DTO):", dtoData);
    submitContract(dtoData);
  }

  return (
    <>
      {open && (
        <div
          data-state="open"
          className={cn(
            "fixed overflow-y-auto inset-0 z-50 bg-black/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
          style={{ pointerEvents: "auto" }}
          data-aria-hidden="true"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
      <Button type="button" onClick={handleOpen}>
        Avalie
      </Button>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Avalie {band.name}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-500">
              Preencha os detalhes abaixo para enviar uma avaliação para esta
              banda/músico.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Nome do Evento */}

              {/* Detalhes adicionais */}
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Digite aqui o que você achou do evento
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Avaliação..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2 items-center">
                <p>Qual sua nota para a banda?</p>
                <Rating
                  value={rating}
                  onChange={(value) => setRating(value)}
                  size="lg"
                />
              </div>

              <Button type="submit" className="w-full text-lg font-medium">
                Enviar Avaliação
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
