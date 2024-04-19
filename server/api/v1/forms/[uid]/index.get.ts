import { useFormService } from "~/server/utils/services"

export default defineEventHandler(async (event) => {
	const formService = await useFormService()
	const uid = getRouterParam(event, 'uid') as string
	// Get form
	const forms = await formService.getFormByUid(uid)

	return forms
})
