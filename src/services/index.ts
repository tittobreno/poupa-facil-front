import api from "../lib/axios";
import { getItem } from "../utils/storage";

interface ParamsType {
  skip: number;
  take: number;
  categories?: string[];
}

interface GetAllProps {
  params: ParamsType;
  url: string;
}

interface CreateProps {
  url: string;
  data: any;
}

interface Editprops {
  url: string;
  data: any;
  id: number;
}

interface DeleteProps {
  url: string;
  id: number;
}

const headers = {
  Authorization: `Bearer ${getItem("token")}`,
};

const transactionService = {
  getAll: async <T>({ params, url }: GetAllProps): Promise<T> => {
    const res = await api.get<T>(url, {
      params: {
        ...params,
      },
      headers,
    });
    return res.data;
  },

  create: async <T>({ url, data }: CreateProps) => {
    const res = await api.post<T>(url, data, { headers });

    return res.data;
  },

  edit: async <T>({ url, data, id }: Editprops) => {
    const res = await api.put<T>(`${url}${id}`, data, { headers });

    return res.data;
  },

  delete: async ({ url, id }: DeleteProps) => {
    const res = await api.delete(`${url}${id}`, {
      headers,
    });

    return res.data;
  },
};

export default transactionService;
