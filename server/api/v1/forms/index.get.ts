import { useFormService } from "~/server/utils/services"

export default defineEventHandler(async () => {
	const formService = await useFormService()
	// Get forms
	const forms = await formService.getForms()

	return forms
})
