import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs'
// @ts-ignore
import { JSONFile } from 'lowdb/node'
import { Low } from 'lowdb'

export default class Database {
	public getDb<T>(dbName: string, contents: string): Low<T> {
		// File path
		const __dirname = dirname(fileURLToPath(import.meta.url))
		const file = join(__dirname, 'db', dbName + '.json')
		// Exists file
		if (!fs.existsSync(file))
			fs.mkdir(dirname(file), { recursive: true }, (err) => {
				if (!err) fs.writeFileSync(file, JSON.stringify(contents))
			})
		// Adapter
		const adapter = new JSONFile<T>(file)
		return new Low(adapter)
	}
}
