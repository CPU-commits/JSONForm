import { ZodError } from 'zod'
import { FetchError } from 'ofetch'
import { ErrorHttp, type HandleError } from '~/models/validation/error'

export function handleError(error: unknown): HandleError {
	if (error instanceof FetchError) {
		return {
			message: error.data.message,
			statusCode: error.statusCode ?? 500,
			statusMessage: error.message,
		}
	} else if (error instanceof ErrorHttp) {
		return {
			message: error.message,
			statusCode: error.statusCode,
			statusMessage: error.name,
		}
	} else if (error instanceof ZodError) {
		return {
			message: error.message,
			statusCode: 400,
			statusMessage: error.message,
		}
	} else if (error instanceof Array) {
		return {
			message: JSON.stringify(error, null, 4),
			statusCode: 400,
			statusMessage: 'Error de validación',
		}
	} else if (error instanceof Error) {
		return {
			message: error.message,
			statusCode: 400,
			statusMessage: error.name,
		}
	}
	return {
		message: 'Ha ocurrido un error',
		statusCode: 500,
		statusMessage: 'Error inesperado',
	}
}
