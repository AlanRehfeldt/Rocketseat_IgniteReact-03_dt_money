import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaciton {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextType {
  transactions: Transaciton[];
  fetchTransactios: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaciton[]>([]);

  async function fetchTransactios(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query
      }
    })
    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactios()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactios }} >
      { children }
    </TransactionsContext.Provider>
  )
}