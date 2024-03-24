import api from "../../lib/api";
import { Transaction } from "../../types";
import { getItem } from "../../utils/storage";

interface ParamsType {
  skip: number;
  take: number;
}

interface ApiResponse {
  total: number;
  listUserTransactions: Transaction[];
}

const transactionsService = {
  getAll: async (params: ParamsType): Promise<ApiResponse> => {
    const { data } = await api.get("/transacao/listar", {
      params: {
        ...params,
      },

      headers: {
        Authorization: `Bearer ${getItem("token")}`,
      },
    });
    return data;
  },
};

export default transactionsService;
