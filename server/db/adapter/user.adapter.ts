export type User = {
	id?: string
	email: string
	name: string
	password?: string
	role: string
}

export interface UserRepository {
	getUserByEmail(email: string): Promise<User | null>
	existsUserByEmail(email: string): Promise<boolean>
	insertUser(user: Omit<Omit<User, 'id'>, 'role'>): Promise<User>
}
