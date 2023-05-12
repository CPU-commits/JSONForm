import { FormService } from '~/services/form.service'
import { AuthService } from '~~/services/auth.service'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			authService: new AuthService(),
			formService: new FormService(),
		},
	}
})
