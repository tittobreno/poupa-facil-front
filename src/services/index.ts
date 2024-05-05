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
};

export default transactionService;
