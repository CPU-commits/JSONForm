import { AuthService } from '~~/services/auth.service'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			authService: new AuthService(),
		},
	}
})
