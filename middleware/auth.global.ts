export default defineNuxtRouteMiddleware(async () => {
	const { getSession } = useSession()
	const session = await getSession()
	if (session)
		useAuthStore().setAuth({
			user: {
				email: session.user?.email ?? '',
				name: session.user?.name ?? '',
				role: session.user.role ?? 'b',
				id: session.user.id,
			},
		})
})
