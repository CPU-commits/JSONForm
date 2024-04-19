export interface QuestionRepository {
	getQuestionOptions(idQuestion: number): Promise<Array<{ text: string; value: string }> | null>
}
