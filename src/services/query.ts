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
        console.log(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success("Registro adicionado com sucesso!");
      },
    });
  },
};
