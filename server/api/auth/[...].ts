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
			async authorize(credentials: Credentials & { logIn: boolean }) {
				return await usersServices.validateUser(credentials)
			},
		}),
	],
	pages: {
		signIn: '/sesion',
	},
})
