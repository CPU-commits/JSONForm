import { defineStore } from 'pinia'
import type { User } from '~~/server/db/adapter/user.adapter'

export interface AuthData {
	user: Omit<User, 'password'>
}

const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuth: false,
		user: null as AuthData | null,
	}),
	getters: {
		getIsAuth(state) {
			return state.isAuth
		},
		getUser(state): AuthData | null {
			return state.user
		},
		getName(state): string | null {
			return state.user?.user.name ?? null
		},
		getEmail(state): string | null {
			return state.user?.user.email ?? null
		},
	},
	actions: {
		unsetAuth() {
			this.isAuth = false
			this.user = null
		},
		async logIn(
			credentials: {
				user?: string
				email: string
				password: string
			},
			isLogin: boolean,
		) {
			const { signIn } = useAuth()
			await signIn('credentials', {
				...credentials,
				logIn: isLogin,
				callbackUrl: '/',
			})
		},
		async logOut() {
			const { signOut } = useAuth()
			await signOut()
			this.unsetAuth()
		},
		setAuth(user: AuthData) {
			this.isAuth = true
			this.user = user
		},
	},
})

export default useAuthStore
