<script setup lang="ts">
// Stores
const authStore = useAuthStore()
// Route
const route = useRoute()

const isLogin = ref(route.query?.iniciar === 'true')

watch(
	() => route.query.iniciar,
	() => {
		isLogin.value = route.query?.iniciar === 'true'
	},
)
// FormData
const registerForm = {
	user: '',
	email: '',
	password: '',
}
</script>

<template>
	<section class="Session">
		<h2>{{ isLogin ? $t('session.login') : $t('session.register') }}</h2>
		<div class="Session__form">
			<HTMLForm :submit="() => authStore.logIn(registerForm, isLogin)">
				<HTMLInput
					v-if="!isLogin"
					v-model:value="registerForm.user"
					:label-text="$t('user.name')"
				/>
				<HTMLInput
					v-model:value="registerForm.email"
					:label-text="`@ ${$t('user.email')}`"
				/>
				<HTMLInput
					v-model:value="registerForm.password"
					:label-text="$t('user.pass')"
					type="password"
				/>
				<footer class="Session__form--footer">
					<HTMLButton
						:click="() => (isLogin = !isLogin)"
						type="button"
						class="Session__footer--toggle"
					>
						{{
							!isLogin
								? $t('session.login')
								: $t('session.register')
						}}
					</HTMLButton>
					<HTMLButton :with-background="true" type="submit">
						{{ $t('actions.send') }}
					</HTMLButton>
				</footer>
			</HTMLForm>
		</div>
	</section>
</template>

<style lang="scss">
.Session {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;

	h2 {
		font-size: 2rem;
	}

	.Session__form {
		margin-top: 10px;
		width: 100%;
		max-width: 500px;
	}
}

.Session__form--footer {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 20px;
}

.Session__footer--toggle {
	width: 100px;
}
</style>
