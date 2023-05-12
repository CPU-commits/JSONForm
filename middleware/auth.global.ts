export default defineNuxtRouteMiddleware(async () => {
	const { getSession } = useAuth()
	const session = await getSession()
	if (session?.user)
		useAuthStore().setAuth({
			user: {
				email: session.user?.email ?? '',
				name: session.user?.name ?? '',
				role: session.user.role ?? 'b',
				id: session.user.id,
			},
		})
})
