export class AuthService {
	login() {
		$fetch('/api/auth/login', {
			method: 'post',
		})
	}
}
