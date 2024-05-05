import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import transactionService from ".";
import { useGlobal } from "../contexts/GlobalContext";
import { useToast } from "../hooks/useToast";
interface useGetAllProps {
  url: string;
  params?: any;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

interface CreateProps {
  url: string;
  queryKey: string[];
}

interface DeleteProps {
  url: string;
  queryKey: string[];
}

export const useTransaction = {
  getAll: <T>({
    url,
    params,
    enabled = true,
    refetchOnWindowFocus = false,
  }: useGetAllProps) => {
    return useQuery<T>({
      queryKey: [url],
      queryFn: async () => {
        const res = await transactionService.getAll<T>({ url, params });
        return res;
      },
      enabled,
      refetchOnWindowFocus,
    });
  },

  create: <T>({ url, queryKey }: CreateProps) => {
    const toast = useToast();

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (data: any) => {
        const res = await transactionService.create<T>({ data, url });

        return res;
      },
      onError: (error) => {
        toast.error(`Erro ao adicionar um registro: ${error}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success("Registro adicionado com sucesso!");
      },
    });
  },

  delete: ({ url, queryKey }: DeleteProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
      mutationFn: async (id: number) => {
        const res = await transactionService.delete({ url, id });

        return res;
      },
      onError: async (error) => {
        toast.error(`Erro ao deletar o registro: ${error.message}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success("Registro deletado com sucesso!");
      },
    });
  },
};
