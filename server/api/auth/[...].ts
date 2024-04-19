import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import type { Credentials } from '@/server/db/services/users.service'

export default NuxtAuthHandler({
	secret: useRuntimeConfig().authSecret,
	providers: [
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		CredentialsProvider.default({
			name: 'Credentials',
			credentials: {},
			async authorize(credentials: Credentials & { logIn: string }) {
				const userService = await useUserService()

				const isLogin = credentials.logIn === 'true'
				if (
					!credentials.email ||
					!credentials.password ||
					(credentials.user && isLogin)
				)
					throw new Error('Faltan credenciales')
				if (isLogin)
					return await userService.validateUser(credentials)
				else return await userService.registerUser(credentials)
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
