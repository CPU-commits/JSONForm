import Ajv from 'ajv'
import {
	DateSchema,
	EmailSchema,
	FileSchema,
	MultipleSchema,
	NumberSchema,
	SelectSchema,
	TextSchema,
	URLSchema,
} from '~/models/form/questions.model'
import type { UserForm } from '~~/server/db/adapter/form.adapter'
import schema from './schema'
import { ZodError } from 'zod'

const ajv = new Ajv()

export class NotValidJSONSchema extends Error {}

export function validateJSON(jsonText: string) {
	const jsonParse = JSON.parse(jsonText) as UserForm

	// Validation JSON
	const validate = ajv.compile(schema)
	const valid = validate(jsonParse)
	if (!valid) throw new NotValidJSONSchema(JSON.stringify(validate.errors))
	// Validation Questions
	jsonParse.questions.forEach((question, i) => {
		try {
			if (question.kind === 'Date') DateSchema.parse(question)
			else if (question.kind === 'Email') EmailSchema.parse(question)
			else if (question.kind === 'File') FileSchema.parse(question)
			else if (question.kind === 'Multiple') MultipleSchema.parse(question)
			else if (question.kind === 'Number') NumberSchema.parse(question)
			else if (question.kind === 'Select') SelectSchema.parse(question)
			else if (question.kind === 'Text') TextSchema.parse(question)
			else if (question.kind === 'URL') URLSchema.parse(question)
		} catch (err) {
			if (err instanceof ZodError)
				throw new NotValidJSONSchema(JSON.stringify(
					err.issues.map((issue) => ({
						...issue,
						instancePath: `/questions/${i}/${issue.path.join('/')}`,
						path: undefined,
					}))
				))
		}
	})

	return jsonParse
}
