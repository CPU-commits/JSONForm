import {
	type Prisma,
	PrismaClient,
	type User
} from '@prisma/client'
import * as bcrypt from 'bcrypt'
import type { UserRepository } from '../../adapter/user.adapter'
import type { DefaultArgs } from '@prisma/client/runtime/library'

export default class UserRepositoryPrisma implements UserRepository {
	static instance: UserRepositoryPrisma
	private userRepo: Prisma.UserDelegate<DefaultArgs>

	constructor(userRepo: Prisma.UserDelegate<DefaultArgs>) {
		this.userRepo = userRepo

		this.initAdmin()
	}

	static async constructorAsync() {
		if (!this.instance) {
			const prisma = new PrismaClient()
			await prisma.$connect()

			this.instance = new UserRepositoryPrisma(prisma.user)
		}
		return this.instance
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
