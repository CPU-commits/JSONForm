import eslint from 'vite-plugin-eslint'
import { Connectors } from './models/db/connectors'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		initRootPassword: '',
		initRootEmail: '',
		databaseUri: '',
		authSecret: '',
		connector: 'sqlite' as keyof typeof Connectors,
	},
	typescript: {
		strict: true,
		typeCheck: true,
		tsConfig: {
			exclude: ['node_modules'],
		},
	},
	css: ['@/assets/scss/main.scss', '@/assets/scss/_z-index.scss'],
	modules: [
		'@nuxt/content',
		'@pinia/nuxt',
		'@sidebase/nuxt-auth',
		'@nuxtjs/i18n',
		'nuxt-icon',
		// 'nuxt-security',
	],
	auth: {
		origin: 'http://localhost:3000',
	},
	imports: {
		dirs: ['stores'],
	},
	i18n: {
		locales: [
			{
				code: 'en',
				name: 'English',
				file: 'en-US.json',
			},
			{
				code: 'es',
				name: 'Español',
				file: 'es.json',
			},
		],
		lazy: true,
		defaultLocale: 'es',
		langDir: 'lang',
		strategy: 'prefix_except_default',
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
