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

const saveEaseService = {
  getAll: async <T>({ params, url }: GetAllProps): Promise<T> => {
    const res = await api.get<T>(url, {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${getItem("token")}`,
      },
    });
    return res.data;
  },
};

export default saveEaseService;
