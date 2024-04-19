import * as bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import type { UserRepository } from '../adapter/user.adapter'

export type Credentials = {
	user?: string
	email: string
	password: string
}

export default class UserService {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async validateUser(credentials: Credentials) {
		const user = await this.userRepository.getUserByEmail(credentials.email)
		if (!user)
			throw new Error(
				'No existe ningún usuario registrado con las credenciales proporcionadas',
			)
		if (bcrypt.compareSync(credentials.password, user?.password ?? ''))
			return {
				...user,
				password: undefined,
			}
		throw new Error(
			'Credenciales invalidas',
		)
	}

	async registerUser(credentials: Credentials) {
		const { user, password, email } = credentials
		const existsUser = await this.userRepository.existsUserByEmail(
			credentials.email,
		)
		if (existsUser)
			throw createError({
				message: `La cuenta con correo ${credentials.email} ya está creado`,
				statusCode: StatusCodes.CONFLICT,
			})
		return await this.userRepository.insertUser({
			password,
			email,
			name: user ?? '',
		})
	}
}
