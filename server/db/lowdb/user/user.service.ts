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

	private async initAdmin() {
		const config = useRuntimeConfig()
		await this.db.read()
		if (this.db.data?.length === 0) {
			this.db.data.push({
				email: config.initRootEmail,
				password: this.signPassword(config.initRootPassword),
				name: 'admin',
				id: randomUUID(),
			})
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
}
