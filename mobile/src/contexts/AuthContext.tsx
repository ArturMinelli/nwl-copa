import { createContext, ReactNode } from "react"

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: UserProps;
  signIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({children}: AuthContextProviderProps) {
  return (
    {children}
  )
}