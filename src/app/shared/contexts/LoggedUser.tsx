import { createContext,  useCallback, useEffect, useState } from "react";


interface ILoggedUserContextData {
  userName: string;
  logout: () => void;
}

export const LoggedUserContext = createContext<ILoggedUserContextData>({} as ILoggedUserContextData);

interface ILoggedUserProviderProps {
  children: React.ReactNode
}
export const LoggedUserProvider: React.FC<ILoggedUserProviderProps> = ({ children }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setName('Lia');
    }, 1000);
  });

  const handleLogout = useCallback(() => {
    console.log('Logout executou');
  }, []);

  return (
    <LoggedUserContext.Provider value={{ userName: name, logout: handleLogout }}>
      {children}
    </LoggedUserContext.Provider>
  );
}