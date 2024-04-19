import type { QuestionRepository } from '../adapter/question.adapter'

export default class QuestionService {
	private questionRepository: QuestionRepository

	constructor(questionRepository: QuestionRepository) {
		this.questionRepository = questionRepository
	}

	async getQuestionOptions(idQuestion: number) {
		return await this.questionRepository.getQuestionOptions(
			idQuestion,
		)
	}
}
