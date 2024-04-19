import type {
	FormRepository,
	SettersForm,
	UserForm,
} from '../adapter/form.adapter'

export default class FormService {
	private formRepository: FormRepository

	constructor(formRepository: FormRepository) {
		this.formRepository = formRepository
	}

	async insertForm(form: Omit<UserForm, 'id'>) {
		return await this.formRepository.updateOrInsertForm(form)
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

	async getFormByUid(uid: string) {
		return await this.formRepository.getFormByUid(uid)
	}
}
