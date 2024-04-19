// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(eslintConfigPrettier, {
	rules: {
		'@typescript-eslint/no-invalid-void-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'vue/multi-word-component-names': 'off',
	},
})
