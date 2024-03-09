import { createContext, useEffect, useState } from "react";

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
    const url = new URL('http://localhost:3000/transactions')

    if(query) {
      url.searchParams.append('q', query)
    }

    const response = await fetch(url);
    const data = await response.json();
    setTransactions(data);
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