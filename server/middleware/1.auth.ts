type ProtectedRoute = {
	route: string
	roles: Array<'a' | 'b'>
}

const protectedRoutes: Array<ProtectedRoute> = [
	{ route: '/api/v1/forms', roles: ['b'] },
	{ route: '/api/v1/forms/**', roles: ['b'] },
]

export default defineEventHandler(async (event) => {
	const path = getRequestURL(event).pathname

	for (const { route, roles } of protectedRoutes) {
		if (route === path)
			await auth(event, ...roles)
	}
})
