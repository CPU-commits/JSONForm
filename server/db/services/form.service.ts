import { FormRepository, SettersForm, UserForm } from '../adapter/form.adapter'
import FormRepositoryPrisma from '../prisma/form/form.repo'

class FormService {
	private formRepository: FormRepository

	constructor() {
		// RuntimeConfig
		const config = useRuntimeConfig()
		// Services
		if (config.connector === 'sqlite')
			this.formRepository = new FormRepositoryPrisma()
		else this.formRepository = new FormRepositoryPrisma()
	}

	async insertForm(form: Omit<UserForm, 'id'>) {
		return await this.formRepository.insertForm(form)
	}

	async getForms(
		setters: SettersForm = {
			orderBy: {
				createdAt: 'desc',
			},
			pageCount: 10,
			pageNumber: 0,
		},
	) {
		return await this.formRepository.getForms(setters)
	}
}

export const formService = new FormService()
