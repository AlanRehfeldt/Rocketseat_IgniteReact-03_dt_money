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
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaciton[]>([]);

  async function loadTransactios() {
    const response = await fetch('http://localhost:3000/transactions');
    const data = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    loadTransactios()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }} >
      { children }
    </TransactionsContext.Provider>
  )
}