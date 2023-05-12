import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { UserRepository } from '../../adapter/user.adapter'

export default class UserRepositoryPrisma implements UserRepository {
	private userRepo = new PrismaClient().user

	constructor() {
		this.initAdmin()
	}

	private signPassword(password: string) {
		return bcrypt.hashSync(password, 10)
	}

	private async initAdmin() {
		const config = useRuntimeConfig()
		const adminUserExists = await this.existsUserByEmail(
			config.initRootEmail,
		)
		if (!adminUserExists)
			await this.insertUser({
				email: config.initRootEmail,
				password: config.initRootPassword,
				name: 'admin',
				role: 'b',
			})
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepo.findFirst({
			where: {
				email,
			},
		})
		return user
	}

	async existsUserByEmail(email: string) {
		return await this.userRepo
			.findFirst({
				where: { email },
				select: { id: true },
			})
			.then((user) => user !== null)
	}

	async insertUser(user: Omit<User, 'id'>) {
		return await this.userRepo.create({
			data: {
				...user,
				password: this.signPassword(user.password),
			},
		})
	}
}
