import { useQuery } from "@tanstack/react-query";
import transactionService from ".";
interface useGetAllProps {
  url: string;
  params?: any;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
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
};
