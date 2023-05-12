import { PrismaClient } from '@prisma/client'
import {
	FormRepository,
	SettersForm,
	UserForm,
} from '../../adapter/form.adapter'
import { QuestionObject, QuestionKind } from '~/models/form/questions.model'

export default class FormRepositoryPrisma implements FormRepository {
	private formRepo = new PrismaClient().form

	async getForms(setters: SettersForm): Promise<UserForm[]> {
		const forms = await this.formRepo.findMany({
			include: {
				questions: true,
			},
			orderBy: setters.orderBy,
			take: setters.pageCount,
			skip: setters.pageNumber
				? setters.pageNumber * (setters.pageCount ?? 10)
				: undefined,
		})

		return forms.map((form) => ({
			...form,
			description: form.description ?? undefined,
			questions: form.questions.map((question) => ({
				...question,
				kind: question.kind as QuestionKind,
				index: question.index ?? undefined,
				validations: question.validations
					? JSON.parse(question.validations)
					: undefined,
			})),
		}))
	}

	async insertForm(form: Omit<UserForm, 'id'>) {
		return await this.formRepo.create({
			data: {
				anonymous: form.anonymous,
				basedOnIndex: form.basedOnIndex,
				description: form.description,
				isPublic: form.isPublic,
				title: form.title,
				questions: {
					create: form.questions.map((question) => ({
						...question,
						validations: question.validations
							? JSON.stringify(question.validations)
							: null,
						options:
							question.kind === 'Multiple' ||
							question.kind === 'Select'
								? {
										create: (
											question as QuestionObject<'Select'>
										).options.map((option) => ({
											...option,
										})),
								  }
								: undefined,
					})),
				},
			},
		})
	}
}
