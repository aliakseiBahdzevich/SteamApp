import React, { createContext, useContext, ReactNode, Provider } from 'react';
import RootStore from './store';

// Создаем контекст
const StoreContext = createContext(RootStore);

// Определяем интерфейс для пропсов провайдера
interface StoreProviderProps {
  children: ReactNode; // Дочерние компоненты
}


export const StoreProvider = StoreContext.Provider;

export const useStore = () => useContext(StoreContext);

