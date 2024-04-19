import { PrismaClient, type Prisma } from '@prisma/client'
import type {
	FormRepository,
	SettersForm,
	UserForm,
} from '../../adapter/form.adapter'
import type { QuestionKind, QuestionObject } from '~/models/form/questions.model'
import type { DefaultArgs } from '@prisma/client/runtime/library'

export default class FormRepositoryPrisma implements FormRepository {
	static instance: FormRepositoryPrisma
	private formRepo: Prisma.FormDelegate<DefaultArgs>

	constructor(formRepo: Prisma.FormDelegate<DefaultArgs>) {
		this.formRepo = formRepo
	}

	static async constructorAsync() {
		if (!this.instance) {
			const prisma = new PrismaClient()
			await prisma.$connect()

			this.instance = new FormRepositoryPrisma(prisma.form)
		}
		return this.instance
	}

	async getForms(setters: SettersForm) {
		const forms = await this.formRepo.findMany({
			select: {
				title: true,
				isPublic: true,
				createdAt: true,
				updatedAt: true,
				anonymous: true,
				slug: true,
				uid: true,
			},
			orderBy: setters.orderBy,
			take: setters.pageCount,
			skip: setters.pageNumber
				? setters.pageNumber * (setters.pageCount ?? 10)
				: undefined,
		})

		return forms
	}

	async updateOrInsertForm(form: Omit<UserForm, 'id'>) {
		const existsForm = await this.formRepo.findUnique({
			where: {
				uid: form.uid,
			},
			select: {
				id: true,
			},
		})
		if (existsForm)
			return await this.formRepo.update({
				where: {
					uid: form.uid,
				},
				data: {
					title: form.title,
				},
			})
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
				slug: form.slug,
				uid: form.uid,
			},
		})
	}

	async getFormByUid(uid: string): Promise<UserForm | null> {
		const form = await this.formRepo.findFirst({
			where: {
				uid,
			},
			include: {
				questions: {},
			},
		})
		if (!form) return null

		return {
			...form,
			questions: form.questions.map((question) => ({
				...question,
				kind: question.kind as QuestionKind,
				validations: question.validations
					? JSON.parse(question.validations)
					: undefined,
			}))
		}
	}
}
