import { QuestionObject } from '~~/models/form/questions.model'

export type UserForm = {
	id?: string | number
	title: string
	description?: string
	anonymous?: boolean
	basedOnIndex?: boolean
	isPublic?: boolean
	createdAt?: Date
	updatedAt?: Date
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
	getForms(set: SettersForm): Promise<Array<UserForm>>
	insertForm(form: Omit<UserForm, 'id'>): Promise<{ id: string | number }>
}
