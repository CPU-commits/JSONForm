import type { QuestionObject } from '~/models/form/questions.model'

export type UserForm = {
	id?: string | number
	title: string
	uid: string
	description?: string | null
	anonymous?: boolean
	basedOnIndex?: boolean
	isPublic?: boolean
	createdAt?: Date
	updatedAt?: Date
	slug: string
	questions: Array<QuestionObject>
}

type SortOrder = 'asc' | 'desc'

type OrderBy = {
	[K in 'title' | 'isPublic' | 'createdAt' | 'updatedAt']?: SortOrder
}

export type SettersForm = {
	pageNumber?: number
	pageCount?: number
	orderBy?: OrderBy
}

export interface FormRepository {
	getForms(set: SettersForm): Promise<Array<Omit<UserForm, 'questions'>>>
	getFormByUid(uid: string): Promise<UserForm | null>
	updateOrInsertForm(form: Omit<UserForm, 'id'>): Promise<{ id: string | number }>
}
