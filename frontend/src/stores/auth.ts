import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import type { User ,RegisterInput, LoginInput} from '@/types'
import { REGISTER } from '@/lib/graphql/mutations/Register'
import { LOGIN } from '../lib/graphql/mutations/Login'

type RegisterMutationData = {
  register: {
    token: string
    refreshToken: string
    user: User
  }
}

type LoginMutationData = {
  login: {
    token: string
    refreshToken: string
    user: User
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>() (
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: async (loginData: LoginInput) => {
          try{
              const {data} = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
                mutation: LOGIN,
                variables: {
                  data: {
                    email: loginData.email,
                    password: loginData.password
                  }
                }
              })

              if(data?.login){
                const { user, token } = data.login
                set({
                  user: {
                    id: user.id,
                    name: (user as { full_name?: string }).full_name ?? (user as { name?: string }).name ?? "",
                    email: user.email,
                    createdAt: (user as { created_at?: string }).created_at ?? (user as { createdAt?: string }).createdAt,
                    updatedAt: (user as { updated_at?: string }).updated_at ?? (user as { updatedAt?: string }).updatedAt
                  },
                  token,
                  isAuthenticated: true
                })
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao fazer o login")
            throw error
          }
        },
        signup: async (registerData: RegisterInput) => {
          try{
              const { data } = await apolloClient.mutate<
              RegisterMutationData,
                {data: RegisterInput}
              >({
                mutation: REGISTER,
                variables: {
                  data: {
                      full_name: registerData.full_name,
                      email: registerData.email,
                      password: registerData.password
                  }
                }
              })
              if(data?.register){
                const { token, user } = data.register
                const u = user as { id: string; full_name?: string; name?: string; email: string; created_at?: string; updated_at?: string }
                set({
                  user: {
                    id: u.id,
                    name: u.full_name ?? u.name ?? "",
                    email: u.email,
                    createdAt: u.created_at,
                    updatedAt: u.updated_at
                  },
                  token,
                  isAuthenticated: true
                })
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao fazer o cadastro")
            throw error
          }
        },
        logout: () => {
          set({
            user:null,
            token: null,
            isAuthenticated: false
          })
          apolloClient.clearStore()
        },
      }),
      {
        name: 'auth-storage'
      }
    )
)
