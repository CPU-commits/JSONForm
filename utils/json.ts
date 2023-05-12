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
import { UserForm } from '~~/server/db/adapter/form.adapter'

const ajv = new Ajv()

export async function validateJSON(jsonFile: File) {
	const jsonText = await jsonFile.text()
	const jsonParse = JSON.parse(jsonText) as UserForm

	// Validation JSON
	const validate = ajv.compile(schema)
	const valid = validate(jsonParse)
	if (!valid) throw validate.errors
	// Validation Questions
	jsonParse.questions.forEach((question) => {
		if (question.kind === 'Date') DateSchema.parse(question)
		if (question.kind === 'Email') EmailSchema.parse(question)
		if (question.kind === 'File') FileSchema.parse(question)
		if (question.kind === 'Multiple') MultipleSchema.parse(question)
		if (question.kind === 'Number') NumberSchema.parse(question)
		if (question.kind === 'Select') SelectSchema.parse(question)
		if (question.kind === 'Text') TextSchema.parse(question)
		if (question.kind === 'URL') URLSchema.parse(question)
	})

	return jsonParse
}
