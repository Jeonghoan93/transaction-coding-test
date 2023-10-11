import api from "../api";

export const createTransaction = async (accountId: string, amount: number) => {
  try {
    const body = {
      account_id: accountId,
      amount,
    };
    const response = await api.post("/accounting/transactions", body);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountById = async (accountId: string) => {
  try {
    const response = await api.get(`/accounting/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
