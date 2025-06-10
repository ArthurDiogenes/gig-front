import { BandProfileType } from "@/pages/BandProfile/BandProfile";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@/services/api";
import { getUser } from "@/services/users";

export type ContractDTO = {
  eventName: string;
  eventDate: Date;
  startTime: string;
  endTime: string;
  eventType: string;
  budget: number;
  additionalDetails?: string;
  isConfirmed?: boolean;
  requesterId: string;
  providerId: number;
};

// Add type for venue data
type VenueData = {
  id: string;
  name: string;
  type: string;
  user: {
    id: string;
    role: string;
  };
};

const formSchema = z.object({
  eventName: z.string().min(1, {
    message: "Por favor informe o nome do evento.",
  }),
  data: z.date({
    required_error: "Por favor selecione uma data.",
  }),
  horarioInicial: z.string().min(1, {
    message: "Por favor selecione um horário inicial.",
  }),
  horarioFinal: z.string().min(1, {
    message: "Por favor selecione um horário final.",
  }),
  tipoEvento: z.string().min(1, {
    message: "Por favor selecione o tipo de evento.",
  }),
  orcamento: z.string().min(1, {
    message: "Por favor informe o orçamento.",
  }),
  detalhes: z.string().optional(),
  isConfirmed: z.boolean().optional(),
});

export default function HireBandForm({ band }: { band: BandProfileType }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  // Get venue data for the current user
  const { data: venueData, isLoading: venueLoading } = useQuery<VenueData>({
    queryKey: ["venue", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not found");
      const response = await api.get<VenueData>(`/venues/user/${user.id}`);
      return response.data;
    },
    enabled: !!user?.id && user?.role === "venue",
  });

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
      eventName: "",
      data: new Date(),
      horarioInicial: "00:00",
      horarioFinal: "00:00",
      tipoEvento: "",
      orcamento: "0,00",
    },
  });

  const handleOpen = () => {
    // Fix: Check localStorage instead of sessionStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Check if user is a venue
    if (!user || user.role !== "venue") {
      toast.error("Apenas estabelecimentos podem contratar bandas");
      return;
    }

    setOpen(true);
  };

  const { mutate: submitContract, isPending } = useMutation({
    mutationFn: async (data: ContractDTO) => {
      const response = await api.post("/contract", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Proposta enviada com sucesso!");
      setOpen(false);
      form.reset();
    },
    onError: (error: unknown) => {
      console.error("Erro ao enviar proposta:", error);

      // Type guard to check if error is an AxiosError
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        const errorMessage =
          axiosError.response?.data?.message ||
          "Erro ao enviar proposta. Tente novamente.";
        toast.error(errorMessage);
      } else {
        toast.error("Erro ao enviar proposta. Tente novamente.");
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Check if venue data is available
    if (!venueData?.id) {
      toast.error("Erro: Dados do estabelecimento não encontrados");
      return;
    }

    // Transform form data to DTO format
    const dtoData: ContractDTO = {
      eventName: values.eventName,
      eventDate: values.data,
      startTime: values.horarioInicial,
      endTime: values.horarioFinal,
      eventType: values.tipoEvento,
      budget: Number.parseFloat(
        values.orcamento.replace(".", "").replace(",", ".")
      ),
      additionalDetails: values.detalhes,
      isConfirmed: values.isConfirmed, // Set default value
      requesterId: venueData.id, // Fix: Use actual venue ID
      providerId: band.id,
    };

    console.log("Dados do formulário:", values);
    console.log("Dados para envio (DTO):", dtoData);

    submitContract(dtoData);
  }

  const tiposDeEvento = [
    "Show",
    "Festival",
    "Casamento",
    "Aniversário",
    "Evento Corporativo",
    "Outro",
  ];

  // Show loading state while venue data is being fetched
  if (venueLoading) {
    return <Button disabled>Carregando...</Button>;
  }

  // Show error if user is not a venue
  if (user && user.role !== "venue") {
    return null; // Don't show the button for non-venue users
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
        Contratar
      </Button>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Contratar {band.bandName}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-500">
              Preencha os detalhes abaixo para enviar uma proposta para esta
              banda/músico.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Event Name */}
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-lg font-medium">
                      Nome do Evento
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do evento"
                        className=""
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-lg font-medium">
                      Data do Evento
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              // Zera o horário para evitar o erro de fuso (ex: salvar dia anterior)
                              const adjustedDate = new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate()
                              );
                              field.onChange(adjustedDate);
                            }
                          }}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* Time Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="horarioInicial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">
                        Horário Inicial
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} type="time" className=" pl-3" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="horarioFinal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">
                        Horário Final
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} type="time" className=" pl-3" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Event Type */}
              <FormField
                control={form.control}
                name="tipoEvento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Tipo de Evento
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Selecione o tipo de evento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tiposDeEvento.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Budget */}
              <FormField
                control={form.control}
                name="orcamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Orçamento (R$)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className=" border-2 border-purple-200 focus:border-purple-400"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          const formattedValue = (
                            Number(value) / 100
                          ).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          });
                          field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Additional Details */}
              <FormField
                control={form.control}
                name="detalhes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Detalhes adicionais
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Compartilhe mais informações sobre o evento..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-lg font-medium"
                disabled={isPending}
              >
                {isPending ? "Enviando..." : "Enviar Proposta"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
