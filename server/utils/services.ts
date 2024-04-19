/**
 * Define all services to use
 */

import type { FormRepository } from "../db/adapter/form.adapter"
import type { QuestionRepository } from "../db/adapter/question.adapter"
import type { UserRepository } from "../db/adapter/user.adapter"
import FormRepositoryPrisma from "../db/prisma/form/form.repo"
import QuestionRepositoryPrisma from "../db/prisma/question/question.repo"
import UserRepositoryPrisma from "../db/prisma/user/user.repo"
import FormService from "../db/services/form.service"
import QuestionService from "../db/services/question.service"
import UserService from "../db/services/users.service"

export const useFormService = async () => {
	// RuntimeConfig
	const config = useRuntimeConfig()
	// Repository
	let formRepository: FormRepository

	if (config.connector === 'sqlite')
		formRepository = await FormRepositoryPrisma.constructorAsync()
	else formRepository = await FormRepositoryPrisma.constructorAsync()

	return new FormService(formRepository)
}

export const useUserService = async () => {
	// RuntimeConfig
	const config = useRuntimeConfig()
	// Repository
	let userRepository: UserRepository

	if (config.connector === 'sqlite')
		userRepository = await UserRepositoryPrisma.constructorAsync()
	else userRepository = await UserRepositoryPrisma.constructorAsync()

	return new UserService(userRepository)
}

export const useQuestionService = async () => {
	// RuntimeConfig
	const config = useRuntimeConfig()
	// Repository
	let questionRepository: QuestionRepository

	if (config.connector === 'sqlite')
		questionRepository = await QuestionRepositoryPrisma.constructorAsync()
	else questionRepository = await QuestionRepositoryPrisma.constructorAsync()

	return new QuestionService(questionRepository)
}
