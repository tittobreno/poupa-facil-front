import { useQuery } from "@tanstack/react-query";
import saveEaseService from ".";
interface useGetAllProps {
  url: string;
  params?: any;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export const useGetAll = <T>({
  url,
  params,
  enabled = true,
  refetchOnWindowFocus = false,
}: useGetAllProps) => {
  return useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const res = await saveEaseService.getAll<T>({ url, params });
      return res;
    },
    enabled,
    refetchOnWindowFocus,
  });
};