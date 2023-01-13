import * as bcrypt from 'bcrypt'
import { UserRepository } from '../adapter/user.adapter'
import UserServiceLowDb from '../lowdb/user/user.service'

export type Credentials = {
	user?: string
	email: string
	password: string
}

class UserService {
	private userRepository: UserRepository

	constructor() {
		// RuntimeConfig
		const config = useRuntimeConfig()
		// Services
		if (config.databaseUri === 'local')
			this.userRepository = new UserServiceLowDb()
		else this.userRepository = new UserServiceLowDb()
	}

	async validateUser(credentials: Credentials) {
		const user = await this.userRepository.getUserByEmail(credentials.email)
		if (!user) return null
		if (bcrypt.compareSync(credentials.password, user?.password ?? ''))
			return {
				...user,
				password: undefined,
			}
		return null
	}
}

export const usersServices = new UserService()
