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
import { useNavigate } from "react-router-dom"; // ✅ AQUI!
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@/services/api";
import { Rating } from "../ui/rating";
import { getUser } from "@/services/users";

export type ReviewDto = {
  comment: string;
  rating: number;
  bandId: number;
  userId: string;
};

const formSchema = z.object({
  comment: z.string().min(1, {
    message: "Por favor informe o comentário.",
  }),
  rating: z.number().min(1).max(5),
  bandId: z.number().min(1),
  userId: z.string().uuid(),
});

export default function Review({ band }: { band: BandProfileType }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();
  const queryCliente = useQueryClient();

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
      rating: 0,
      bandId: band.id,
      userId: user?.id,
    },
  });

  const handleOpen = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  const { mutate: submitContract } = useMutation({
    mutationFn: async (data: ReviewDto) => {
      await api.post("/reviews", data);
      console.log("Dados enviados:", data);
    },
    onSuccess: () => {
      toast.success("Avaliação enviada com sucesso!");
      console.log("Avaliação enviada com sucesso!");
      queryCliente.invalidateQueries({ queryKey: ["featuredBands"] });
    },
    onError: (error) => {
      toast.error("Erro ao enviar avaliação. Tente novamente.");
      console.error("Erro ao enviar avaliação:", error);
    },
    onSettled: () => {
      setOpen(false);
      console.log("Avaliação enviada.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dtoData: ReviewDto = {
      comment: values.comment,
      rating: values.rating,
      bandId: values.bandId,
      userId: values.userId,
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
        Avaliar
      </Button>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Avaliação {band.bandName}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-500">
              Preencha os detalhes abaixo para enviar uma avaliação para esta
              banda/músico.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="comment"
                render={({ field, fieldState }) => (
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
                    {form.formState.isSubmitted && fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium flex justify-center">
                      Qual sua nota para a banda?
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <Rating
                          value={field.value}
                          onChange={field.onChange}
                          size="lg"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

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
