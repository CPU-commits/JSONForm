import eslint from 'vite-plugin-eslint'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		initRootPassword: '',
		initRootEmail: '',
		databaseUri: '',
		authSecret: '',
	},
	typescript: {
		strict: true,
		typeCheck: true,
	},
	css: ['@/assets/scss/main.scss', '@/assets/scss/_z-index.scss'],
	modules: [
		'@nuxt/content',
		'@pinia/nuxt',
		'@sidebase/nuxt-auth',
		// 'nuxt-security',
	],
	auth: {
		origin: 'http://localhost:3000',
	},
	imports: {
		dirs: ['stores'],
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData:
						'@use "@/assets/scss/_variables.scss" as *;',
				},
			},
		},
		plugins: [eslint()],
	},
})
