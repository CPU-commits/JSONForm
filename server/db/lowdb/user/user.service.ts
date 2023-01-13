import { randomUUID } from 'crypto'
import { Low } from 'lowdb/lib'
import * as bcrypt from 'bcrypt'
import { User, UserRepository } from '../../adapter/user.adapter'
import Database from '../database'
import { UserModel } from './user.model'

export default class UserServiceLowDb implements UserRepository {
	private readonly dbName: string = 'users'
	private readonly db: Low<Array<UserModel>>
	private readonly databaseService: Database = new Database()

	constructor() {
		this.db = this.databaseService.getDb<Array<UserModel>>(
			this.dbName,
			'[]',
		)
		this.initAdmin()
	}

	private signPassword(password: string) {
		return bcrypt.hashSync(password, 10)
	}

	private createUser(user: Omit<UserModel, 'id'>): UserModel {
		const userModel: UserModel = {
			...user,
			password: this.signPassword(user.password),
			id: randomUUID(),
		}
		return userModel
	}

	private async initAdmin() {
		const config = useRuntimeConfig()
		await this.db.read()
		if (this.db.data?.length === 0) {
			this.db.data.push(
				this.createUser({
					email: config.initRootEmail,
					password: config.initRootPassword,
					name: 'admin',
					role: 'a',
				}),
			)
			await this.db.write()
		}
	}

	async getUserByEmail(email: string): Promise<User | null> {
		await this.db.read()
		const indexUser = this.db.data?.findIndex(
			(user) => user.email === email,
		)
		if (indexUser !== undefined && this.db.data)
			return this.db.data[indexUser]
		return null
	}

	async existsUserByEmail(email: string): Promise<boolean> {
		await this.db.read()
		if (this.db.data) return this.db.data?.some((u) => u.email === email)
		else return false
	}

	async insertUser(user: Omit<User, 'id'>): Promise<User> {
		await this.db.read()
		const newUser = {
			...user,
			password: user.password ?? '',
			role: 'b',
		}
		this.db.data?.push(this.createUser(newUser))
		await this.db.write()
		return newUser
	}
}
