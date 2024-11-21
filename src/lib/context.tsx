import { createContext, Dispatch, SetStateAction, useState } from "react";

export type AppState = {
  isConfettiVisible?: boolean;
  setConfettiVisible?: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppState>({});

export const AppProvider = ({ children }: { children: any }) => {
  const [isConfettiVisible, setConfettiVisible] = useState(false);
  return (
    <AppContext.Provider value={{ isConfettiVisible, setConfettiVisible }}>
      {children}
    </AppContext.Provider>
  );
};
