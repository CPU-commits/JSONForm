import type { Prisma } from "@prisma/client";
import type { QuestionRepository } from "../../adapter/question.adapter"
import type { DefaultArgs } from "@prisma/client/runtime/library"
import { PrismaClient } from "@prisma/client"

export default class QuestionRepositoryPrisma implements QuestionRepository {
	static instance: QuestionRepositoryPrisma
	private questionRepo: Prisma.QuestionDelegate<DefaultArgs>

	constructor(questionRepo: Prisma.QuestionDelegate<DefaultArgs>) {
		this.questionRepo = questionRepo
	}

	static async constructorAsync() {
		if (!this.instance) {
			const prisma = new PrismaClient()
			await prisma.$connect()

			this.instance = new QuestionRepositoryPrisma(prisma.question)
		}
		return this.instance
	}

	async getQuestionOptions(
		idQuestion: number,
	): Promise<Array<{ text: string; value: string; }>  | null> {
		const question = await this.questionRepo.findFirst({
			where: {
				id: idQuestion,
			},
			select: {
				options: true,
			},
		})
		return question?.options ?? null
	}
}
