import { formService } from '~/server/db/services/form.service'

export default defineEventHandler(async (event) => {
	// Auth
	await auth(event, 'b')
	// Get forms
	const forms = await formService.getForms()

	return forms
})
