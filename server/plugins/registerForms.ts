import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import * as chokidar from 'chokidar'
import { NotValidJSONSchema, validateJSON } from '../utils/json/json'
import { useFormService } from '../utils/services'

async function tryRegisterForms(formsFolder: string) {
	const files = readdirSync(formsFolder)
	// Not inserted
	const notValidJson: Array<{ fileName: string; error: unknown }> = []

	files.forEach(async (fileName) => {
		const file = readFileSync(
			join(formsFolder, fileName),
			'utf-8',
		)
		try {
			validateJSON(file)
			const formService = await useFormService()

			await formService.insertForm(JSON.parse(file))
		} catch (err) {
			if (err instanceof NotValidJSONSchema)
				notValidJson.push({
					fileName,
					error: err,
				})
			else console.log(err)
		}
	})
	notValidJson.forEach(({ fileName, error }) =>
		console.log(`File: ${fileName} not valid schema: ${error}`),
	)
}

export default defineNitroPlugin(() => {
	const runtimeConfig = useRuntimeConfig()
	const formsFolder = runtimeConfig.formsFolder

	let timeout: NodeJS.Timeout | null = null
	chokidar.watch(formsFolder).on('all', () => {
		if (timeout !== null) clearTimeout(timeout)
		timeout = setTimeout(() => tryRegisterForms(formsFolder), 1000)
	})
})
