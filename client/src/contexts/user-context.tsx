"use client";

import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from 'react';
  
  import { User } from '@/lib/interfaces/interfaces';
  
  interface UserWithToken extends User {
    access_token?: string;
  }
  interface UserProps{
    user: UserWithToken;
    setUser: Dispatch<SetStateAction<User>>;
  }
  
  interface UserProviderProps {
    children: ReactNode;
  }
  
  const UserContext = createContext<UserProps | undefined>(undefined);
  
  export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>({} as User);

    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const localUser = localStorage.getItem('user');
            if (localUser) {
                setUser(JSON.parse(localUser));
            }
        }
    }, [])
  
    const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  
    return (
      <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
  }
  
  export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be within a valid provider');
    }
    return context;
  };