export type User = {
	id: string
	email: string
	name: string
	password?: string
}

export interface UserRepository {
	getUserByEmail(email: string): Promise<User | null>
}
