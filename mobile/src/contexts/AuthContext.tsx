import { createContext, ReactNode, useState, useEffect } from "react"
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { api } from "../lib/api"

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: UserProps;
  isUserAuthenticating: boolean;
  signIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserAuthenticating, setIsUserAuthenticating] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserAuthenticating(true)
      await promptAsync()
    }
    catch (err) {
      console.log(err);
      throw err
    }
    finally {
      setIsUserAuthenticating(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {

      setIsUserAuthenticating(true)
      const tokenResponse = await api.post('/users', { access_token })
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

      const userResponse = await api.get('/me')
      setUser(userResponse.data.user)

    } catch (err) {

      console.log(err)
      throw err

    } finally {

      setIsUserAuthenticating(false)

    }
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserAuthenticating,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}