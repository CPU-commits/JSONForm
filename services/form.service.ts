import { UserForm } from '~/server/db/adapter/form.adapter'

export class FormService {
	private readonly toastsStore = useToastsStore()
	private readonly router = useRouter()

	async saveForm(form: Omit<UserForm, 'id'>) {
		try {
			await $fetch('/api/v1/forms', {
				method: 'POST',
				body: form,
			})
			this.router.push('/dashboard/forms')
		} catch (err) {
			this.toastsStore.addToast({
				type: 'error',
				message: '',
			})
		}
	}
}
