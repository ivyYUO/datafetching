import React, { createContext, ReactNode, useState } from "react";
import { Product, User } from "../types/types";

interface DataContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  return (
    <DataContext.Provider value={{ products, setProducts, users, setUsers }}>
      {children}
    </DataContext.Provider>
  );
};
