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

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextType {
  transactions: Transaciton[];
  fetchTransactios: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaciton[]>([]);

  async function fetchTransactios(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        // _order: 'desc',
        description: query
      }
    })
    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data
    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date()
    })

    setTransactions(state => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactios()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactios, createTransaction }} >
      { children }
    </TransactionsContext.Provider>
  )
}