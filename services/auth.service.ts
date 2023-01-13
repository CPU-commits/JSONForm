import { Fetch } from '~~/common/fetchModule'

export class AuthService {
	private readonly fetchModule = new Fetch()

	login() {
		$fetch('/api/auth/login', {
			method: 'post',
		})
	}
}
