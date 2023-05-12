import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { usersServices } from '@/server/db/services/users.service'
import type { Credentials } from '@/server/db/services/users.service'

export default NuxtAuthHandler({
	secret: useRuntimeConfig().authSecret,
	providers: [
		// @ts-ignore
		CredentialsProvider.default({
			name: 'Credentials',
			credentials: {},
			async authorize(credentials: Credentials & { logIn: string }) {
				const isLogin = credentials.logIn === 'true'
				if (
					!credentials.email ||
					!credentials.password ||
					(credentials.user && isLogin)
				)
					throw new Error('Faltan credenciales')
				if (isLogin)
					return await usersServices.validateUser(credentials)
				else return await usersServices.registerUser(credentials)
			},
		}),
	],
	pages: {
		signIn: '/sesion',
		error: '/sesion/error',
	},
	callbacks: {
		jwt({ token, account, user }) {
			if (account) {
				token.userId = user?.id ?? ''
				token.role = user?.role ?? 'b'
			}
			return token
		},
		session({ session, token }) {
			session.user.id = token.userId
			session.user.role = token.role
			return {
				...session,
			}
		},
	},
})
