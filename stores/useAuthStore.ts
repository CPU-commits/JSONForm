import { defineStore } from 'pinia'
import { User } from '~~/server/db/adapter/user.adapter'

export interface AuthData {
	user: Omit<Omit<User, 'password'>, 'id'>
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
		async logIn(credentials: {
			user?: string
			email: string
			password: string
		}) {
			const { signIn } = useSession()
			await signIn('credentials', {
				...credentials,
				logIn: true,
				callbackUrl: '/',
			})
		},
		async logOut() {
			const { signOut } = useSession()
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
