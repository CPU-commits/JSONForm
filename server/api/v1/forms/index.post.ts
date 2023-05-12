import { formService } from '../../../db/services/form.service'
import auth from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
	// Auth
	await auth(event, 'b')
	// Body form
	const body = await readBody(event)
	return await formService.insertForm(body)
})
