import { StatusCodes } from 'http-status-codes'

export type HandleError = {
	message: string
	statusCode: number
	statusMessage: string
}

export class ErrorHttp extends Error {
	public statusCode: number

	constructor(message: string | undefined, statusCode = 500) {
		super(message)

		this.statusCode = statusCode
	}
}

export class ConflictException extends ErrorHttp {
	constructor(message: string | undefined) {
		super(message)

		this.statusCode = StatusCodes.CONFLICT
	}
}
