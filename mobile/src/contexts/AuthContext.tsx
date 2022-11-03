import { createContext, ReactNode, useState } from "react"

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

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({name: 'Artur Minelli', avatarUrl: 'https://github.com/ArturMinelli.png'})

  async function signIn() {
    console.log('Entrou')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}