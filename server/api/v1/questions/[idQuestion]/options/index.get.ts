import { useQuestionService } from "~/server/utils/services"

export default defineEventHandler(async (event) => {
	const questionService = await useQuestionService()
	const idQuestion = getRouterParam(event, 'idQuestion') as string

	const idIntQuestion = parseInt(idQuestion)
	if (!isNaN(idIntQuestion))
		return ''
	// Get form
	const questions = await questionService.getQuestionOptions(idIntQuestion)

	return questions
})
